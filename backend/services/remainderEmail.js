import cron from 'node-cron';
import { todoModel } from '../db/user.model.js';
import { sendReminderEmail } from '../utils/emails.js';

export const startReminderCron = () => {
  console.log("node-cron is running in background");
  cron.schedule('* * * * *', async () => {
    try {
      const now = new Date();
      const thirtyMinutesFromNow = new Date(now.getTime() + 30 * 60 * 1000);

      const upcomingTasks = await todoModel.find({
        due_date: { $gte: now, $lte: thirtyMinutesFromNow },
        isCompleted: false,
        reminderSent: false,
      }).populate('userId');

      if (upcomingTasks.length === 0) {
        return;
      } 

      for (const task of upcomingTasks) {
        if (task.userId && task.userId.email) {
          const result = await sendReminderEmail(
            task.userId.email,
            task.title,
          );

          if (result.success) {
            task.reminderSent = true;
            await task.save();
            console.log(`Email sent succesfully for, ${task.title}`)
          } else {
            throw new Error(`Error in sending email, ${task.title}`);
          }
        }
      }
    } catch (error) {
      console.error('Error in reminder cron job', error);
    }
  });
};

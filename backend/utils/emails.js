import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD 
    }
});

export const sendReminderEmail = async (userEmail, taskTitle) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: userEmail,
            subject: `Reminder: 10 minutes to go for "${taskTitle}"'s expiry !`,
            html: `
                    <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 20px; border-radius: 10px;">
                        <h2>Task Reminder</h2>
                        <p>Hello!</p>

                        <p>This is a reminder that your task <strong>${taskTitle}</strong> due date is in <strong>10 minutes</strong>:</p>
                        
                        <p>Don't forget to complete it on time!</p>

                        <p>Thank you!!</p>
                    </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
        return { success: true, msg : "Email send successfully"};
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
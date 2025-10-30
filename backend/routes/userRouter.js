import  express  from 'express';
const userRouter = express.Router();
import { Signup, createTodo, login, logout, getTodo, updateTodo, deleteTodo, isCompleted, verify} from '../controllers/user.controller.js'
import { auth } from '../middleware/auth.js';

userRouter.post('/signup', Signup);

userRouter.post('/login', login);

userRouter.get('/logout', logout);

userRouter.post('/todo', auth, createTodo);

userRouter.get('/my-todo', auth, getTodo);

userRouter.put('/update/:id', auth, updateTodo);

userRouter.delete('/delete/:id', auth, deleteTodo);

userRouter.patch('/complete/:id', auth, isCompleted);

userRouter.get('/verify',auth, verify)

export default userRouter;
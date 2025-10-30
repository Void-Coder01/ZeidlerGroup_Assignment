import { userModel,todoModel } from '../db/user.model.js';
import bcrypt from 'bcrypt';
import { generateAndSetJwtToken } from '../utils/generateJwtToken.js';


export const Signup = async(req,res) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password){
        return res.status(400).json({success : false, msg : "All input should be provided"});
    }

    try {
        const isAlreadyExists = await userModel.findOne({
            email : email
        })

        if(isAlreadyExists){
            return res.status(400).json({success : false, msg : "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new userModel({
            name :name,
            email : email,
            password : hashedPassword
        })

        await user.save();

        return res.status(200).json({
            success : true , 
            msg : "You have Signed up successfully",
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({success : false, msg : "Error occurred in signup "})
    }
}

export const login = async(req,res) => {
    const {email, password} = req.body;

    try {
          const user = await userModel.findOne({
            email : email
        })

        if(!user){
            return res.status(404).json({success : false, msg : "User not found"});
        }
        
        const isMatchedPassword = await bcrypt.compare(password, user.password);

        if(!isMatchedPassword){
            return res.status(403).json({success : false, msg : "Password doesn't match",user});
            
        }

        await generateAndSetJwtToken(res, user._id);

        return res.status(200).json({success: true, msg: "You have logged in successfully"})
    } catch (error) {
        console.log(error);
        return res.status(401).json({success : false, msg : "error in login"})
    }
}

export const logout = async(req,res) => {
    res.clearCookie("token");
    res.status(200).json({success : true, msg : "You have succesfully logged out"});
}

export const createTodo = async(req,res) => {
    const { title, description, due_date, isCompleted } = req.body;

    try {
        if(!title){
            return res.status(401).json({success : false, msg : "Title must be provided"})
        }

        if(due_date){
            const parsedDate = new Date(due_date);

            if (isNaN(parsedDate.getTime())) {
                return res.status(400).json({ 
                    success: false, 
                    msg: 
                    "Invalid date format" 
                });
            }
            
            if (parsedDate < new Date()) {
                return res.status(400).json({ 
                    success: false, 
                    msg: "Due date cannot be in the past" 
                });
            }
        }

        const todos ={
            title,
            description,
            due_date: due_date ? new Date(due_date) : null,
            isCompleted,
            userId : req.userId
        }

        const todo = new todoModel(todos);  
        await todo.save();

        return res.status(200).json({success : true, msg : "Todo have been saved successfully", todo});
    } catch (error) {
        console.log("error ", error);
        return res.status(400).json({success:false, msg : "error in createTodo"})
    }
}

export const getTodo = async(req,res) => {
    const userId = req.userId;
    
    if(!userId){
        return res.status(404).json({success : false, msg : "Token not found"});
    }

    try {
         const todos = await todoModel.find({
            userId : userId
        })

        return res.json({success : true, todos : todos});
    } catch (error) {
        console.log("error", error);
        return res.json({success : false, msg : "error in getTodo"})
    }
}

export const updateTodo = async(req, res) => {
    const { id } = req.params;
    const { title, due_date, description, isCompleted } = req.body;
    const  userId  = req.userId;

    try {

        const todo = await todoModel.findOne({_id : id, userId : userId});

        if(!todo){
            return res.status(404).json({success : false, msg : "Todo not found"});
        }

        if(due_date){
            const parsedDate = new Date(due_date);
            
            if (isNaN(parsedDate.getTime())) {
                return res.status(400).json({ success: false, msg: "Invalid date format" });
            }
            if (parsedDate < new Date()) {
                return res.status(400).json({ success: false, msg: "Due date cannot be in the past" });
            }

            todo.due_date = parsedDate;
            todo.reminderSent = false;
        }

        if(title){
            todo.title = title;
        }

        if(description !== null || description !== undefined){
            todo.description = description;
        }

        if(isCompleted !== null || isCompleted !== undefined){
            todo.isCompleted = isCompleted;
        }


        await todo.save();
        return res.status(200).json({
            success : true,
            msg : "Todo updated successfully"
        })
    } catch (error) {
        console.log("error ", error);
        return res.status(400).json({ success: false, msg: "Error while updating todo" });
    }
}

export const deleteTodo = async (req, res) => {
    const { id } = req.params;

    try {
        const todo = await todoModel.findOneAndDelete({ _id: id, userId: req.userId });
        
        if (!todo) {
            return res.status(404).json({ success: false, msg: "Todo not found" });
        }

        return res.status(200).json({ success: true, msg: "Todo deleted successfully" });
    } catch (error) {
        console.log("error ", error);
        return res.status(400).json({ success: false, msg: "Error in deleting todo" });
    }
};

export const isCompleted = async (req, res) => {
    const { id } = req.params;

    try {
        const todo = await todoModel.findOne({ _id: id, userId: req.userId });
        
        if (!todo) {
            return res.status(404).json({ success: false, msg: "Todo not found" });
        }

        todo.isCompleted = !todo.isCompleted;
        await todo.save();

        return res.status(200).json({ success: true, msg: "Todo status updated", todo });
    } catch (error) {
        console.log("error ", error);
        return res.status(400).json({ success: false, msg: "Error in isCompleted" });
    }
};

export const verify = async (req,res) => {
    if(!req.userId){
        return res.json({success : false, msg : "userId is missing in req body"});
    }
    try {
        return res.json({success : true, msg : "User is verified"})
    } catch (error) {
        console.log("error in verify", error);
        return res.status(500).json({success : false, msg : "error in verify"});
    }
}
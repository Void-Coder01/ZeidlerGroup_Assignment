import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();

export const generateAndSetJwtToken = async(res, UserId) => {
    const token =  jwt.sign({ UserId}, process.env.JWT_SECRET, {expiresIn : "7d"});

    res.cookie("token" , token ,{
        age : 7*24*60*60*1000
    })

    return token;
}
import jwt from 'jsonwebtoken';

export const auth = async(req,res,next) => {
    try {
        const token = req.cookies.token;
        if(!token){
            res.status(401).json({success : false, msg : "token not provided"})
        }

        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        if(!decodedData){
            res.status(401).json({success : false, msg : "Invalid token "})
        }
        req.userId = decodedData.UserId;

        next();
    } catch (error) {
        console.log("error while verifying token");
        res.status(401).json({success : false, msg : error.message });
    }
}
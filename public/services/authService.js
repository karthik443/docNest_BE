 import User from "../models/userModel.js";
 import jwt from 'jsonwebtoken';
 import bcrypt from 'bcrypt';
 import config from '../config.json' assert {type:'json'}
 import logger from "../essentilas/logger.js";
 import { isNullOrUndefined } from "node:util";
 class authService{

    async createUser(req,res){
        let userName=req.body.userName;
        
        try{
            const saltRounds = 10; // You can adjust this value as needed

            const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
            let userData={"userName":userName,"password":hashedPassword}
            console.log(req.body)
            let data= await User.findOne({'userName':userName})
            if(!isNullOrUndefined(data)){
              logger.info('UserName already exists')
              return res.status(409).json({"info":"Failed","data":"Username already exists",status:1})
            }
            if(req.body.role=='doctor'){
              userData.isDoctor=true
            }
            const newUser = new User(userData)
            data= await newUser.save()
            logger.info('user Created succesfully')
            res.status(201).json({data:data,status:0,info:"user created success"});
            
        }
        catch(e){
          logger.error('error while creating user')
            console.log(e)
            res.status(500).json({"info":"Fail","data":"failed to create user",status:1})
        }
        
    }
    async login(req,res){

        let userName= req.query.userName;
        let password = req.query.password;
        try{
            const user = await User.findOne({ userName });
            if (!user) {
                return res.status(200).json({info:'User not found',status:1,data:{}});
              }
          
              const passwordMatch = await bcrypt.compare(password, user.password);
              if(passwordMatch){
                delete user._doc.password;
                const token = jwt.sign({ user: user }, config.JWT_SECRET_KEY, {
                    expiresIn: '5h', // Token expires in 1 hour
                  });
                  
                  console.log(user)
                  logger.info('login succesful')
                res.status(200).json({info:"Success",data:{token,"message":"user authenticated",user:user},status:0})
              }
              else{
                res.status(204).json({info:"Failed",data:"NOT matching",status:1})
              }
        }
        catch(e){
          logger.info('error while loggin user')
            res.status(500).json({"info":"Fail","data":"Error in backend",status:1})
        }
        
      
    }
}

export default new authService(); 

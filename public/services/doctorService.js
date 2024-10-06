import config from '../config.json' assert {type:'json'}
import logger from "../essentilas/logger.js";
import doctorModel from '../models/doctor.js';
import { isNullOrUndefined } from "node:util";
import  mongoose from 'mongoose';
let ObjectId = mongoose.Types.ObjectId;
console.log('im in doc services');
class doctor{
    
    async getDocList(req,res){
        try{
            
            let searchQuery = req.query.searchQuery
            if(typeof(searchQuery)!='string'){
                res.status(405).json({info:'Invalid Search',status:1,data:{}})
            }
            // if(searchQuery)
            let type= req.query.type;
            let sortBy= req.query.sortBy;
            let typeSearch='description'
            let sortValue=''
            switch(type) {
                case 'name':
                    typeSearch = 'name';
                    break;
                case 'id':
                    typeSearch = '_id';
                    searchQuery = new ObjectId(searchQuery);
                    break;
                case 'specialization':
                    typeSearch = 'specialisation';
                    break;
                default:
                    typeSearch = 'description';
                    break;
            }
            
            switch(sortBy) {
                case 'experience':
                    sortValue = 'experience';
                    break;
                case 'charge':
                    sortValue = 'charge';
                    break;
                default:
                    sortValue = false;
                    break;
            }
            let match={};
            // match[typeSearch]=searchQuery// Filter condition
            if(type!="id"){
                match = { [typeSearch]: { $regex: searchQuery, $options: 'i' } };
            }
            else{
                match[typeSearch]=searchQuery
            }
            
            let sortCondition = {'updatedAt':-1}; // Initialize an empty object for sort
            if (sortValue) {
                sortCondition[sortValue]= -1 ; 
            }
            console.log(match,sortCondition,'GetDoclist match , sort conditions')
            let docData = await doctorModel.find(match)
                .sort( sortCondition) 
                .limit(9);

            docData= JSON.parse(JSON.stringify(docData))
            res.status(200).json({info:'Succesfull found data',status:0,data:docData,count:docData.length})
        }
       catch(e){
        logger.error(e)
        return res.status(404).json({info:'Failed to get doctor`s data',status:1,data:{}});
       }
     
    }
    async updateProfile(req,res){
        if(req.user.isDoctor){
            let newDoc = {
                'name': req.body.name,
                'specialisation': req.body.specialization,
                'charge':req.body.costPerHour,
                'description': req.body.description,
                'caseCount':!isNullOrUndefined(req.body.caseCount)?req.body.caseCount:0,
                'experience':req.body.provenExperience,
                'userId':req.user._id
            }
            try{
                // const doc = new doctorModel(newDoc)
                // let doctor = await doc.save()
                let filter={userId:new ObjectId(req.user._id)}
                let doctor = await doctorModel.findOneAndUpdate(filter,newDoc,{
                    new: true,
                    upsert: true // Make this update into an upsert
                  });
                console.log(doctor)
                res.status(200).json({info:"Profile created Succesfully",data:doctor,status:0})
            }
            catch(e){
                res.status(400).json({info:"Profile created Failure",data:[],status:1})
            }
            
        }
        else{
            res.status(400).json({info:"Not a doctor ",data:[],status:1})
        }
        
    }
}
export default new doctor();
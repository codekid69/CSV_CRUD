const User = require('../models/User');
const csv = require('csvtojson');
const CsvParser=require('json2csv').Parser;
// Saving the csv to database
module.exports.importUser = async function (req, res) {
    try {   
        let userData = [];
        //Converting csv to json
        console.log("data",req.file);
        const data = await csv().fromFile(req.file.path);
        // using iteration for inserting the data
        for (let i = 0; i < data.length; i++) {
            userData.push({
                name: data[i].Name,
                age: data[i].Age,
                email: data[i].Email,
                mobile: data[i].Mobile,
                verified: data[i].Verified,
            })
        }
        let finalData=await User.insertMany(userData)
        res.status(200).send({ data:finalData,message:"Success" })
    } catch (error) {
        console.log(`errorrr ${error}`);
        res.status(401).send({ message: `Error Occured ${error}` });
    }
}

// Getting The data
module.exports.getData = async function (req, res) {
    try {
        const data = await User.find();
        return res.status(200).send({ data: data, message: "Sucess" });
    } catch (error) {
        return res.status(402).send({message:`Error Occured ${error}`})
    }
}
// Creating the new entry 
module.exports.createData = async function (req, res) {
    let { name, age, email, mobile, verified } = req.body
    try{
        let user = await User.create({
            name,
            age,
            email,
            mobile,
            verified
        })
        return res.status(200).send({ data: user });
    }catch(error){
        return res.status(402).send({message:`Error Occured ${error}`});
    }
}

// Updating the Data
module.exports.updateData=async function(req,res){
    let {id}=req.params
    let updatedUser=await User.updateOne(
        {_id:id},
        {$set:req.body},
        {new:true}
    )
    return res.status(200).send({message:"Success",user:{updatedUser}});
}

// Delete the Data
module.exports.deleteData=async function(req,res){
    
    let {id}=req.params
    try{
        let data=await User.findByIdAndDelete(id);
        return res.status(200).send({message:"deleted"})
    }catch(error){
        console.log(`Error occured${error}`);
        return res.status(402).send({message:"Error ocuured"})
    }
}

module.exports.exportData= async function(req,res){
    try{ 
        let users=[];
         let userData=await User.find({});
        userData.forEach((user,index)=>{
            const{name,age,email,mobile,verified}=user;             
            users.push({"S.No":index+1,"Name":name,"Age":age,"Email":email,"Mobile":mobile,"Verified":verified});
        })  
       const csvFeilds=['SNo','Name','Age','Email','Mobile','Verified']
      const csvParser= new CsvParser({csvFeilds});
      const csvData=csvParser.parse(users);
      
      res.setHeader("Content-Type","text/csv");
      res.setHeader("Content-Disposition","attatchment:filename=UserData.csv");
      return res.status(200).end(csvData);

    }catch(error){
        console.log(`Error occured${error}`);
        return res.status(402).send({message:"Error ocuured"})
    }
}
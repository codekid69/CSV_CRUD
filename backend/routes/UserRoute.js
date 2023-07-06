const express=require('express');
const user=express();
const multer=require('multer');
const path=require('path');
const bodyParser=require('body-parser');
const UserController=require('../controllers/UserController')
user.use(bodyParser.urlencoded({extended:true}));  // middleware to accept the file from user
user.use(express.static(path.resolve(__dirname,'public'))) // making public as static folder
const upload=multer({dest:'./public/uploads'})
// Routes
user.get('/data',UserController.getData);
user.get('/export',UserController.exportData);
user.post('/upload',upload.single('file'),UserController.importUser);
user.post('/data',UserController.createData);
user.put('/data/:id',UserController.updateData);
user.delete('/data/:id',UserController.deleteData);
module.exports = user;
const express=require('express');
const port=5000;
const db=require('./config/mongoose');
const cors=require('cors');
const app=express();
app.use(cors());
app.use(express.json())
app.use('/',require('./routes/UserRoute'));

app.listen(port,(error)=>{
    if(error){
        console.log(`Error in running the server ${error}`);
    }
    console.log(`Server running on port ${port}`);
})
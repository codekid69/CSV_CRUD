const mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/Test');

const db=mongoose.connection;

db.on('error',console.error.bind(console,`Error in databse connection`));

db.once('open',()=>{
console.log(`Connected to Databse`);
})
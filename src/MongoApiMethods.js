const express=require('express');
const mongoose=require('mongoose');
const {Schema}= mongoose;
const cors=require('cors');
const corsoptions={
    origin:"https://bmspayment.vercel.app/"
};
const app=express();
app.use(cors(corsoptions))
app.use(express.json());
app.use(express.urlencoded({extended:true}))
//CONNECT MONGODB
mongoose.connect('mongodb+srv://satishp9346:satishp9346@cluster0.qjvzo2a.mongodb.net/Bookmyshow?retryWrites=true&w=majority')
        .then(()=>{console.log('DB connected...')})
        .catch((err)=>{console.log(err.message)});


//SCHEMA
const sch=new Schema({
    id:Number,
    totalAmount:String,
    displayButton:Boolean,
},{versionKey:false})

const monmodel= mongoose.model("ticketdata",sch);

//POST
app.post('/Postdata',async (req,res)=>{
    try{
        const data=new monmodel({
            id:req.body.id,
            totalAmount:req.body.totalAmount,
            displayButton:req.body.displayButton,
        })

        const val= await data.save();
    }
    catch(err){
        console.log(err.message);
    }
})

// PUT
app.put('/Updatedata/:id',async (req,res)=>{
    try{
        const updatedid=req.params.id;
        const updatedtotalAmount=req.body.totalAmount;
        const updatedisplayButton=req.body.displayButton;

        const result= await monmodel.findOneAndUpdate({id:updatedid},{$set:{totalAmount:updatedtotalAmount,displayButton:updatedisplayButton}},
            {new:true})
        
        if(result==null){
            console.log("nothing found");
        }
        else{
            console.log(result)
        }
    }
    catch(err){
        console.log(err.message)
    }
})

//GET
app.get('/Getdata',async (req,res)=>{
    try{
        const data=await monmodel.find();
        console.log(data);
        res.send(data);
    }
    catch(err){
        console.log(err.message);
    }
});

app.listen('4002',()=>{console.log('Server Started...')})

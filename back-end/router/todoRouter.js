const express=require('express')
const router=express.Router()
const asynchandler=require('express-async-handler')
const Todos=require('../models/Todo')

router.get("/",asynchandler(async (req,res)=>{
    const todo=await Todos.find()
    if(todo.length > 0){
        res.status(200).json(todo)
    }else{
        res.status(400).json({message : "Todo Is Vide !!!!!!!!!!!!!"})
    }
}))
router.post("/add",asynchandler(async (req,res)=>{
    const newtodos=new Todos({
        id:req.body.id,
        title:req.body.title,
        iscomplete:req.body.iscomplete,
    })
    const result= await newtodos.save()
    res.status(201).json({message:"ajouter avec seccefuly",result})
}))
router.put("/:id",asynchandler(async (req,res)=>{
    const todo_id=req.params.id
    const todo=await Todos.findOneAndUpdate({id:todo_id},{
        title:req.body.title,
        iscomplete:req.body.iscomplete,
    },{new:true})
if(todo){
    res.status(200).json(todo)
}else{
    res.status(401).json({message:"todo not found !"})
}
}))
router.delete("/:id",asynchandler(async (req,res)=>{
    const todo_id=req.params.id
    const todo=await Todos.findOneAndDelete({id:todo_id})
    if(todo){
        res.status(200).json({message:"todo has been deleted"})
    }else{
        res.status(401).json({message:"todo not found !"})
    }
    }))

module.exports=router;
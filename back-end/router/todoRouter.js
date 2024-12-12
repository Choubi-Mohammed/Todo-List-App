const express=require('express')
const router=express.Router()
const todoController=require("../controllers/contTodo")
router.get("/",todoController.getAlltodos)
router.post("/add",todoController.addTodo)
router.put("/:id",todoController.updatebyId)
router.delete("/:id",todoController.deletebyId)

module.exports=router;
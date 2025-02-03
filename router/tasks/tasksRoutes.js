import express from 'express';
import {dbService,db} from '../../db/dbService.js'; // Ensure to use .js extension
import bcrypt from 'bcrypt'

const taskRouter = express.Router();

const dbUser = dbService(db)

taskRouter.get('/', async (req,res)=>{
    console.log(req.query.id)
    const tasks = await dbUser.getTasks(req.query.id);
    res.json(tasks)
});
taskRouter.post('/addTask' , async (req,res)=>{ 
    const newTask = req.body;
    console.log(newTask);
    try {
        dbUser.insertTask(newTask.user_id, newTask.title, newTask.description, newTask.exp);
        res.status(200).send('Task added successfully');
      }  
    catch (err) {
        console.log(err);
        res.status(500).send('Error adding task');
      }

});
taskRouter.post("/updateStatus" , async (req,res)=>
{
    await dbUser.updateTaskStatus(req.body.id)
    res.status(200).send('statusUpdated')
});
taskRouter.post("/deleteTask", async(req,res)=>
{
    console.log(req.body.id)
    await dbUser.deleteTask(req.body.id)
    res.status(200).send('statusUpdated')
});
taskRouter.post('/addExp', async (req, res) => {
    console.log(req.body.exp);
    try {
      await dbUser.addExp(req.body.exp, req.body.user_id, req.body.task_id);
      res.status(200).send("EXP UPDATE");
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  });
export default taskRouter;
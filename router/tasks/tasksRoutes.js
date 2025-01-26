import express from 'express';
import {dbService,db} from '../../db/dbService.js'; // Ensure to use .js extension
import bcrypt from 'bcrypt'

const taskRouter = express.Router();

const dbUser = dbService(db)

taskRouter.get('/', async (req,res)=>{ // To be fixed
    console.log(req.query.id)
    const tasks = await dbUser.getTasks(req.query.id);
    res.json(tasks)
});
taskRouter.post('/addTask' , async (req,res)=>{ // this is /user/addUser
    const newTask = req.body;
    console.log(newTask);
    try {
        dbUser.insertTask(newTask.user_id, newTask.title, newTask.description, newTask.exp);
        res.status(200).send('User added successfully');
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

export default taskRouter;
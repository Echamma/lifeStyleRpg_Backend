import express from 'express';
import {dbService,db} from '../../db/dbService.js'; // Ensure to use .js extension
import bcrypt from 'bcrypt'

const userRouter = express.Router();

const dbUser = dbService(db)

userRouter.get('/', (req,res)=>{
    console.log(req.query.id)
    const user = dbUser.getUser(req.query.id);
    res.json(user)
});
userRouter.post('/addUser' , async (req,res)=>{ // this is /user/addUser
    const newUser = req.body;
    try {
        console.log(newUser);
        bcrypt.hash(newUser.password,10, (err,hash)=>{
            dbUser.insertUser(newUser.username, hash);
        })
        res.status(200).send('User added successfully');
      } 
    catch (err) {
        console.log("something happened");
        res.status(500).send('Error adding user');
      }

});
userRouter.get('/checkUser', async (req,res) => {
    try {
        const result = await dbUser.checkUser(req.query.username, req.query.password)
        res.json({ "check": result })
    } catch(error) {
        console.error(error)
        res.status(500).json({ "check": false, "error": "Server error" })
    }
})

export default userRouter;
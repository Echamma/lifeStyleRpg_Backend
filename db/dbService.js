import betterSqlite3 from 'better-sqlite3';
import bcrypt from 'bcrypt'
const db = betterSqlite3('./db/database.db');

const dbService = (database) =>{
    const insertTask = async (user_id,Title,Desc,Exp) =>
    {
        const sql = 'INSERT INTO tasks (user_id, title, description, exp, status) VALUES (?, ?, ?, ?, FALSE);'
        db.prepare(sql).run(user_id,Title,Desc,Exp)
    }
    const updateTaskStatus = async (task_id) => {
        const sql = 'UPDATE tasks SET status = 1 WHERE task_id = ?';
        await db.prepare(sql).run(task_id);
        console.log("this is working")
    }    
    const getTasks = async (id) => 
    {
        const sql = 'SELECT * FROM tasks WHERE user_id = ?'
        const rows = await db.prepare(sql).all(id)
        return rows
    }
    const getUser = (id) => 
    {
        const sql = 'SELECT * FROM users WHERE user_id = ?'
        const user = db.prepare(sql).get(id)
        return user
    }
    const deleteTask = async (id) =>
    {
        const sql = 'DELETE FROM tasks WHERE task_id = ?'
        const user = await db.prepare(sql).run(id)
        return "task has been deleted"
    }
    const insertUser = async (username,password) =>
    {
        const tryingToGetUser = 'SELECT * FROM users WHERE username = ?'
            
        try
        {
            const user = db.prepare(tryingToGetUser).get(username)
            if(user){
                console.log("User already Exists");
                return;
            }
            const sql = 'INSERT INTO users (username,passHash) VALUES (?,?);'
            db.prepare(sql).run(username,password)
            console.log('User created successfully')
        
        }
        catch(error)
        { 
            console.error('Database error:',error)
        }
    }
    const checkUser = async (username, password) =>
    {
        const checkUsername = 'SELECT * FROM users WHERE username = ?'
        try{
            const user = db.prepare(checkUsername).get(username)
            if(user)
            {
                if(!bcrypt.compare(password, user.passHash))
                {return false}
                console.log("returning true")
                return user.user_id
            }
            return 'false'
        }
        catch(error)
        {
            console.log(error)
            return 'false'
        }
    }
    const addExp = async(exp, user_id,task_id) =>
        {
            const sql = 'UPDATE users SET exp = exp + ? WHERE user_id=?'
            
            await db.prepare(sql).run(exp,user_id)
            console.log("exp added")
            deleteTask(task_id)
        } 


    return {
        addExp,
        insertTask,
        getTasks,
        getUser ,
        deleteTask,
        insertUser,
        updateTaskStatus,
        checkUser
    };
}

export { dbService, db};

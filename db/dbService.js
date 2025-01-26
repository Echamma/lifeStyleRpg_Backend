import betterSqlite3 from 'better-sqlite3';

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
    const deleteTask =async (id) =>
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
            db.prepare(tryingToGetUser).get(username)
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
    return {
        insertTask,
        getTasks,
        getUser ,
        deleteTask,
        insertUser,
        updateTaskStatus
    };
}

export { dbService, db};

import express from 'express';
import userRoutes from './router/auth/userRoutes.js';
import bodyParser from 'body-parser';
import cors from 'cors'
import taskRouter from './router/tasks/tasksRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "*", methods: "GET, POST, PUT, PATCH, DELETE" }));
app.use(express.json({ limit: "20GB" }));

app.use('/user',userRoutes);
app.use('/tasks', taskRouter);
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
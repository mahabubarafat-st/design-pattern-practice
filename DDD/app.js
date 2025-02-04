const express = require('express');
const taskRouter = require('./routes/taskRoutes');

const app = express();
app.use(express.json());

app.use('/tasks', taskRouter);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
const express = require('express');
const taskRoutes = require('./src/routes/taskRoutes');
const { PORT } = require('./config/constants');

const app = express();
app.use(express.json());

app.use('/tasks', taskRoutes);

app.listen(PORT, () => {
    console.log(`Server Running on PORT: ${PORT}`)
})
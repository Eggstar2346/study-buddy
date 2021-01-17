module.exports = (app, pool) => {
    
    app.post('/tasks/addTask', async(req, res) => {
        const {task_name, course_id, task_type, due_date, completed, grade_weight, grade} = req.body
        const response = await pool.query(`
            INSERT INTO tasks (task_id, task_name, course_id, task_type, due_date, completed, grade, grade_weight, score, time_completed) 
            VALUES (0, ${task_name}, ${course_id}, ${task_type}, ${due_date}, ${completed}, ${grade}, ${grade_weight}, NULL, NULL)
        `)
        console.log(response)
        if(response) {
            res.send('created tasks!')
        }
    })

    app.get('/tasks/:task_id/getGrade', async(req, res) => {
        const {task_id} = req.params
        const response = await pool.query(`
            SELECT grade FROM tasks WHERE task_id = ${task_id}
        `)
        console.log(response, response.rows)
    })


    app.get('/tasks/:task_id/getDueDateAndGradeWeight', async(req, res) => {
        const {task_id} = req.params 
        const response = await pool.query(`
            SELECT due_date, grade_weight FROM TASKS WHERE task_id = ${task_id}
        `)
        console.log(response, response.rows)
    })

    app.post('/tasks/setScore', async(req, res) => {
        const {task_id, score} = req.body 
        const response = await pool.query(`
            UPDATE tasks SET score = ${score} WHERE task_id = ${task_id}
        `)
        console.log(response, response.rows)
    })

    app.post('/tasks/setCompleted', async(req, res) => {
        const task_id = req.body 
        const response = await pool.query(`
            UPDATE tasks SET completed = TRUE WHERE task_id = ${task_id};
        `)
        console.log(response, response.rows)
    })

}
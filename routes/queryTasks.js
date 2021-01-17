module.exports = (app, pool) => {
    
    app.post('/tasks/addTask', async(req, res) => {
        const {task_name, course_id, task_type, due_date, grade_weight} = req.body

        const allRows = await pool.query(` SELECT task_id FROM studybuddy.tasks `)
        const num = allRows.rowCount > 0 ? parseInt(allRows.rows[allRows.rowCount - 1].task_id) + 1 : 0
        console.log('num: ', num, allRows.rows)

        const response = await pool.query(`
            INSERT INTO studybuddy.tasks (task_id, task_name, course_id, task_type, due_date, completed, grade, grade_weight, score, time_completed) 
            VALUES (${num}, '${task_name}', ${course_id}, '${task_type}', '${due_date}', FALSE, NULL, ${grade_weight}, NULL, NULL)
        `)
        res.send({
            msg: 'created task!',
            info: {
                course_id: course_id,
                task_id: num,
                task_name: task_name,
                task_type: task_type,
                due_date: due_date,
                completed: false, 
                grade:null, 
                grade_weight: grade_weight, 
                score:null, 
                time_completed: null
            }
        })

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

    // TODO: add student ID as well
    app.get('/tasks/:course_id/getAll', async(req, res) => {
        const {course_id} = req.params 
        const response = await pool.query(`
            SELECT task_id, task_name, due_date, grade_weight, grade, task_type, completed FROM studybuddy.tasks WHERE course_id = ${course_id}
        `)
        res.send(response.rows)
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
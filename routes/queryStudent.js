module.exports = (app, pool) => {
    
    app.post('/student/createStudent', async(req, res) => {
        const {id, email, pwd, student_name, mode} = req.body
        const response = await pool.query(`
            INSERT INTO student (id, email, pwd, student_name, mode) 
            VALUES (${id}, ${email}, ${pwd}, ${student_name}, ${mode})
        `)
        console.log(response)
        if(response) {
            res.send('created student!')
        }
    })

    app.post('/student/updateMode', async(req, res) => {
        const {mode, id} = req.body
        const response = await pool.query(`
            UPDATE student SET mode = ${mode} WHERE id = ${id};
        `)
        console.log(response)
        if(response) {
            res.send('updated mode to' + mode + '!')
        }
    })

    app.get('/student/:sid/getRecommendedTasks', async(req,res) => {
        const {sid} = req.params
        const response = await pool.query(`
            SELECT task_name, studybuddy.course.course_name, 0.15 * grade_weight::float + 0.1 * (100 - studybuddy.Course.grade::float) + 0.15 * course_priority::float AS score
            FROM studybuddy.Tasks JOIN studybuddy.Course ON studybuddy.Tasks.course_id = studybuddy.Course.course_id
            WHERE studybuddy.Course.student_id = ${sid} 
            ORDER BY score DESC
        `)
        console.log('SCORE QUERY:',response.rows)
        res.send(response.rows)
    })
// + 0.6 * (30 - DATE_PART('day', due_date::timestamp - CURRENT_DATE::timestamp))
// AND (TO_DATE(due_date, 'MM-DD-YY') < CURRENT_DATE + 30 * INTERVAL '1 day')
}
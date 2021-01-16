module.exports = (app, pool) => {

    app.post('/courses/addCourse', async(req, res) => {
        const {course_id, student_id, profs, profs_email, tas, ta_emails, description, course_name, grade, type, priority, timetable} = req.body
        const response = await pool.query(`
            INSERT INTO courses (course_id, student_id, profs, profs_email, tas, ta_emails, desr, course_name, grade, type, priority, timetable) 
            VALUES (${course_id}, ${student_id}, ${profs}, ${profs_email}, ${tas}, ${ta_emails}, ${description}, ${course_name}, ${grade}, ${type}, ${course_priority}, ${timetable})
        `)
        console.log(response)
        if(response) {
            res.send('created course!')
        }
    })

    app.get('/courses/getCourseDetails', async(req, res) => {
        const sid = req.body
        const response = await pool.query(`
            SELECT * FROM courses WHERE student_id = ${sid}
        `)
        console.log(response.rows[0])
        if(response.rows[0]) {
            console.log('retrieved course ' + response.rows[0]['course_name'])
            res.send(response.rows[0])
        }
    })

    // called everytime a new grade in tasks is entered
    app.post('/courses/updateGrade', async(req, res) => {
        const { grade, grade_weight, course_id } = req.body
        const response = await pool.query(`
            UPDATE courses SET grade =
            SELECT sum(${grade}) / sum(${grade_weight}) * 100 FROM tasks
            WHERE course_id = ${course_id} AND grade IS NOT NULL
            GROUP BY ${course_id}
        `)
        console.log(response)
    })

    app.get('/courses/getGrade', async(req, res) => {
        const {course_id, student_id} = req.body 
        const response = await pool.query(`
            SELECT grade FROM courses 
            WHERE course_id = ${course_id} AND student_id = ${student_id}
        `)
        console.log(response, response.rows)
    })

    app.get('/courses/getPriority', async(req, res) => {
        const {course_id, student_id} = req.body 
        const response = await pool.query(`
            SELECT course_priority FROM courses 
            WHERE course_id = ${course_id} AND student_id = ${student_id};
        `)
        console.log(response, response.rows)
    })

    app.get('/courses/getTimetable', async(req, res) => {
        const {course_id, student_id} = req.body 
        const response = await pool.query(`
            SELECT timetable FROM courses 
            WHERE course_id = ${course_id} AND student_id = ${student_id}
        `)
        console.log(response, response.rows)
    })

    app.get('/courses/removeCourse', async(req, res) => {
        const course_id = req.body 
        const response = await pool.query(`
            DELETE FROM courses WHERE course_id = ${course_id}
        `)
        console.log(response, response.rows)
    })

}
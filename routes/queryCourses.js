module.exports = (app, pool) => {

    app.post('/courses/addCourse', async(req, res) => {
        const {timetable, student_id, course_name} = req.body

        const allRows = await pool.query(` SELECT course_id FROM studybuddy.course `)
        const num = allRows.rowCount > 0 ? parseInt(allRows.rows[allRows.rowCount - 1].course_id) + 1 : 0
        console.log('num: ', num, allRows.rows)
        const response = await pool.query(`
            INSERT INTO studybuddy.course (course_id, student_id, profs, profs_email, tas, ta_emails, descr, course_name, grade, course_type, course_priority, timetable) 
            VALUES (${num}, '${student_id}', NULL, NULL, NULL, NULL, NULL, '${course_name}', NULL, NULL, NULL, '${timetable}')
        `)
        res.send({
            msg: 'created course!',
            info: {
                course_id: num,
                student_id: student_id,
                profs: null,
                profs_email: null,
                tas: null,
                ta_emails: null,
                descr: null,
                course_name: course_name,
                grade: null,
                course_type: null,
                course_priority: null,
                timetable: timetable
            }
        })
    })

    app.get('/courses/:sid/getCourseDetails', async(req, res) => {
        const sid = req.params.sid
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

    app.get('/courses/:course_id/:student_id/getGrade', async(req, res) => {
        const {course_id, student_id} = req.params 
        const response = await pool.query(`
            SELECT grade FROM courses 
            WHERE course_id = ${course_id} AND student_id = ${student_id}
        `)
        console.log(response, response.rows)
    })

    app.get('/courses/:course_id/:student_id/getPriority', async(req, res) => {
        const {course_id, student_id} = req.params 
        const response = await pool.query(`
            SELECT course_priority FROM courses 
            WHERE course_id = ${course_id} AND student_id = ${student_id};
        `)
        console.log(response, response.rows)
    })

    app.get('/courses/:course_id/:student_id/getTimetable', async(req, res) => {
        const {course_id, student_id} = req.params 
        const response = await pool.query(`
            SELECT timetable FROM courses 
            WHERE course_id = ${course_id} AND student_id = ${student_id}
        `)
        console.log(response, response.rows)
    })

    app.delete('/courses/removeCourse', async(req, res) => {
        const course_id = req.body 
        const response = await pool.query(`
            DELETE FROM courses WHERE course_id = ${course_id}
        `)
        console.log(response, response.rows)
    })

}
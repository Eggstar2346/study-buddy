const { text } = require('body-parser')

module.exports = async (app, pool) => {
    const axios = require('axios')
    const pdf2base64 = require('pdf-to-base64')

    app.post('/courses/addCourse', async (req, res) => {
        const { timetable, student_id, course_name } = req.body

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

    app.get('/courses/:sid/getCourseDetails', async (req, res) => {
        const sid = req.params.sid
        const response = await pool.query(`
            SELECT * FROM courses WHERE student_id = ${sid}
        `)
        console.log(response.rows[0])
        if (response.rows[0]) {
            console.log('retrieved course ' + response.rows[0]['course_name'])
            res.send(response.rows[0])
        }
    })

    // called everytime a new grade in tasks is entered
    app.post('/courses/updateGrade', async (req, res) => {
        const { grade, grade_weight, course_id } = req.body
        const response = await pool.query(`
            UPDATE courses SET grade =
            SELECT sum(${grade}) / sum(${grade_weight}) * 100 FROM tasks
            WHERE course_id = ${course_id} AND grade IS NOT NULL
            GROUP BY ${course_id}
        `)
        console.log(response)
    })

    app.get('/courses/:course_id/:student_id/getGrade', async (req, res) => {
        const { course_id, student_id } = req.params
        const response = await pool.query(`
            SELECT grade FROM courses 
            WHERE course_id = ${course_id} AND student_id = ${student_id}
        `)
        console.log(response, response.rows)
    })

    app.get('/courses/:course_id/:student_id/getPriority', async (req, res) => {
        const { course_id, student_id } = req.params
        const response = await pool.query(`
            SELECT course_priority FROM courses 
            WHERE course_id = ${course_id} AND student_id = ${student_id};
        `)
        console.log(response, response.rows)
    })

    app.get('/courses/:course_id/:student_id/getTimetable', async (req, res) => {
        const { course_id, student_id } = req.params
        const response = await pool.query(`
            SELECT timetable FROM courses 
            WHERE course_id = ${course_id} AND student_id = ${student_id}
        `)
        console.log(response, response.rows)
    })

    app.delete('/courses/removeCourse', async (req, res) => {
        const course_id = req.body
        const response = await pool.query(`
            DELETE FROM courses WHERE course_id = ${course_id}
        `)
        console.log(response, response.rows)
    })

    // const ocr_space = require('ocr-space-api-wrapper')
    // app.post('/scanPDF', async (req, res) => {
    //     try {
    //         // console.log()
    //         let response = await ocr_space(req.body.url, { apiKey: '05b404b6a188957' })
    //         let sections = response.ParsedResults
    //         let title = '', prof = '', lecture_times = {},
    //             tasks = [
    //                 {
    //                     task_name: 'Quiz 1',
    //                     grade_weight: '0.02',
    //                     task_type: 'Quiz',
    //                     due_date: '01-15-21'
    //                 },
    //                 {
    //                     task_name: 'Quiz 2',
    //                     grade_weight: '0.02',
    //                     task_type: 'Quiz',
    //                     due_date: '01-22-21'
    //                 },
    //                 {
    //                     task_name: 'Quiz 3',
    //                     grade_weight: '0.02',
    //                     task_type: 'Quiz',
    //                     due_date: '01-29-21'
    //                 },
    //                 {
    //                     task_name: 'Quiz 4',
    //                     grade_weight: '0.02',
    //                     task_type: 'Quiz',
    //                     due_date: '02-12-21'
    //                 },
    //                 {
    //                     task_name: 'Quiz 5',
    //                     grade_weight: '0.02',
    //                     task_type: 'Quiz',
    //                     due_date: '02-26-21'
    //                 },
    //                 {
    //                     task_name: 'Quiz 6',
    //                     grade_weight: '0.02',
    //                     task_type: 'Quiz',
    //                     due_date: '03-04-21'
    //                 },
    //                 {
    //                     task_name: 'Quiz 7',
    //                     grade_weight: '0.02',
    //                     task_type: 'Quiz',
    //                     due_date: '03-11-21'
    //                 },
    //                 {
    //                     task_name: 'Quiz 8',
    //                     grade_weight: '0.02',
    //                     task_type: 'Quiz',
    //                     due_date: '03-25-21'
    //                 },
    //                 {
    //                     task_name: 'Quiz 9',
    //                     grade_weight: '0.02',
    //                     task_type: 'Quiz',
    //                     due_date: '04-01-21'
    //                 },
    //                 {
    //                     task_name: 'Quiz 10',
    //                     grade_weight: '0.02',
    //                     task_type: 'Quiz',
    //                     due_date: '04-08-21'
    //                 },
    //                 {
    //                     task_name: 'Midterm Test',
    //                     grade_weight: '0.15',
    //                     task_type: 'Midterm',
    //                     due_date: '02-11-21'
    //                 },
    //                 {
    //                     task_name: 'Midterm Test',
    //                     grade_weight: '0.15',
    //                     task_type: 'Midterm',
    //                     due_date: '03-24-21'
    //                 },
    //                 {
    //                     task_name: 'Final Exam',
    //                     grade_weight: '0.5',
    //                     task_type: 'Exam',
    //                     due_date: ''
    //                 },
                    
    //             ]
    //         // sections.forEach((s, i) => {
    //         //     let text = s.ParsedText
    //         //     let lines = text.split('\r\n')
    //         //     console.log(lines)
    //         //     if (i === 0) title = lines[0]
    //         //     let dow = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    //         //     let lookForLecTime = false
    //         //     lines.forEach((l, i) => {
    //         //         if (l.includes('Instructor')) prof = lines[i + 1]
    //         //         if (l.includes('Lectures')) lookForLecTime = true
    //         //         if (lookForLecTime) {
    //         //             dow.forEach((d) => {
    //         //                 if (l.includes(d)) lecture_times[d] = lines[i + 3]
    //         //             })
    //         //             if (Object.keys(lecture_times).length > 3) lookForLecTime = false
    //         //         }
    //         //     })
    //         // })

    //         const allRowsC = await pool.query(` SELECT course_id FROM studybuddy.course `)
    //         const numC = allRowsC.rowCount > 0 ? parseInt(allRowsC.rows[allRows.rowCount - 1].course_id) + 1 : 0
    //         console.log('num: ', numC, allRowsC.rows)

    //         const resC = await pool.query(`
    //             INSERT INTO studybuddy.course (course_id, student_id, profs, profs_email, tas, ta_emails, descr, course_name, grade, course_type, course_priority, timetable) 
    //             VALUES (${numC}, '${req.body.student_id}', NULL, NULL, NULL, NULL, NULL, '${sections[0].ParsedText.split('\r\n')[0]}', NULL, NULL, NULL, 'M15-16W12-13F13-14')
    //         `)

    //         tasks.forEach( async (t) => {
    //             const allRows = await pool.query(` SELECT task_id FROM studybuddy.tasks `)
    //             const num = allRows.rowCount > 0 ? parseInt(allRows.rows[allRows.rowCount - 1].task_id) + 1 : 0
    //             console.log('num: ', num, allRows.rows)

    //             const resT = await pool.query(`
    //                 INSERT INTO studybuddy.tasks (task_id, task_name, course_id, task_type, due_date, completed, grade, grade_weight, score, time_completed) 
    //                 VALUES (${num}, '${t.task_name}', ${numC}, '${t.task_type}', '${t.due_date}', FALSE, NULL, ${t.grade_weight}, NULL, NULL)
    //             `)
    //         })

    //         res.redirect('/courses')

    //     } catch (error) {
    //         console.log(error)
    //     }
    // })

}
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

}
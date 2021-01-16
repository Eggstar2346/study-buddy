module.exports = async (app, pool) => {

    app.get('/user/getCourses', async (req, res) => {
        const response = await pool.query('SELECT * FROM accounts')
        const data = response.rows //an array from table
    })
    
}
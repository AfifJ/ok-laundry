const pool = require('../utils/database')

exports.createTransaction = async (data) => {
	const { id_user, id_monthly_report, date, total_price, status } = data
	const query =
		'INSERT INTO transactions(id_user, id_monthly_report, date, total_price, status) VALUES($1, $2, $3, $4, $5)'
	const values = [id_user, id_monthly_report, date, total_price, status]

	try {
		const result = await pool.query(query, values)
		return result.insertId
	} catch (error) {
		throw error
	}
}

exports.createUser = async (user) => {
	const { name, email, password } = user
	const hashedPassword = await bcrypt.hash(password, 10)

	const [result] = await pool.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [
		name,
		email,
		hashedPassword
	])

	return result.insertId
}

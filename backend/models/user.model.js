const pool = require('../utils/database')
const bcrypt = require('bcrypt')

exports.getUserByEmail = async (email) => {
	const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email])
	return rows[0]
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

exports.getAdminByEmail = async (email) => {
	const [rows] = await pool.query('SELECT * FROM admins WHERE email = ?', [email])
	return rows[0]
}

exports.createAdmin = async (user) => {
	const { name, email, password } = user
	const hashedPassword = await bcrypt.hash(password, 10)

	const [result] = await pool.query('INSERT INTO admins (name, email, password) VALUES (?, ?, ?)', [
		name,
		email,
		hashedPassword
	])

	return result.insertId
}

exports.updateUser = async (name, email, id) => {
	const [result] = await pool.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [
		name,
		email,
		id
	])

	return result.affectedRows > 0
}

exports.getUserDetailByEmail = async (email) => {
	const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email])
	return rows[0]
}

exports.updatePassword = async (hashedPassword, id) => {
	const [result] = await pool.query('UPDATE users SET password = ? WHERE id = ?', [
		hashedPassword,
		id
	])

	return result.affectedRows > 0
}


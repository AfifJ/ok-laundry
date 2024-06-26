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

exports.getAllAdmins = async () => {
  const [rows] = await pool.query('SELECT * FROM admins')
  return rows
}

exports.getAdminByEmail = async (email) => {
	const [rows] = await pool.query(`SELECT * FROM admins WHERE email = ?`, [email])
	return rows[0]
}

exports.getManagerByEmail = async (email) => {
  const [rows] = await pool.query(`SELECT * FROM managers WHERE email = ?`, [email])
  return rows[0]
}

exports.createManager = async (user) => {
  const { name, email, password } = user
  const hashedPassword = await bcrypt.hash(password, 10)

  const [result] = await pool.query('INSERT INTO managers (name, email, password) VALUES (?, ?, ?)', [
    name,
    email,
    hashedPassword
  ])

  return result.insertId
}

exports.updateManager = async (name, email, id) => {
  const [result] = await pool.query('UPDATE managers SET name = ?, email = ? WHERE id = ?', [
    name,
    email,
    id
  ])

  return result.affectedRows > 0
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

exports.updateAdmin = async (name, email, id) => {
  const [result] = await pool.query('UPDATE admins SET name = ?, email = ? WHERE id = ?', [
    name,
    email,
    id
  ])

  return result.affectedRows > 0
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

exports.findUserIdByEmail = async (email) => {
	const [users] = await pool.query('SELECT id FROM users WHERE email = ?', [email])

	if (users.length === 0) {
		return null
	}

	return users[0].id
}

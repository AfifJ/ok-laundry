const bcrypt = require('bcrypt')
const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')

exports.login = async (req, res) => {
	const JWT_SECRET = process.env.JWT_SECRET || 'secret'
	try {
		const { email, password } = req.body

		const user = await userModel.getUserByEmail(email)

		if (!user) {
			return res.status(401).json({ message: 'Email tidak ditemukan' })
		}

		if (!password || !user.password) {
			return res.status(400).json({ message: 'Data tidak lengkap' })
		}

		const isPasswordValid = await bcrypt.compare(password, user.password)

		if (!isPasswordValid) {
			return res.status(401).json({ message: 'Password salah' })
		}

		const token = jwt.sign(
			{ userId: user.id },
			JWT_SECRET,
			{ expiresIn: '1h' } // Token akan kadaluarsa dalam 1 jam
		)

		res.json({ message: 'Login berhasil', token: token })
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: 'Internal Server Error' })
	}
}

exports.register = async (req, res) => {
	try {
		const { name, email, password } = req.body

		const newUserId = await userModel.createUser({ name, email, password })

		res.status(201).json({ id: newUserId })
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: 'Internal Server Error' })
	}
}

exports.registerAdmin = async (req, res) => {
	try {
		const { name, email, password } = req.body

		const newUserId = await userModel.createAdmin({ name, email, password })

		res.status(201).json({ id: newUserId })
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: 'Internal Server Error' })
	}
}

exports.loginAdmin = async (req, res) => {
	try {
		const { email, password } = req.body

		const user = await userModel.getAdminByEmail(email)

		if (!user || !user.is_admin) {
			return res.status(401).json({ message: 'Email tidak ditemukan' })
		}

		const isPasswordValid = await bcrypt.compare(password, user.password)

		if (!isPasswordValid) {
			return res.status(401).json({ message: 'Password salah' })
		}

		// Lakukan tindakan selanjutnya, seperti membuat token autentikasi

		res.json({ message: 'Login berhasil' })
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: 'Internal Server Error' })
	}
}

exports.getUserDetailByEmail = async (req, res) => {
	try {
		const { email } = req.body

		const user = await userModel.getUserDetailByEmail(email)

		if (!user) {
			return res.status(404).json({ message: 'Email tidak ditemukan' })
		}

		res.json({ user })
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: 'Internal Server Error' })
	}
}

exports.updateProfile = async (req, res) => {
	const { name, email, id } = req.body

	const success = await userModel.updateUser(name, email, id)

	if (success) {
		res.status(200).json({ message: 'Profile updated successfully.' })
	} else {
		res.status(400).json({ message: 'Failed to update profile.' })
	}
}

exports.updatePassword = async (req, res) => {
  const { password } = req.body;
  const { id } = req.params;

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await userModel.updatePassword(hashedPassword, id);

  if (result) {
    res.json({ message: 'Password updated successfully' });
  } else {
    res.status(400).json({ message: 'Failed to update password' });
  }
};

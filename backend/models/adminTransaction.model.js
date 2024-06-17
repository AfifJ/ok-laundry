const pool = require('../utils/database')

exports.createTransaction = async (data) => {
	const { id_user, date, total_price, status } = data
	const query = 'INSERT INTO transactions(id_user, date, total_price, status) VALUES(?, ?, ?, ?, ?)'
	const values = [id_user, date, total_price, status]

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

exports.getTransactionDetails = async (transactionId) => {
	const [transactions] = await pool.query(
		`SELECT
      t.id,
      CONCAT(
        DAY(t.date),
        ' ',
        CASE MONTH(t.date)
            WHEN 1 THEN 'Januari'
            WHEN 2 THEN 'Februari'
            WHEN 3 THEN 'Maret'
            WHEN 4 THEN 'April'
            WHEN 5 THEN 'Mei'
            WHEN 6 THEN 'Juni'
            WHEN 7 THEN 'Juli'
            WHEN 8 THEN 'Agustus'
            WHEN 9 THEN 'September'
            WHEN 10 THEN 'Oktober'
            WHEN 11 THEN 'November'
            WHEN 12 THEN 'Desember'
        END,
        ' ',
        YEAR(t.date)
    ) AS date,
      t.total_price,
      t.status,
      u.name AS user_name,
      u.email AS user_email,
      mr.income,
      mr.date AS report_date
    FROM transactions t
    LEFT JOIN users u ON t.id_user = u.id
    JOIN monthly_reports mr ON t.id_monthly_report = mr.id
    WHERE t.id = ?`,
		[transactionId]
	)

	if (transactions.length === 0) {
		return null
	}

	const transaction = transactions[0]

	const [clothes] = await pool.query(
		'SELECT type, qty, price, total FROM clothes WHERE id_transaction = ?',
		[transactionId]
	)

	transaction.clothes = clothes

	return transaction
}


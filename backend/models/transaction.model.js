const pool = require('../utils/database')

exports.getTransactionDetails = async (userId, transactionId) => {
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
    WHERE t.id = ? AND t.id_user = ?`,
		[transactionId, userId]
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

exports.getAllTransactions = async () => {
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
    t.date as date_row,
    t.id_user as id_user,
    t.total_price,
    t.status,
    u.name AS user_name,
    u.email AS user_email,
    GROUP_CONCAT(
        CONCAT(c.type, " ", c.qty) SEPARATOR ', '
    ) AS title
FROM
    transactions t
    LEFT JOIN users u ON t.id_user = u.id
    JOIN clothes c ON t.id = c.id_transaction
GROUP BY
    t.id
    `
	)

	return transactions
}

exports.getTransactionsByUserId = async (userId) => {
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
    GROUP_CONCAT(
        CONCAT(c.type, " ", c.qty) SEPARATOR ', '
    ) AS title
FROM
    transactions t
    JOIN users u ON t.id_user = u.id
    JOIN clothes c ON t.id = c.id_transaction
WHERE 
    u.id = ?
GROUP BY
    t.id
ORDER BY t.date DESC
    `,
		[userId]
	)

	return transactions
}

exports.createReport = async (report) => {
	const { id_user, title, desc, report_date, id_transaction, phone_number, status } = report

	const [result] = await pool.query(
		`INSERT INTO customer_reports 
    (id_user, 
    title, 
    \`desc\`, 
    report_date, 
    id_transaction, 
    phone_number, 
    status) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
		[id_user, title, desc, report_date, id_transaction, phone_number, status]
	)

	return result.insertId
}

exports.updateTransactionStatus = async (id_transaction, status) => {
	const [result] = await pool.query(
		`UPDATE transactions 
    SET status = ? 
    WHERE id_transaction = ?`,
		[status, id_transaction]
	)

	return result.affectedRows
}

exports.createTransaction = async (body) => {
	const { userId, clothes, status, totalPrice } = body
	const currentDate = new Date()

	const [monthlyReports] = await pool.query(
		'SELECT id FROM monthly_reports WHERE MONTH(date) = ? AND YEAR(date) = ?',
		[currentDate.getMonth() + 1, currentDate.getFullYear()]
	)

	let monthlyReportId
	if (monthlyReports.length === 0) {
		const [newMonthlyReport] = await pool.query(
			'INSERT INTO monthly_reports (income, date) VALUES (0, ?)',
			[currentDate]
		)
		monthlyReportId = newMonthlyReport.insertId
	} else {
		monthlyReportId = monthlyReports[0].id
	}

	const [newTransaction] = await pool.query(
		'INSERT INTO transactions (id_user, id_monthly_report, date, total_price, status) VALUES (?, ?, ?, ?, ?)',
		[userId, monthlyReportId, currentDate, totalPrice, status]
	)

	const transactionId = newTransaction.insertId

	// Menambahkan pakaian ke transaksi
	for (const cloth of clothes) {
        await pool.query(
            'INSERT INTO clothes (id_transaction, type, qty, price, total) VALUES (?, ?, ?, ?, ?)',
            [transactionId, cloth.type, cloth.quantity, cloth.price, cloth.quantity * cloth.price]
        )
	}

	// Memperbarui total pendapatan di laporan bulanan
	await pool.query('UPDATE monthly_reports SET income = income + ? WHERE id = ?', [
		totalPrice,
		monthlyReportId
	])
}
exports.updateTransactionStatus = async (transactionId, status) => {
  const [result] = await pool.query(
    `UPDATE transactions 
    SET status = ? 
    WHERE id = ?`,
    [status, transactionId]
  );

  return result.affectedRows;
};

exports.getAllCustomerReports = async () => {
  const [reports] = await pool.query(
    `SELECT * FROM customer_reports`
  );

  return reports;
}


exports.getCustomerReportDetails = async (reportId) => {
  const [reports] = await pool.query(
    `SELECT
      cr.id,
      cr.title,
      cr.desc,
      cr.status,
      cr.phone_number,
      u.name AS user_name
    FROM
      customer_reports cr
      JOIN users u ON cr.id_user = u.id
    WHERE
      cr.id = ?`,
    [reportId]
  );

  if (reports.length === 0) {
    return null;
  }

  const report = reports[0];

  return report;
}

exports.updateCustomerReportStatus = async (reportId, status) => {
  const [result] = await pool.query(
    `UPDATE customer_reports 
    SET status = ? 
    WHERE id = ?`,
    [status, reportId]
  );

  return result.affectedRows;
};

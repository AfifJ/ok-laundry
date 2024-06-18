const transactionModel = require('../models/transaction.model')

exports.getTransactionDetails = async (req, res) => {
	try {
		const transactionId = req.params.id
		const userId = req.params.userid
		const transaction = await transactionModel.getTransactionDetails(userId, transactionId)

		if (!transaction) {
			return res.status(404).json({ message: 'Transaksi tidak ditemukan' })
		}

		res.json(transaction)
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: 'Internal Server Error' })
	}
}

exports.getAllTransactions = async (req, res) => {
	try {
		const transactions = await transactionModel.getAllTransactions()
		res.json(transactions)
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: 'Internal Server Error' })
	}
}

exports.getTransactionsByUserId = async (req, res) => {
	try {
		const userId = req.params.userid
		const transactions = await transactionModel.getTransactionsByUserId(userId)
		res.json(transactions)
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: 'Internal Server Error' })
	}
}

exports.createReport = async (req, res) => {
	const report = req.body

	try {
		const data = await transactionModel.createReport(report)
		res.status(201).json({ id: data.insertId })
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: 'Internal Server Error' })
	}
}

exports.updateTransactionStatus = async (req, res) => {
	try {
		const id = req.params.id
		const { status } = req.body

		const result = await transactionModel.updateTransactionStatus(id, status)

		if (result === 0) {
			return res.status(404).json({ message: 'Transaksi tidak ditemukan' })
		}

		res.json({ message: 'Status transaksi berhasil diupdate' })
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: 'Internal Server Error' })
	}
}

exports.getAllReports = async (req, res) => {
	try {
		const reports = await transactionModel.getAllCustomerReports()
		res.json(reports)
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: 'Internal Server Error' })
	}
}

exports.getCustomerReportDetails = async (req, res) => {
	try {
		const reportId = req.params.id
		const report = await transactionModel.getCustomerReportDetails(reportId)

		if (!report) {
			return res.status(404).json({ message: 'Laporan tidak ditemukan' })
		}

		res.json(report)
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: 'Internal Server Error' })
	}
}

exports.updateReportStatus = async (req, res) => {
	try {
		const reportId = req.params.id
		const { status } = req.body

		const result = await transactionModel.updateCustomerReportStatus(reportId, status)

		if (result === 0) {
			return res.status(404).json({ message: 'Laporan tidak ditemukan' })
		}

		res.json({ message: 'Status laporan berhasil diupdate' })
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: 'Internal Server Error' })
	}
}

exports.createTransaction = async (req, res) => {
  const transaction = req.body;

  try {
    const data = await transactionModel.createTransaction(transaction);
    res.status(201).json({ message: 'Transaction created'});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
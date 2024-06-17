const adminTransactionModel = require('../models/adminTransaction.model')


exports.getAllTransactions = async (req, res) => {
	try {
		const transactions = await adminTransactionModel.getAllTransactions()
		res.json(transactions)
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: 'Internal Server Error' })
	}
}

exports.updateTransactionStatus = async (req, res) => {
	try {
		const id_transaction = req.params.id
		const { status } = req.body

		const result = await adminTransactionModel.updateTransactionStatus(id_transaction, status)

		if (result === 0) {
			return res.status(404).json({ message: 'Transaksi tidak ditemukan' })
		}

		res.json({ message: 'Status transaksi berhasil diupdate' })
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: 'Internal Server Error' })
	}
}

exports.getTransactionDetails = async (req, res) => {
	try {
		const transactionId = req.params.id
		const transaction = await adminTransactionModel.getTransactionDetails(transactionId)

		if (!transaction) {
			return res.status(404).json({ message: 'Transaksi tidak ditemukan' })
		}

		res.json(transaction)
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: 'Internal Server Error' })
	}
}


exports.getAllTransactions = async (req, res) => {
	try {
		const transactions = await transactionModel.getAllTransactions()
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

		const result = await transactionModel.updateTransactionStatus(id_transaction, status)

		if (result === 0) {
			return res.status(404).json({ message: 'Transaksi tidak ditemukan' })
		}

		res.json({ message: 'Status transaksi berhasil diupdate' })
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: 'Internal Server Error' })
	}
}

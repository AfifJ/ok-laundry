const reportModel = require('../models/report.model.js')

exports.getAllReports = async (req, res) => {
	try {
		const reports = await reportModel.getAllReports()
		if (reports.length === 0) {
			return res.status(404).json({ message: 'No reports found' })
		}
		res.json(reports)
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' })
	}
}

const pool = require('../utils/database.js');

exports.getAllReports = async () => {
  try {
    // Fetch monthly reports grouped by month and year
    const [reports] = await pool.query(`
      SELECT 
        DATE_FORMAT(date, '%Y-%m-01') AS month_start,
        SUM(income) AS total_income
      FROM monthly_reports 
      GROUP BY month_start 
      ORDER BY month_start DESC
    `);

    // Fetch transactions for all months
    const monthStarts = reports.map(report => report.month_start);
    const [transactions] = await pool.query(`
      SELECT
        t.id,
        DATE_FORMAT(mr.date, '%Y-%m-01') AS month_start,
        t.date,
        t.total_price,
        t.status,
        u.id AS user_id,
        u.name AS user_name,
        u.phone AS user_phone,
        u.email AS user_email
      FROM transactions t
      JOIN monthly_reports mr ON t.id_monthly_report = mr.id
      LEFT JOIN users u ON t.id_user = u.id
      WHERE DATE_FORMAT(mr.date, '%Y-%m-01') IN (?)
      ORDER BY t.date DESC
    `, [monthStarts]);

    // Fetch clothes for all transactions
    const transactionIds = transactions.map(transaction => transaction.id);
    const [clothes] = await pool.query(
      'SELECT id_transaction, type, qty, price, total FROM clothes WHERE id_transaction IN (?) ORDER BY id',
      [transactionIds]
    );

    // Organize clothes by transaction
    const clothesByTransaction = clothes.reduce((acc, cloth) => {
      acc[cloth.id_transaction] = acc[cloth.id_transaction] || [];
      acc[cloth.id_transaction].push(cloth);
      return acc;
    }, {});

    // Organize transactions by month and add clothes
    const transactionsByMonth = transactions.reduce((acc, transaction) => {
      if (transaction && transaction.month_start) {
        const monthStart = transaction.month_start;
        acc[monthStart] = acc[monthStart] || [];
        transaction.clothes = clothesByTransaction[transaction.id] || [];
        delete transaction.month_start; // Remove this from the transaction object
        acc[monthStart].push(transaction); // Use monthStart here
    }
      return acc;
    }, {});

    // Add transactions to monthly reports
    const finalReports = reports.map(report => ({
      month: report.month_start,
      total_income: report.total_income,
      transactions: transactionsByMonth[report.month_start] || []
    }));

    return finalReports;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get all reports');
  }
};
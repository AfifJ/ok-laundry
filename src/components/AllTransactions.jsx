import React, { useState, useEffect } from 'react'

const TransactionList = () => {
	const [transactions, setTransactions] = useState([])
	const [filterStatus, setFilterStatus] = useState('all')

	useEffect(() => {
		// Ambil daftar transaksi dari API
    fetch('http://localhost:3000/api/transactions')
      .then((response) => response.json())
      .then((data) => {
        const sortedData = data.sort((a, b) => new Date(b.date_row) - new Date(a.date_row));
        setTransactions(sortedData);
      })
      .catch((error) => console.error('Error:', error));
	}, [])

	const handleFilterChange = (status) => {
		setFilterStatus(status)
	}

	const filteredTransactions =
		filterStatus === 'all'
			? transactions
			: filterStatus === 'Menunggu'
				? transactions.filter((transaction) => transaction.status === 'Menunggu')
				: transactions.filter((transaction) => transaction.status === 'Selesai')

  return (
    <div className="flex flex-col items-center justify-start gap-6">
      <div className="inline-flex items-center justify-center gap-3">
        <div
          onClick={() => handleFilterChange('all')}
          className={`px-3 py-2 ${filterStatus === 'all' ? 'bg-green-500 font-bold text-white' : 'text-base text-black opacity-70'} flex cursor-pointer items-start justify-start gap-2.5 rounded-2xl`}
        >
          <div className="text-base">Semua</div>
        </div>
        <div
          onClick={() => handleFilterChange('Menunggu')}
          className={`flex ${filterStatus === 'Menunggu' ? 'bg-green-500 font-bold text-white' : 'text-base text-black opacity-70'} cursor-pointer items-start justify-start gap-2.5 rounded-2xl px-3 py-2`}
        >
          <div className="text-base">Menunggu</div>
        </div>
        <div
          onClick={() => handleFilterChange('Selesai')}
          className={`flex ${filterStatus === 'Selesai' ? 'bg-green-500 font-bold text-white' : 'text-base text-black opacity-70'} cursor-pointer items-start justify-start gap-2.5 rounded-2xl px-3 py-2`}
        >
          <div className="text-base">Selesai</div>
        </div>
      </div>
      <div className="flex flex-col items-start justify-start gap-4">
        {filteredTransactions.map((transaction, index) => (
          <a
            href={`/admin/transaksi/${transaction.id}`}
            key={index}
            className={`border-black/opacity-40 inline-flex w-80 items-start justify-start rounded-xl border p-4 ${
              transaction.status.toLowerCase() !== 'selesai' ? 'bg-yellow-100' : 'bg-white'
            }`}
          >
            <div className="inline-flex shrink grow basis-0 flex-col items-start justify-start gap-3 self-stretch">
              <div className="self-stretch text-base font-semibold text-black">
                {transaction.title}
              </div>
              <div className="self-stretch text-xs font-normal text-black opacity-60">
                {transaction.date}
              </div>
            </div>
            <div className="inline-flex w-28 flex-col items-start justify-start gap-3">
              <div className="self-stretch text-right text-xs font-normal text-black">Status</div>
              <div
                className={`self-stretch text-right text-base font-bold ${
                  transaction.status.toLowerCase() !== 'selesai' ? 'text-yellow-500' : 'text-green-500'
                }`}
              >
                {transaction.status.toLowerCase()}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default TransactionList

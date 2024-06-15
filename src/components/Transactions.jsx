import React, { useState, useEffect } from 'react'
import Card from './Card'

const Transactions = () => {
	const [transactions, setTransactions] = useState([])
	const [activeFilter, setActiveFilter] = useState('semua')

	useEffect(() => {
		const fetchTransactions = async () => {
			const userId = localStorage.getItem('id')
			try {
				const response = await fetch(`http://localhost:3000/api/transactions/${userId}`)
				if (response.ok) {
					const data = await response.json()
					setTransactions(data)
				} else {
					console.error('Failed to load transactions:', response.status, response.statusText)
				}
			} catch (error) {
				console.error('Error fetching transactions:', error)
			}
		}

		fetchTransactions()
	}, [])

	const filterTransactions = (transaction) => {
		if (activeFilter === 'semua') return true
		if (activeFilter === 'berlangsung') return transaction.status.toLowerCase() !== 'selesai'
		if (activeFilter === 'selesai') return transaction.status.toLowerCase() === 'selesai'
	}

	const handleFilterChange = (filter) => {
		setActiveFilter(filter)
	}

	return (
		<div className="flex flex-col items-center justify-start gap-6">
			<div className="inline-flex items-center justify-center gap-3">
				{['semua', 'berlangsung', 'selesai'].map((filter) => (
					<button
						key={filter}
						className={`filter-btn flex items-start justify-start gap-2.5 rounded-2xl px-3 py-2 text-base ${activeFilter === filter ? 'bg-green-500 font-bold text-white' : 'font-normal text-black text-opacity-70'}`}
						onClick={() => handleFilterChange(filter)}
					>
						{filter.charAt(0).toUpperCase() + filter.slice(1)}
					</button>
				))}
			</div>
			<div className="flex flex-col items-start justify-start gap-4">
				{transactions.length > 0 ? (
					transactions
						.filter(filterTransactions)
						.map((transaction) => <Card key={transaction.id} userId={localStorage.getItem('id')} item={transaction} />)
				) : (
					<p>Tidak ada transaksi.</p>
				)}
			</div>
		</div>
	)
}

export default Transactions

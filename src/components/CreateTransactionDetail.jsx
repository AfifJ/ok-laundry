// src/components/DetailTransaction.jsx
import React, { useEffect, useState } from 'react'

const CreateTransactionDetail = () => {
	const [transactionData, setTransactionData] = useState(null)

	useEffect(() => {
		const storedData = localStorage.getItem('transactionData')
		if (storedData) {
			setTransactionData(JSON.parse(storedData))
			localStorage.removeItem('transactionData')
		} else {
			window.location.href = '/admin/transaksi/create'
		}
	}, [])
	// userId, clothes, status, totalPrice

	if (!transactionData) {
		return <div>Loading...</div>
	}
	// Asumsikan bahwa kita memiliki fungsi untuk menghitung total
	const calculateTotal = (clothes) => {
		if (!Array.isArray(clothes)) {
			throw new Error('Input should be an array')
		}

		return clothes.reduce((total, item) => {
			if (typeof item.price !== 'number' || typeof item.quantity !== 'number') {
				console.log(item)
				// throw new Error('Price and quantity should be numbers')
			}

			return total + item.price * item.quantity
		}, 0)
	}

	const total = calculateTotal(transactionData.clothes)

	const handleConfirm = async () => {
		// userId, clothes, status, totalPrice
		const transaction = {
			userId: transactionData.userId,
			clothes: transactionData.clothes,
			status: 'Diterima',
			totalPrice: total
		}

		console.log(transaction)
		const response = await fetch('http://localhost:3000/api/transactions/create', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(transaction)
		})

		if (!response.ok) {
			console.error('Failed to add transaction')
			return
		}

		const data = await response.json()
		if (typeof data.message === 'string') {
			alert(data.message)
		}

		window.location.href = '/admin/transaksi'
	}

	return (
		<div className="flex flex-col items-center justify-start gap-8 self-stretch px-8 py-4">
			<div className="flex flex-col items-start justify-start gap-3 self-stretch px-8">
				<div className="inline-flex items-start justify-between self-stretch">
					<div className="text-base font-normal text-black opacity-60">Pelanggan</div>
					<div className="text-base font-bold text-black">
						{transactionData.email || 'Bukan member'}
					</div>
				</div>
				<div className="inline-flex items-start justify-between self-stretch">
					<div className="text-base font-normal text-black opacity-60">Tanggal</div>
					<div className="text-base font-bold text-black">
						{new Date().toLocaleDateString('id-ID')}
					</div>
				</div>
				<div className="inline-flex items-start justify-between self-stretch">
					<div className="text-base font-normal text-black opacity-60">Status</div>
					<div className="text-base font-bold text-black">Diterima</div>
				</div>
			</div>
			<div className="flex flex-col items-center justify-start gap-3.5 self-stretch px-8">
				<div className="text-xl font-bold text-black">Detail Pakaian</div>
				<div className="flex flex-col items-center justify-start gap-5">
					<div className="flex flex-col items-center justify-start">
						<div className="border-black/opacity-30 inline-flex items-start justify-between self-stretch border-b p-3 opacity-50">
							<div className="shrink grow basis-0 text-base font-normal text-black">Nama</div>
							<div className="shrink grow basis-0 text-center text-base font-normal text-black">
								Jumlah
							</div>
							<div className="shrink grow basis-0 self-stretch text-right text-base font-normal text-black">
								Harga
							</div>
						</div>
						{transactionData.clothes.map((item, index) => (
							<div
								key={index}
								className="border-black/opacity-30 inline-flex items-start justify-between self-stretch border-b p-3"
							>
								<div className="shrink grow basis-0 text-base font-normal text-black">
									{item.type}
								</div>
								<div className="shrink grow basis-0 text-center text-base font-normal text-black">
									{item.quantity}
								</div>
								<div className="shrink grow basis-0 text-right text-base font-normal text-black">
									{item.price.toLocaleString('id-ID') || '5000'}
								</div>
							</div>
						))}
					</div>
					<div className="inline-flex items-center justify-start self-stretch py-3">
						<div className="text-base font-normal text-black opacity-50">Total Bayar:</div>
						<div className="shrink grow basis-0 text-right text-base font-bold text-black">
							Rp{total.toLocaleString('id-ID')}
						</div>
					</div>
				</div>
			</div>
			<button
				className="inline-flex items-center justify-center gap-2.5 self-stretch rounded-2xl bg-green-500 px-12 py-3"
				onClick={handleConfirm}
			>
				<div className="text-xl font-bold text-white">Konfirmasi</div>
			</button>
		</div>
	)
}

export default CreateTransactionDetail

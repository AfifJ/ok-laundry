import { useEffect, useState } from 'react'

const AdminDetailTransaksi = ({ id }) => {
	const [data, setData] = useState(null)
	const [modalOpen, setModalOpen] = useState(false)
	const [status, setStatus] = useState('')

	const handleOpenModal = () => {
		setModalOpen(true)
	}

	const handleStatusChange = (newStatus) => {
		setStatus(newStatus)
		setModalOpen(false)
		console.log(newStatus)
		// TODO: Panggil fungsi untuk memperbarui status di database
		fetch(`http://localhost:3000/api/transactions/status/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ status: newStatus })
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`)
				}
				return response.json()
			})
			.then((json) => {
				console.log(json)
			})
			.catch((err) => console.error('Error:', err))
	}

	useEffect(() => {
		fetch(`http://localhost:3000/api/admin/transactions/${id}`)
			.then((response) => {
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`)
				}
				return response.json()
			})
			.then((json) => {
				setData(json)
				setStatus(json.status)
			})
			.catch((err) => console.error('Error:', err))
	}, [])

	if (!data) return <div>Loading...</div>

	return (
		<>
			<div className="flex flex-col items-start justify-start gap-3 self-stretch px-8">
				<div className="inline-flex items-start justify-between self-stretch">
					<div className="text-base font-normal text-black opacity-60">Tanggal</div>
					<div className="text-base font-bold text-black">{data.date}</div>
				</div>
				{/* <div className="inline-flex items-start justify-between self-stretch">
					<div className="text-base font-normal text-black opacity-60">Estimasi</div>
					<div className="text-base font-bold text-black">3 Juni 2024</div>
				</div> */}
				<div className="inline-flex items-start justify-between self-stretch">
					<div className="text-base font-normal text-black opacity-60">Status</div>
					<div className="text-base font-bold text-black">{data.status}</div>
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
						{data.clothes.map((c, i) => (
							<div
								key={i}
								className="border-black/opacity-30 inline-flex items-start justify-between self-stretch border-b p-3"
							>
								<div className="shrink grow basis-0 text-base font-normal text-black">{c.type}</div>
								<div className="shrink grow basis-0 text-center text-base font-normal text-black">
									{c.qty}
								</div>
								<div className="shrink grow basis-0 text-right text-base font-normal text-black">
									{c.price}
								</div>
							</div>
						))}
					</div>
					<div className="inline-flex items-center justify-start self-stretch py-3">
						<div className="text-base font-normal text-black opacity-50">Total Bayar:</div>
						<div className="shrink grow basis-0 text-right text-base font-bold text-black">
							{data.total_price}
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-col items-start justify-start gap-5 self-stretch px-8">
				<div className="self-stretch text-center text-base font-normal text-black opacity-60">
					Pesanan yang tidak dilaporkan dalam 24 jam akan dianggap sesuai
				</div>
		{/* 		<a className="w-full" href={`/transaksi/lapor/${id}`}>
					<div className="inline-flex w-full items-center justify-center gap-2.5 self-stretch rounded-2xl border border-pink-800 px-12 py-3">
						<div className="text-xl font-bold text-pink-800">Laporkan Kesalahan</div>
					</div>
				</a>
				 */}
				<button
					onClick={handleOpenModal}
					className="inline-flex items-center justify-center gap-2.5 self-stretch rounded-2xl bg-green-500 px-12 py-3"
				>
					<div className="text-xl font-bold text-white">Update Status</div>
				</button>
				{modalOpen && (
					<div onClick={() => setModalOpen(false)} className="fixed inset-0 z-10 overflow-y-auto">
						<div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
							<div className="fixed inset-0 transition-opacity" aria-hidden="true">
								<div className="absolute inset-0 bg-gray-500 opacity-75"></div>
							</div>
							<span
								className="hidden sm:inline-block sm:h-screen sm:align-middle"
								aria-hidden="true"
							>
								&#8203;
							</span>
							<div
								onClick={(e) => e.stopPropagation()}
								className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle"
							>
								<div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
									<h2 className="text-lg font-medium leading-6 text-gray-900">
										Pilih Status, saat ini : {status}
									</h2>
									<div className="mt-2 space-y-2">
										<button
											onClick={() => handleStatusChange('Diterima')}
											className="w-full rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
										>
											Diterima
										</button>
										<button
											onClick={() => handleStatusChange('Dicuci')}
											className="w-full rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
										>
											Dicuci
										</button>
										<button
											onClick={() => handleStatusChange('Disetrika')}
											className="w-full rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
										>
											Disetrika
										</button>
										<button
											onClick={() => handleStatusChange('Siap diambil')}
											className="w-full rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
										>
											Siap diambil
										</button>
										<button
											onClick={() => handleStatusChange('Selesai')}
											className="w-full rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
										>
											Siap diambil
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	)
}

export default AdminDetailTransaksi

import { useEffect, useState } from 'react'

const DetailTransaksi = ({ id, userId }) => {
	const [data, setData] = useState(null)

	useEffect(() => {
		fetch(`http://localhost:3000/api/transactions/${userId}/${id}`)
			.then((response) => {
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`)
				}
				return response.json()
			})
			.then((json) => setData(json))
			.catch((err) => console.error('Error:', err))
	}, [])

	if (!data) return <div>Loading...</div>

	return (
		<>
			<div className="flex h-20 flex-col items-start justify-start gap-3 self-stretch px-8">
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
			<div className="flex h-44 flex-col items-start justify-start gap-5 self-stretch px-8">
				<div className="self-stretch text-center text-base font-normal text-black opacity-60">
					Pesanan yang tidak dilaporkan dalam 24 jam akan dianggap sesuai
				</div>
				<a className="w-full" href={`/transaksi/${userId}/${id}/lapor`}>
					<div className="inline-flex w-full items-center justify-center gap-2.5 self-stretch rounded-2xl border border-pink-800 px-12 py-3">
						<div className="text-xl font-bold text-pink-800">Laporkan Kesalahan</div>
					</div>
				</a>
				{/* 	<button
        onClick={handleDone}
         className="inline-flex items-center justify-center gap-2.5 self-stretch rounded-2xl bg-green-500 px-12 py-3">
					<div className="text-xl font-bold text-white">Tandai Selesai</div>
				</button> */}
			</div>
		</>
	)
}

export default DetailTransaksi

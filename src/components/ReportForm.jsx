import { useState } from 'react'

const ReportForm = ({ id, id_user }) => {
	const [category, setCategory] = useState('')
	const [description, setDescription] = useState('')
	const [phoneNumber, setPhoneNumber] = useState('')

	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			const response = await fetch(
				`http://localhost:3000/api/transactions/${id_user}/${id}/report`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						id_user,
						id_transaction: id,
						phone_number: phoneNumber,
						title: category,
						desc: description,
						report_date: new Date().toISOString().replace('T', ' ').substring(0, 19),
						status: 'Menunggu'
					})
				}
			)

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`)
			}

			console.log('berhasil dikirim')
			alert('Laporan berhasil dikirim')
			window.location.href = `/transaksi/${id_user}/${id}`
		} catch (err) {
			console.log('pesan error')
			console.error(err)
		}
	}

	return (
		<>
			<div className="flex flex-col items-start justify-start gap-11 self-stretch px-8">
				<div className="flex flex-col items-start justify-start gap-3 self-stretch">
					<div className="text-base font-bold text-black">Kategori</div>
					<label
						htmlFor="kategori"
						className="border-black/opacity-30 inline-flex items-center justify-start gap-2.5 self-stretch rounded-2xl border px-4 py-3"
					>
						<select
							id="kategori"
							required
							style={{ outline: 'none' }}
							onChange={(e) => setCategory(e.target.value)}
							className="shrink grow basis-0 bg-white text-base font-normal text-black"
						>
							<option defaultChecked value="">
								Pilih Kategori
							</option>
							<option value="Kesalahan Penerimaan Pakaian">Kesalahan Penerimaan Pakaian</option>
							<option value="Lama Waktu Penyelesaian">Lama Waktu Penyelesaian</option>
							<option value="Kerusakan Pakaian">Kerusakan Pakaian</option>
							<option value="Komplain Kehilangan Pakaian">Komplain Kehilangan Pakaian</option>
						</select>
					</label>
				</div>
				<div className="flex flex-col items-start justify-start gap-3 self-stretch">
					<div className="text-base font-bold text-black">Deskripsi</div>
					<label
						htmlFor="deskripsi"
						className="border-black/opacity-30 inline-flex items-start justify-start gap-2.5 self-stretch rounded-2xl border px-4 py-3"
					>
						<textarea
							id="deskripsi"
							name="deskripsi"
							required
							onChange={(e) => setDescription(e.target.value)}
							value={description}
							style={{ outline: 'none' }}
							className="shrink grow basis-0 bg-white text-base font-normal text-black"
							placeholder="Jelaskan secara detail"
						></textarea>
					</label>
				</div>
				<div className="flex flex-col items-start justify-start gap-3 self-stretch">
					<div className="text-base font-bold text-black">Nomor yang dapat dihubungi</div>
					<label
						htmlFor="nomor"
						className="border-black/opacity-30 inline-flex items-center justify-start gap-2.5 self-stretch rounded-2xl border px-4 py-3"
					>
						<input
							type="number"
							id="nomor"
							name="nomor"
							required
							onChange={(e) => setPhoneNumber(e.target.value)}
							value={phoneNumber}
							style={{ outline: 'none' }}
							className="shrink grow basis-0 bg-white text-base font-normal text-black"
							placeholder="Masukkan nomor yang dapat dihubungi"
						/>
					</label>
				</div>
				<div className="flex flex-col items-center justify-start gap-3 self-stretch">
					<div className="self-stretch text-center text-base font-normal text-black opacity-60">
						Pesanan anda akan kami cek dalam maksimal 24 jam
					</div>
					<button
						type="submit"
						onClick={handleSubmit}
						className="inline-flex items-center justify-center gap-2.5 self-stretch rounded-2xl bg-red-800 px-12 py-3"
					>
						<div className="text-xl font-bold text-white">Laporkan Kesalahan</div>
					</button>
				</div>
			</div>
		</>
	)
}

export default ReportForm

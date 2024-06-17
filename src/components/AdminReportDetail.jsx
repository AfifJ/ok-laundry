import { useState, useEffect } from 'react'

const AdminReportDetail = ({ id }) => {
	const [report, setReport] = useState(null)

	useEffect(() => {
		fetch(`http://localhost:3000/api/transactions/report/${id}`)
			.then((response) => response.json())
			.then((data) => setReport(data))
			.catch((error) => console.error('Error:', error))
	}, [])

	const handleComplete = () => {
		fetch(`http://localhost:3000/api/transactions/report/${id}/status`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ status: 'Selesai' })
		})
			.then((response) => response.json())
			.then((data) => {
				console.log('Success:', data)
				setReport((prevState) => ({ ...prevState, status: 'Selesai' }))
			})
			.catch((error) => {
				console.error('Error:', error)
			})

		window.location.href = '/admin/laporan'
	}

	if (!report) {
		return <div>Loading...</div>
	}

	return (
		<div className="inline-flex h-96 w-96 flex-col items-center justify-start gap-8 bg-white">
			<div className="border-black/opacity-40 inline-flex items-center justify-center self-stretch border-b px-4 py-6">
				<div className="flex h-8 w-8 items-center justify-center py-2" />
				<div className="shrink grow basis-0 text-center text-2xl font-bold text-black">
					Laporan Pelanggan
				</div>
				<div className="flex h-8 w-8 items-center justify-center py-2 opacity-0" />
			</div>
			<div className="flex h-20 flex-col items-start justify-start gap-3 self-stretch px-8">
				<div className="inline-flex items-start justify-between self-stretch">
					<div className="text-base font-normal text-black opacity-60">Member</div>
					<div className="text-base font-bold text-black">{report.user_name}</div>
				</div>
				<div className="inline-flex items-start justify-between self-stretch">
					<div className="text-base font-normal text-black opacity-60">Kategori</div>
					<div className="text-base font-bold text-black">{report.title}</div>
				</div>
				<div className="inline-flex items-start justify-between self-stretch">
					<div className="text-base font-normal text-black opacity-60">Kontak</div>
					<div className="text-xl font-bold text-black">{report.phone_number}</div>
				</div>
			</div>
			<div className="flex h-20 flex-col items-center justify-start gap-3 self-stretch">
				<div className="flex h-6 flex-col items-center justify-start gap-3.5 self-stretch px-8">
					<div className="text-xl font-bold text-black">Deskripsi</div>
				</div>
				<div className="flex h-9 flex-col items-center justify-start gap-3.5 self-stretch px-8 opacity-90">
					<div className="self-stretch text-base font-normal text-black opacity-60">
						{report.desc}
					</div>
				</div>
			</div>
			<div className="flex h-12 flex-col items-start justify-start gap-5 self-stretch px-8">
				{report.status !== 'Selesai' ? (
					<button
						className="inline-flex items-center justify-center gap-2.5 self-stretch rounded-2xl bg-green-500 px-12 py-3"
						onClick={handleComplete}
					>
						<div className="text-xl font-bold text-white">Tandai Selesai</div>
					</button>
				) : (
					<button
						className="inline-flex items-center justify-center gap-2.5 self-stretch rounded-2xl bg-gray-300 px-12 py-3"
						disabled
					>
						<div className="text-xl font-bold text-black">Telah selesai</div>
					</button>
				)}
			</div>
		</div>
	)
}

export default AdminReportDetail

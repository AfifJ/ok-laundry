import { useState, useEffect } from 'react'

const AdminReport = () => {
	const [filteredLaporan, setFilteredLaporan] = useState([])
	const [activeStatus, setActiveStatus] = useState('Semua')
	const [listLaporan, setListLaporan] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('http://localhost:3000/api/transactions/report')
				const data = await response.json()
				setListLaporan(data)
			} catch (error) {
				console.log(error)
			}
		}

		fetchData()
	}, [])

	useEffect(() => {
		if (listLaporan.length === 0) return
		filterLaporan(activeStatus)
	}, [listLaporan])

	const filterLaporan = (status) => {
		// Filter the listLaporan based on the selected status
		setActiveStatus(status)
		if (status === 'Semua') {
			return setFilteredLaporan(listLaporan)
		} else if (status === 'Selesai') {
			return setFilteredLaporan(listLaporan.filter((laporan) => laporan.status === 'Selesai'))
		} else {
			return setFilteredLaporan(listLaporan.filter((laporan) => laporan.status !== 'Selesai'))
		}
	}

	return (
		<div className="inline-flex h-96 w-96 flex-col items-center justify-start gap-7 bg-white">
			<div className="border-black/opacity-40 inline-flex items-center justify-center self-stretch border-b px-4 py-6">
				<div className="flex h-8 w-8 items-center justify-center py-2">
					<a href="/admin">
						<div className="flex w-8 items-center justify-center py-2">
							<svg
								width="32"
								height="32"
								viewBox="0 0 32 32"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M20 8L12 16L20 24" stroke="#33363F" strokeWidth="2.66667"></path>
							</svg>
						</div>
					</a>
				</div>
				<div className="shrink grow basis-0 text-center text-2xl font-bold text-black">Laporan</div>
				<div className="flex h-8 w-8 items-center justify-center py-2 opacity-0" />
			</div>
			{/*  */}
			<div className="flex flex-col items-center justify-start gap-6">
				<div className="inline-flex items-center justify-center gap-3">
					<button
						className={`flex items-start justify-start gap-2.5 rounded-2xl px-3 py-2 text-base ${activeStatus === 'Semua' ? 'bg-green-500 font-bold text-white' : 'text-black opacity-70'}`}
						onClick={() => filterLaporan('Semua')}
					>
						Semua
					</button>
					<button
						className={`flex items-start justify-start gap-2.5 rounded-2xl px-3 py-2 text-base ${activeStatus === 'Diterima' ? 'bg-green-500 font-bold text-white' : 'text-black opacity-70'}`}
						onClick={() => filterLaporan('Diterima')}
					>
						Diterima
					</button>
					<button
						className={`flex items-start justify-start gap-2.5 rounded-2xl px-3 py-2 text-base ${activeStatus === 'Selesai' ? 'bg-green-500 font-bold text-white' : 'text-black opacity-70'}`}
						onClick={() => filterLaporan('Selesai')}
					>
						Selesai
					</button>
				</div>
				{/*  */}
				<div className="flex flex-col items-start justify-start gap-4">
					{filteredLaporan.map((laporan) => (
						<a
							href={`/admin/laporan/${laporan.id}`}
							key={laporan.id}
							className={`border-black/opacity-40 inline-flex w-80 items-start justify-start rounded-xl border p-4 ${laporan.status.toLowerCase() !== 'selesai' ? 'bg-orange-100' : ''}`}
						>
							<div className="inline-flex shrink grow basis-0 flex-col items-start justify-start gap-3 self-stretch">
								<div className="self-stretch text-base font-semibold text-black">
									{laporan.title}
								</div>
								<div className="self-stretch text-xs font-normal text-black opacity-60">
									{laporan.date}
								</div>
							</div>
							<div className="inline-flex w-28 flex-col items-start justify-start gap-3">
								<div className="self-stretch text-right text-xs font-normal text-black">Status</div>
								<div
									className={`self-stretch text-right text-base font-bold ${laporan.status.toLowerCase() !== 'selesai' ? 'text-yellow-500' : 'text-green-500'}`}
								>
									{laporan.status}
								</div>
							</div>
						</a>
					))}
					{/*  */}
					{/*  */}
					{/* <div className="border-black/opacity-40 inline-flex w-80 items-start justify-start rounded-xl border bg-orange-100 p-4">
						<div className="inline-flex shrink grow basis-0 flex-col items-start justify-start gap-3 self-stretch">
							<div className="self-stretch text-base font-semibold text-black">Salah baju</div>
							<div className="self-stretch text-xs font-normal text-black opacity-60">
								06 Juni 2024
							</div>
						</div>
						<div className="inline-flex w-28 flex-col items-start justify-start gap-3">
							<div className="self-stretch text-right text-xs font-normal text-black">Status</div>
							<div className="self-stretch text-right text-base font-bold text-yellow-500">
								Belum teratasi
							</div>
						</div>
					</div>
					<div className="border-black/opacity-40 inline-flex w-80 items-start justify-start rounded-xl border p-4">
						<div className="inline-flex shrink grow basis-0 flex-col items-start justify-start gap-3 self-stretch">
							<div className="self-stretch text-base font-semibold text-black">Hilang 1</div>
							<div className="self-stretch text-xs font-normal text-black opacity-60">
								06 Juni 2024
							</div>
						</div>
						<div className="inline-flex w-28 flex-col items-start justify-start gap-3">
							<div className="self-stretch text-right text-xs font-normal text-black">Status</div>
							<div className="self-stretch text-right text-base font-bold text-green-500">
								Selesai
							</div>
						</div>
					</div>
					<div className="border-black/opacity-40 inline-flex w-80 items-start justify-start rounded-xl border p-4">
						<div className="inline-flex shrink grow basis-0 flex-col items-start justify-start gap-3 self-stretch">
							<div className="self-stretch text-base font-semibold text-black">Salah bayar</div>
							<div className="self-stretch text-xs font-normal text-black opacity-60">
								06 Juni 2024
							</div>
						</div>
						<div className="inline-flex w-28 flex-col items-start justify-start gap-3">
							<div className="self-stretch text-right text-xs font-normal text-black">Status</div>
							<div className="self-stretch text-right text-base font-bold text-green-500">
								Selesai
							</div>
						</div>
					</div> */}
				</div>
			</div>
		</div>
	)
}

export default AdminReport

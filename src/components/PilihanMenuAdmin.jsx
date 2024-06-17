import { useEffect, useState } from 'react'

const PilihanMenuAdmin = () => {
	const [isManager, setIsManager] = useState(false)
	useEffect(() => {
		const manager = localStorage.getItem('isManager')
		if (manager) {
			setIsManager(true)
		}
	}, [])

	return (
		<>
			<a
				href="/admin/transaksi"
				className="inline-flex items-center justify-center gap-2.5 self-stretch rounded-xl bg-green-500 px-32 py-11"
			>
				<div className="text-xl font-bold text-white">Transaksi</div>
			</a>
			<a
				href="/admin/laporan"
				className="inline-flex items-center justify-center gap-2.5 self-stretch rounded-xl bg-green-500 px-32 py-11"
			>
				<div className="text-xl font-bold text-white">Laporan Pelanggan</div>
			</a>
			{isManager && (
				<>
					<a
						href="/admin/manager/kelola"
						className="inline-flex items-center justify-center gap-2.5 self-stretch rounded-xl bg-green-500 px-32 py-11"
					>
						<div className="text-xl font-bold text-white">Kelola Karyawan</div>
					</a>
					<a
						href="/admin/manager/laporan"
						className="inline-flex items-center justify-center gap-2.5 self-stretch rounded-xl bg-green-500 px-32 py-11"
					>
						<div className="text-xl font-bold text-white">Laporan penghasilan</div>
					</a>
				</>
			)}
		</>
	)
}

export default PilihanMenuAdmin

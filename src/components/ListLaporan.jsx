import React, { useState, useEffect } from 'react'

const ListLaporan = () => {
	const [reports, setReports] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		fetch('http://localhost:3000/api/report')
			.then((response) => {
				if (!response.ok) throw new Error('Network response was not ok')
				return response.json()
			})
			.then((data) => {
				setReports(data)
				setIsLoading(false)
			})
			.catch((error) => {
				setError(error.message)
				setIsLoading(false)
			})
	}, [])

	if (isLoading) return <div className="flex h-screen items-center justify-center">Loading...</div>
	if (error)
		return (
			<div className="flex h-screen items-center justify-center text-red-500">Error: {error}</div>
		)

	return (
		<div className="container mx-auto p-6">
			{reports.map((report, index) => (
				<div key={index} className="mb-10 overflow-hidden bg-white shadow sm:rounded-lg">
					<div className="px-4 py-5 sm:px-6">
						<h2 className="text-2xl font-medium leading-6 text-gray-900">
							{new Date(report.month).toLocaleDateString('default', {
								month: 'long',
								year: 'numeric'
							})}
						</h2>
						<p className="mt-1 max-w-2xl text-sm text-gray-500">
							Total Income: Rp {report.total_income.toLocaleString()}
						</p>
					</div>

					<div className="border-t border-gray-200">
						<table className="min-w-full divide-y divide-gray-200">
							<thead className="bg-gray-50">
								<tr>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
									>
										Date
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
									>
										Total Price
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
									>
										Status
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
									>
										User
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
									>
										Clothes
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200 bg-white">
								{report.transactions.map((transaction) => (
									<tr key={transaction.id}>
										<td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
											{new Date(transaction.date).toLocaleDateString()}
										</td>
										<td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
											Rp {transaction.total_price.toLocaleString()}
										</td>
										<td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
											{transaction.status}
										</td>
										<td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
											{transaction.user_id ? (
												<>
													<div>{transaction.user_name}</div>
													<div className="text-xs text-gray-400">{transaction.user_phone}</div>
													<div className="text-xs text-gray-400">{transaction.user_email}</div>
												</>
											) : (
												'No user'
											)}
										</td>
										<td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
											{transaction.clothes.length > 0 ? (
												<ul className="list-disc pl-5">
													{transaction.clothes.map((cloth, idx) => (
														<li key={idx}>
															{cloth.type} (x{cloth.qty}) - Rp {cloth.total.toLocaleString()}
														</li>
													))}
												</ul>
											) : (
												'No clothes'
											)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			))}
		</div>
	)
}

export default ListLaporan

import React, { useState } from 'react'

const CreateTransaction = () => {
	const [email, setEmail] = useState('')
	const [userId, setUserId] = useState(0)

	const [clothes, setClothes] = useState([{ type: '', quantity: 1, price: 0 }])

	const clothTypes = [
		{ type: 'Baju', price: 50000 },
		{ type: 'Celana', price: 70000 },
		{ type: 'Jaket', price: 100000 },
		{ type: 'Topi', price: 20000 },
		{ type: 'Sepatu', price: 150000 },
		{ type: 'Sarung', price: 60000 },
		{ type: 'Kaos', price: 45000 },
		{ type: 'Jeans', price: 80000 },
		{ type: 'Rok', price: 55000 },
		{ type: 'Selimut', price: 90000 }
	]

	const addClothes = () => {
		setClothes([...clothes, { type: '', quantity: 1 }])
	}

	const removeClothes = (index) => {
		if (clothes.length > 1) {
			const newClothes = clothes.filter((_, i) => i !== index)
			setClothes(newClothes)
		}
	}

	const updateClothes = (index, field, value) => {
		const newClothes = [...clothes]
		newClothes[index][field] = value
		setClothes(newClothes)
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		fetch(`http://localhost:3000/api/auth/user/${email}`)
			.then((response) => response.json())
			.then((data) => {
				setUserId(data.userId)
			})
			.catch((error) => {
				// Handle any errors that occur during the fetch request
			})

		const transactionData = {
			userId,
			clothes: clothes.filter((cloth) => cloth.type !== '' && cloth.quantity !== 0)
		}

		// Simpan data ke sessionStorage
		localStorage.setItem('transactionData', JSON.stringify(transactionData))
		window.location.href = '/admin/transaksi/detail'
	}

	return (
		<form onSubmit={handleSubmit} className="w-full">
			<div className="flex flex-col items-center justify-start gap-8 self-stretch px-8 py-4">
				<div className="flex flex-col items-start justify-start gap-7 self-stretch">
					<div className="flex flex-col items-start justify-start gap-2 self-stretch">
						<div className="self-stretch text-base font-bold text-black">Email user</div>
						<div className="flex items-center justify-start gap-2.5 self-stretch rounded-2xl border border-black/20 px-4 py-3">
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full bg-transparent outline-none"
								placeholder="Masukkan email"
							/>
						</div>
					</div>

					{clothes.map((cloth, index) => (
						<div key={index} className="flex items-center justify-center gap-7 self-stretch">
							<div className="flex grow flex-col items-start justify-start gap-2">
								<div className="self-stretch text-base font-bold text-black">Jenis</div>
								<div className="flex items-center justify-start gap-2.5 self-stretch rounded-2xl border border-black/20 px-4 py-3">
									<select
										value={cloth.type}
										required
										onChange={(e) => {
											const selectedType = e.target.value
											const selectedPrice =
												clothTypes.find((type) => type.type === selectedType)?.price || 0
											updateClothes(index, 'type', selectedType)
											updateClothes(index, 'price', selectedPrice)
										}}
										className="w-full bg-transparent outline-none"
									>
										<option defaultChecked value="">
											Pilih
										</option>
										{clothTypes.map((cloth) => (
											<option key={cloth.type} value={cloth.type}>
												{cloth.type}
											</option>
										))}
									</select>
								</div>
							</div>
							<div className="flex grow flex-col items-start justify-start gap-2">
								<div className="self-stretch text-base font-bold text-black">Jumlah</div>
								<div className="flex items-center justify-start gap-2.5 self-stretch rounded-2xl border border-black/20 px-4 py-3">
									<input
										type="number"
										value={cloth.quantity}
										onChange={(e) =>
											updateClothes(index, 'quantity', parseInt(e.target.value) || 0)
										}
										className="w-full bg-transparent outline-none"
										min="1"
									/>
								</div>
							</div>
							{clothes.length > 1 && (
								<div
									className="flex w-6 cursor-pointer items-center justify-center"
									onClick={() => removeClothes(index)}
								>
									<svg
										width="42"
										height="42"
										viewBox="0 0 42 42"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<circle cx="21" cy="21" r="15.75" stroke="#33363F" strokeWidth="3.5" />
										<path
											d="M26.25 21L15.75 21"
											stroke="#33363F"
											strokeWidth="3.5"
											strokeLinecap="square"
										/>
									</svg>
								</div>
							)}
						</div>
					))}
				</div>

				<div
					className="flex cursor-pointer items-center justify-center gap-2.5 self-stretch rounded-2xl border border-black/20 px-12 py-3 hover:bg-gray-100"
					onClick={addClothes}
				>
					<div className="text-xl font-bold text-neutral-600">Tambah Baju</div>
				</div>

				<button
					type="submit"
					className="flex w-full cursor-pointer items-center justify-center gap-2.5 self-stretch rounded-2xl bg-green-500 px-12 py-3 hover:bg-green-600"
				>
					<div className="text-xl font-bold text-white">Periksa harga</div>
				</button>
			</div>
		</form>
	)
}

export default CreateTransaction

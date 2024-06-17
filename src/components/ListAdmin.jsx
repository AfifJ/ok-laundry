import React, { useState, useEffect } from 'react'

const ListAdmin = () => {
	const [admins, setAdmins] = useState([])
	const [newAdmin, setNewAdmin] = useState({ name: '', email: '', phone: '', password: '' })

	useEffect(() => {
		fetchAdmins()
	}, [])

	const fetchAdmins = async () => {
		try {
			const response = await fetch('http://localhost:3000/api/auth/admins')
			if (!response.ok) {
				throw new Error('Failed to fetch')
			}
			const data = await response.json()
			setAdmins(data)
		} catch (error) {
			console.error('Error fetching admins:', error)
		}
	}

	const handleInputChange = (e) => {
		setNewAdmin({ ...newAdmin, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const response = await fetch('http://localhost:3000/api/auth/admin/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(newAdmin)
			})

			if (!response.ok) {
				throw new Error('Failed to add admin')
			}

			alert('Admin added successfully!')
			setNewAdmin({ name: '', email: '', phone: '', password: '' })
			fetchAdmins() // Refresh the list
		} catch (error) {
			console.error('Error adding admin:', error)
			alert('Failed to add admin. Please try again.')
		}
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<form onSubmit={handleSubmit} className="mb-4 rounded bg-white px-8 pb-8 pt-6">
				<div className="mb-4">
					<input
						className="w-full appearance-none rounded-xl border px-3 py-2 leading-tight text-gray-700 focus:outline-none"
						type="text"
						name="name"
						placeholder="Name"
						value={newAdmin.name}
						onChange={handleInputChange}
						required
					/>
				</div>
				<div className="mb-4">
					<input
						className="w-full appearance-none rounded-xl border px-3 py-2 leading-tight text-gray-700 focus:outline-none"
						type="email"
						name="email"
						placeholder="Email"
						value={newAdmin.email}
						onChange={handleInputChange}
						required
					/>
				</div>
				<div className="mb-4">
					<input
						className="w-full appearance-none rounded-xl border px-3 py-2 leading-tight text-gray-700 focus:outline-none"
						type="tel"
						name="phone"
						placeholder="Phone"
						value={newAdmin.phone}
						onChange={handleInputChange}
						required
					/>
				</div>
				<div className="mb-6">
					<input
						className="mb-3 w-full appearance-none rounded-xl border px-3 py-2 leading-tight text-gray-700 focus:outline-none"
						type="password"
						name="password"
						placeholder="Password"
						value={newAdmin.password}
						onChange={handleInputChange}
						required
					/>
				</div>
				<div className="flex items-center justify-between">
					<button
						className="rounded-xl bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
						type="submit"
					>
						Add Admin
					</button>
				</div>
			</form>

			{/* Admin List */}
			<div className="my-6 overflow-scroll rounded bg-white">
				<table className="w-full border-collapse text-left">
					<thead>
						<tr>
							<th className="bg-grey-lightest text-grey-dark border-grey-light border-b px-6 py-4 text-sm font-bold uppercase">
								Name
							</th>
							<th className="bg-grey-lightest text-grey-dark border-grey-light border-b px-6 py-4 text-sm font-bold uppercase">
								Email
							</th>
							<th className="bg-grey-lightest text-grey-dark border-grey-light border-b px-6 py-4 text-sm font-bold uppercase">
								Phone
							</th>
						</tr>
					</thead>
					<tbody>
						{admins.map((admin) => (
							<tr key={admin.id} className="hover:bg-grey-lighter">
								<td className="border-grey-light border-b px-6 py-4">{admin.name}</td>
								<td className="border-grey-light border-b px-6 py-4">{admin.email}</td>
								<td className="border-grey-light border-b px-6 py-4">{admin.phone}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default ListAdmin

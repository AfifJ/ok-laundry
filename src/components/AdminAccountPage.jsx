import React, { useState, useEffect } from 'react'

const AccountPage = () => {
	const [isEditing, setIsEditing] = useState(false)

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')

	useEffect(() => {
		const storedName = localStorage.getItem('name')
		const storedEmail = localStorage.getItem('email')
		if (storedName) setName(storedName)
		if (storedEmail) setEmail(storedEmail)
	}, [])

	const handleLogout = () => {
		localStorage.removeItem('authToken')
		localStorage.removeItem('name')
		localStorage.removeItem('email')
		localStorage.removeItem('isAdmin')
		localStorage.removeItem('isManager')
		localStorage.removeItem('id')
		return (window.location.href = '/admin/')
	}

	const handleEditClick = () => {
		setIsEditing(true)
	}

	const handleUpdateClick = async (event) => {
		event.preventDefault()
		setIsEditing(false)

		const id = localStorage.getItem('id')
		const isManager = localStorage.getItem('isManager')

		const url =
			isManager === true
				? `http://localhost:3000/api/auth/manager/update/${id}`
				: `http://localhost:3000/api/auth/admin/update/${id}`

		const response = await fetch(url, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name, email })
		})

		if (response.ok) {
			alert('Profile updated successfully.')
			localStorage.setItem('name', name)
			localStorage.setItem('email', email)
		} else {
			alert('Failed to update profile.')
		}
	}

	const cancelUpdate = () => {
		const storedName = localStorage.getItem('name')
		const storedEmail = localStorage.getItem('email')
		if (storedName) setName(storedName)
		if (storedEmail) setEmail(storedEmail)
		setIsEditing(false)
	}

	return (
		<div className="inline-flex w-96 flex-col items-center justify-start gap-8 bg-white">
			<div className="border-black/opacity-40 inline-flex items-center justify-center self-stretch border-b px-4 py-6">
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
				<div className="shrink grow basis-0 text-center text-2xl font-bold text-black">Akun</div>
				<div className="flex w-8 items-center justify-center py-2 opacity-0"></div>
			</div>

			<div className="flex flex-col items-center justify-center gap-12 self-stretch px-8">
				<div className="flex flex-col items-start justify-start gap-6 self-stretch">
					<div className="flex flex-col items-start justify-start gap-2 self-stretch">
						<div className="self-stretch text-base font-bold text-black">Username</div>
						{isEditing ? (
							<input
								type="text"
								value={name}
								autoFocus
								onChange={(e) => setName(e.target.value)}
								className="border-black/opacity-20 inline-flex items-center justify-start gap-2.5 self-stretch rounded-2xl border px-4 py-3"
							/>
						) : (
							<div className="border-black/opacity-20 inline-flex items-center justify-start gap-2.5 self-stretch rounded-2xl border px-4 py-3">
								<div className="text-base font-normal text-black">
									{name || <span className="opacity-0">username</span>}
								</div>
							</div>
						)}
					</div>

					<div className="flex flex-col items-start justify-start gap-2 self-stretch">
						<div className="self-stretch text-base font-bold text-black">Email</div>
						{isEditing ? (
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="border-black/opacity-20 inline-flex items-center justify-start gap-2.5 self-stretch rounded-2xl border px-4 py-3"
							/>
						) : (
							<div className="border-black/opacity-20 inline-flex items-center justify-start gap-2.5 self-stretch rounded-2xl border px-4 py-3">
								<div className="text-base font-normal text-black">
									{email || <span className="opacity-0">email</span>}
								</div>
							</div>
						)}
					</div>
				</div>

				<div className="flex flex-col items-start justify-start gap-3 self-stretch">
					{isEditing ? (
						<>
							<button
								onClick={cancelUpdate}
								className="border-black/opacity-20 inline-flex items-center justify-center gap-2.5 self-stretch rounded-2xl border px-12 py-3"
							>
								<div className="text-xl">Batal</div>
							</button>
							<button
								onClick={handleUpdateClick}
								className="inline-flex items-center justify-center gap-2.5 self-stretch rounded-2xl bg-green-500 px-12 py-3"
							>
								<div className="text-xl font-bold text-white">Update Profil</div>
							</button>
						</>
					) : (
						<>
							<button
								onClick={handleEditClick}
								className="border-black/opacity-20 inline-flex items-center justify-center gap-2.5 self-stretch rounded-2xl border px-12 py-3"
							>
								<div className="text-base font-normal text-black">Edit Akun</div>
							</button>
							{/* <a className="w-full" href="/account/update-pass">
								<div className="border-black/opacity-20 inline-flex w-full items-center justify-center gap-2.5 self-stretch rounded-2xl border px-12 py-3">
									<div className="text-base font-normal text-black">Ganti Password</div>
								</div>
							</a> */}
							<button
								onClick={handleLogout}
								className="inline-flex items-center justify-center gap-2.5 self-stretch rounded-2xl bg-red-800 px-12 py-3"
							>
								<div className="text-base font-bold text-white">Logout</div>
							</button>
						</>
					)}
				</div>
			</div>
		</div>
	)
}
export default AccountPage

import React, { useState } from 'react'

const LoginForm = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [errorMessage, setErrorMessage] = useState('asdf')

	const fetchUser = async (email) => {
		try {
			const response = await fetch('http://localhost:3000/api/auth/get-detail', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
					// 'Authorization': `Bearer ${authToken}`
				},
				body: JSON.stringify({ email })
			})

			if (response.ok) {
				const user = await response.json()
				return user
			} else {
				console.error('Failed to fetch user name')
				return null
			}
		} catch (error) {
			console.error('Error fetching user name:', error)
			return null
		}
	}

	const handleLogin = async (e) => {
		e.preventDefault()

		try {
			const response = await fetch('http://localhost:3000/api/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email, password })
			})

			if (response.ok) {
				const { token } = await response.json() // Asumsikan server mengirimkan token
				localStorage.setItem('authToken', token) // Simpan token di localStorage
				localStorage.setItem('email', email)

				const { user } = await fetchUser(email)
				if (user) {
					localStorage.setItem('name', user.name)
					localStorage.setItem('id', user.id)
					console.log(user)
				}

				console.log('Login berhasil')
				alert('Login berhasil! Anda akan dialihkan ke halaman utama dalam beberapa detik')
				return (window.location.href = '/')
			} else {
				const { message } = await response.json()
				setErrorMessage(message)
			}
		} catch (err) {
			console.error(err)
			setErrorMessage('Terjadi kesalahan saat login')
		}
	}

	return (
		<form onSubmit={handleLogin}>
			<div className="inline-flex h-96 w-96 flex-col items-center justify-start gap-12 bg-white px-11 py-28">
				<div className="self-stretch text-center text-4xl font-bold text-black">Login</div>
				<div className="self-stretch text-center text-base font-normal text-black opacity-70">
					Selamat datang di Oke Laundry
				</div>
				<div className="flex h-40 flex-col items-start justify-start gap-6 self-stretch">
					<label
						htmlFor="email"
						className="flex h-16 flex-col items-start justify-start gap-2 self-stretch"
					>
						<div className="self-stretch text-base font-bold text-black">Email</div>
						<div className="inline-flex items-center justify-start gap-2.5 self-stretch rounded-2xl border px-4 py-3">
							<div className="text-base font-normal text-black">
								<input
									autoFocus
									type="email"
									id="email"
									className="outline-none"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
									placeholder="yourname@gmail.com"
								/>
							</div>
						</div>
					</label>
					<label
						htmlFor="password"
						className="flex h-16 flex-col items-start justify-start gap-2 self-stretch"
					>
						<div className="self-stretch text-base font-bold text-black">Password</div>
						<div className="inline-flex items-center justify-start gap-2.5 self-stretch rounded-2xl border px-4 py-3">
							<input
								className="outline-none"
								type="password"
								id="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>
					</label>
				</div>
				<button
					type="submit"
					className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-green-500 px-12 py-3"
				>
					<div className="text-xl font-bold text-white">Login</div>
				</button>
				{errorMessage && <p>{errorMessage}</p>}
				<div className="self-stretch text-center text-base font-normal text-black opacity-60">
					Belum punya akun?
				</div>
				<div className="self-stretch text-center text-base font-bold text-black underline">
					Register
				</div>
			</div>
		</form>
	)
}

export default LoginForm

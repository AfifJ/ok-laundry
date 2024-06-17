import React, { useState } from 'react'

const LoginAdminForm = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [errorMessage, setErrorMessage] = useState('')

	const handleLogin = async (e) => {
		e.preventDefault()

		try {
			const response = await fetch('http://localhost:3000/api/auth/manager/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email, password })
			})

			if (response.ok) {
				const data = await response.json()

				console.log('Login berhasil')
				alert('Login berhasil! Anda akan dialihkan ke halaman dashboard')

        
				if (data) {
					localStorage.setItem('isAdmin', 'true')
					localStorage.setItem('isManager', true)
					localStorage.setItem('name', data.name)
					localStorage.setItem('id', data.id)
					localStorage.setItem('authToken', data.token)
					localStorage.setItem('email', email)
					window.location.href = '/admin'
				} else {
					console.log('token failed')
				}
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
		<div>
			<h2>Login</h2>
			<form onSubmit={handleLogin}>
				<div className="flex flex-col items-start justify-start gap-6">
					<label
						htmlFor="email"
						className="flex flex-col items-start justify-start gap-2 self-stretch"
					>
						<div className="self-stretch text-base font-bold text-black">Email</div>
						<div className="inline-flex items-center justify-start gap-2.5 self-stretch rounded-2xl border px-4 py-3">
							<div className="text-base font-normal text-black">
								<input
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
						className="flex flex-col items-start justify-start gap-2 self-stretch"
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
			</form>
		</div>
	)
}

export default LoginAdminForm

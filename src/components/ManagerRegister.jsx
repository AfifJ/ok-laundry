// src/components/RegisterForm.jsx
import React, { useState } from 'react'

const ManagerRegister = () => {
	const [companyPassword, setCompanyPassword] = useState('')
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [error, setError] = useState('')

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (password !== confirmPassword) {
			setError('Password dan konfirmasi password tidak sama')
			return
		}
		if (companyPassword !== 'company') {
			setError('Password perusahaan salah')
			return
		}

		try {
			const response = await fetch('http://localhost:3000/api/auth/manager/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ name, email, password })
			})

			if (response.ok) {
				// Lakukan tindakan selanjutnya, seperti mengalihkan ke halaman login
				console.log('Registrasi berhasil')
				alert('Registrasi berhasil! Anda akan dialihkan ke halaman login dalam beberapa detik')
				setTimeout(() => {
					window.location.href = '/admin/manager' // Mengalihkan ke halaman utama
				}, 1)
			} else {
				const { message } = await response.json()
				setError(message)
			}
		} catch (err) {
			console.error(err)
			setError('Terjadi kesalahan saat registrasi')
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<label
				htmlFor="companyPassword"
				className="flex flex-col items-start justify-start gap-2 self-stretch"
			>
				<div className="self-stretch text-base font-bold text-black">Password Perusahaan</div>
				<div className="inline-flex items-center justify-start gap-2.5 self-stretch rounded-2xl border border-black border-opacity-50 px-4 py-3">
					<div>
						<input
							className="outline-none"
							value={companyPassword}
							onChange={(e) => setCompanyPassword(e.target.value)}
							required
							type="password"
							name="companyPassword"
							id="companyPassword"
						/>
					</div>
				</div>
			</label>
      <label htmlFor="name" className="flex flex-col items-start justify-start gap-2 self-stretch">
        <div className="self-stretch text-base font-bold text-black">Name</div>
        <div className="inline-flex items-center justify-start gap-2.5 self-stretch rounded-2xl border border-black border-opacity-50 px-4 py-3">
          <div className="text-base font-normal text-black">
            <input
              className="outline-none"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              name="name"
              id="name"
              placeholder="Your Name"
            />
          </div>
        </div>
      </label>
			<label htmlFor="email" className="flex flex-col items-start justify-start gap-2 self-stretch">
				<div className="self-stretch text-base font-bold text-black">Email</div>
				<div className="inline-flex items-center justify-start gap-2.5 self-stretch rounded-2xl border border-black border-opacity-50 px-4 py-3">
					<div className="text-base font-normal text-black">
						<input
							className="outline-none"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							name="email"
							id="email"
							placeholder="yourname@email.com"
						/>
					</div>
				</div>
			</label>
			<label
				htmlFor="password"
				className="flex flex-col items-start justify-start gap-2 self-stretch"
			>
				<div className="self-stretch text-base font-bold text-black">Password</div>
				<div className="inline-flex items-center justify-start gap-2.5 self-stretch rounded-2xl border border-black border-opacity-50 px-4 py-3">
					<div>
						<input
							className="outline-none"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							type="password"
							name="password"
							id="password"
						/>
					</div>
				</div>
			</label>
			<label
				htmlFor="konfirmasi-password"
				className="flex flex-col items-start justify-start gap-2 self-stretch"
			>
				<div className="self-stretch text-base font-bold text-black">Konfirmasi Password</div>
				<div className="inline-flex items-center justify-start gap-2.5 self-stretch rounded-2xl border border-black border-opacity-50 px-4 py-3">
					<div>
						<input
							className="outline-none"
							type="password"
							name="konfirmasi-password"
							id="konfirmasi-password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
					</div>
				</div>
			</label>
			<button
				type="submit"
				className="mx-auto inline-flex items-center justify-center gap-2.5 rounded-2xl bg-green-500 px-12 py-3"
			>
				<div className="text-center text-xl font-bold text-white">Register</div>
			</button>
			{error && <p>{error}</p>}
		</form>
	)
}

export default ManagerRegister

const express = require('express')
const cors = require('cors')
const authRoutes = require('./routes/auth.routes')
const session = require('express-session')
const transactionRoutes = require('./routes/transaction.routes')

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.use(
	session({
		secret: 'secret',
		resave: false,
		saveUninitialized: false,
		cookie: {
			httpOnly: true,
			maxAge: 24 * 60 * 60 * 1000 // 24 jam
		}
	})
)
app.use('/api/auth', authRoutes)
app.use('/api/transactions', transactionRoutes)

app.listen(port, () => {
	console.log(`Server running on port ${port}`)
})

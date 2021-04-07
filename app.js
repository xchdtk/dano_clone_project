const express = require('express')
const port    = 3000
const app     = express()
const cors    = require('cors')

const connect = require('./schemas');
connect();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

const goodsRouter   = require('./routers/goods')
const usersRouter   = require('./routers/user')

app.use('/api', goodsRouter)
app.use('/user', usersRouter)

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})
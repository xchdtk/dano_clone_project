// puppeteer을 가져온다.
const puppeteer = require('puppeteer');
const cheerio   = require('cheerio');
const express   = require('express')
const port    = 3000

const app     = express()
const connect = require('./schemas');
connect();

const Goods   = require('./schemas/goods')
app.use(express.json())
app.use(express.urlencoded({extended: false}))
const goodsRouter   = require('./routers/goods')
app.use('/api', goodsRouter)

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})
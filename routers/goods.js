const express   = require("express");

const Goods     = require("../schemas/goods");
const router    = express.Router();

router.get('/items', async(req, res) => {
    try{
        const items = await Goods.find({})
        res.status(200).send({
            "ok"     : true,
            "result" : items 
            })
    }catch(err) {
            console.log(err)
        }    
})

router.get('/items/:goodsId', async(req, res) => {
    try{
        const { goodsId } = req.params
        console.log()
        const items = await Goods.find({ goodsId })
        res.status(200).send({
            "ok"     : true,
            "result" : items 
            })
    }catch(err) {
            console.log(err)
        }    
})


module.exports = router;
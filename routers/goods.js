const express         = require("express");

const Goods           = require("../schemas/goods");
const Cart           = require("../schemas/carts");
const router          = express.Router();

middelware            = require("../middleware/auth_middleware")

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
        const items = await Goods.find({ _id : goodsId })
        res.status(200).send({
            "ok"     : true,
            "result" : items 
            })
    }catch(err) {
            console.log(err)
        }    
})


// router.get('/carts', middleware, async(req, res) => {
//     try{
        
//     }catch(err) {
//         console.log(err)
//     }
// })

router.post('/carts/:goodsId', async(req, res) => {
    try{
        const { option, quantity } = req.body
        const { goodsId } = req.params
        
        if(!option) {
            res.status(401).send({
                errorMessage : "선택한 상품이 없습니다."
            })
            return
        }
        cart_count = 0
        Cart.countDocuments({}, function (err, count) {
            cart_count = count;
          });
        
        cart = await Cart.findOne({ goodsId : goodsId, option: option })
        
        if (cart) {
            await Cart.updateOne({goodsId: goodsId, option: option}, {$set : {quantity : cart.quantity + quantity}});
            res.status(201).send({
                "result" : "장바구니에 담겼습니다."
            })
            return
        }

        await Cart.create({cartId: cart_count+1, userId:1 ,goodsId: goodsId, option: option, quantity: quantity})
        res.status(201).send({
            "result" : "장바구니에 담겼습니다."
        })
    }catch(err) {
        console.log(err)
    }
})

module.exports = router;
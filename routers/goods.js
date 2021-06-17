const express         = require("express");

const Goods           = require("../schemas/goods");
const Cart           = require("../schemas/carts");
const router          = express.Router();

middleware            = require("../middleware/auth_middleware")

// 메인페이지(전체상품)
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


// 상세페이지(해당하는 상품)
router.get('/items/:goodsId', middleware, async(req, res) => {
    try{
        const { goodsId } = req.params
        const items = await Goods.find({ goodsId : goodsId })
        res.status(200).send({
            "ok"     : true,
            "result" : items 
            })
    }catch(err) {
            console.log(err)
        }    
})


// 장바구니 보여주기
router.get('/carts', middleware, async(req, res) => {
    try{
        carts = await Cart.findOne({
            userId : res.locals.user.userId
        })

        res.status(200).send({
            carts : carts 
        })
    }catch(err) {
        console.log(err)
    }
})

// 장바구니 추가
router.post('/carts/:goodsId', middleware, async(req, res) => {
    try{
        const { option, quantity } = req.body
        const { goodsId }          = req.params
        const { userId }           = res.locals.user
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
        
        cart = await Cart.findOne({ userId : userId, goodsId : goodsId, option: option })
        
        if (cart) {
            await Cart.updateOne({userId : userId, goodsId: goodsId, option: option}, {$set : {quantity : cart.quantity + quantity}});
            res.status(201).send({
                "result" : "장바구니에 담겼습니다."
            })
            return
        }

        await Cart.create({cartId: cart_count+1, userId:userId ,goodsId: goodsId, option: option, quantity: quantity})
        res.status(201).send({
            "result" : "장바구니에 담겼습니다."
        })
    }catch(err) {
        console.log(err)
    }
})

module.exports = router;
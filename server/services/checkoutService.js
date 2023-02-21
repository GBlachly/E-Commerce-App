const cartsMod = require('../models/cartsModel');
const cartItemsMod = require('../models/cartItemsModel');
const ordersMod = require('../models/ordersModel');
const orderItemsMod = require('../models/orderItemsModel');
const productsMod = require('../models/productsModel');


const checkoutService = async (req, res, next) => {
    try {

        //GET CART INFO + DESTRUCTURE REQ.BODY
        const userId = req.user.id;
        const { totalPrice } = req.body;

        const cartResult = await cartsMod.getByUserId(userId);
        const cartItemsResult = await cartItemsMod.getItemsByCartId(cartResult.id);


        //CHECK IF ENOUGH STOCK FOR ORDER
        let notEnoughStock = false;
        for (let item of cartItemsResult) {
            const productResult = await productsMod.getById(item.product_id);
            const currentStock = productResult.stock;
            const requestedQuantity = item.quantity;
            if (requestedQuantity > currentStock) {
                notEnoughStock = true;
                break;
            };
        };
        
        if (notEnoughStock) {
            throw new Error('Not Enough Stock');
        };


        //CREATE ORDER
        const orderResult = await ordersMod.create({ userId, totalPrice });


        //UPDATE STOCK OF PRODUCTS + ADD ORDER ITEMS 
        const products = [];        //NOT CURRENTLY USED/NECESSARY
        cartItemsResult.forEach(async (item) => {

            const updatedProduct = await productsMod.updateStock({
                id: item.product_id, 
                quantity: item.quantity,
            });

            const data = {
                orderId: orderResult.id,
                productId: item.product_id,
                productName: item.product_name,
                productPrice: item.product_price,
                quantity: item.quantity,
            };

            const addedItem = await orderItemsMod.addItem(data);

            const addedItemInfo = {     //NOT CURRENTLY USED/NECESSARY
                orderId: addedItem.order_id,
                productId: addedItem.product_id,
                productName: addedItem.product_name,
                productPrice: addedItem.product_price,
                quantity: addedItem.quantity,
            };

            products.push(addedItemInfo);       //NOT CURRENTLY USED/NECESSARY
        });

        const orderData = {         //NOT CURRENTLY USED/NECESSARY
            id: orderResult.id,
            userId: orderResult.user_id,
            totalPrice: orderResult.total_price,
            products: products,
        }; 
        

        //CLEAR USERS CART 
        const deletedCartItems = await cartItemsMod.deleteAll(cartResult.id);


        //SEND EMPTY CART DATA
        const newCartData = {
            id: cartResult.id,
            userId: cartResult.user_id,
            products: [],
        };

        res.status(200).json({ data: newCartData });

    } catch(err) {
        next(err);
    };
};


module.exports = checkoutService;
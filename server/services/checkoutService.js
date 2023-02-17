const cartsMod = require('../models/cartsModel');
const cartItemsMod = require('../models/cartItemsModel');
const ordersMod = require('../models/ordersModel');
const orderItemsMod = require('../models/orderItemsModel');


const checkoutService = async (req, res, next) => {
    try {

        const userId = req.user.id;
        const { totalPrice } = req.body;

        const cartResult = await cartsMod.getByUserId(userId);
        const cartItemsResult = await cartItemsMod.getItemsByCartId(cartResult.id);
        const orderResult = await ordersMod.create({ userId, totalPrice });


        const products = [];
        cartItemsResult.forEach(async (item) => {

            const data = {
                orderId: orderResult.id,
                productId: item.product_id,
                productName: item.product_name,
                productPrice: item.product_price,
                quantity: item.quantity,
            };

            const addedItem = await orderItemsMod.addItem(data);

            const addedItemInfo = {
                orderId: addedItem.order_id,
                productId: addedItem.product_id,
                productName: addedItem.product_name,
                productPrice: addedItem.product_price,
                quantity: addedItem.quantity,
            };

            products.push(addedItemInfo);
        });


        /* const orderData = {
            id: orderResult.id,
            userId: orderResult.user_id,
            totalPrice: orderResult.total_price,
            products: products,
        }; */
        
        const deletedCartItems = await cartItemsMod.deleteAll(cartResult.id);

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
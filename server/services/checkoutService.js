const cartsMod = require('../models/cartsModel');
const cartItemsMod = require('../models/cartItemsModel');
const ordersMod = require('../models/ordersModel');
const orderItemsMod = require('../models/orderItemsModel');
const productsMod = require('../models/productsModel');
const addressesMod = require('../models/addressesModel');


const checkoutService = async (req, res, next) => {
    try {

        //GET CART INFO + DESTRUCTURE REQ.BODY
        const userId = req.user.id;
        const { totalPrice, addressId } = req.body;     /*!!!CHOOSE THE ADDRESS ID IN THE FRONT END!!!*/

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
        const orderResult = await ordersMod.create({ userId, totalPrice, addressId });  /*CHOOSE THE ADDRESS IN THE FRONT END*/


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
                productUrl: item.product_url,
                quantity: item.quantity,
            };

            const addedItem = await orderItemsMod.addItem(data);

            const addedItemInfo = {     //NOT CURRENTLY USED/NECESSARY
                orderId: addedItem.order_id,
                productId: addedItem.product_id,
                productName: addedItem.product_name,
                productPrice: addedItem.product_price,
                productUrl: addedItem.product_url,
                quantity: addedItem.quantity,
            };

            products.push(addedItemInfo);       //NOT CURRENTLY USED/NECESSARY
        });

        
        //ORGANIZE ORDER DATA TO BE SENT    //NOT CURRENTLY USED/NECESSARY
        const addressResult = await addressesMod.getById(addressId);
        const address = {
            id: addressResult.id,
            userId: addressResult.user_id,
            name: addressResult.name,
            line1: addressResult.line_1,
            line2: addressResult.line_2,
            city: addressResult.city,
            state: addressResult.state,
            country: addressResult.country,
            zipCode: addressResult.zip_code,
        };

        const orderData = {
            id: orderResult.id,
            userId: orderResult.user_id,
            totalPrice: orderResult.total_price,
            address, address, 
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
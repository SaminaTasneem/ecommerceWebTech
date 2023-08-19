import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";
import userModel from "../models/userModel.js";
import axios from 'axios';

//helper functions

// Generate a unique order ID using userId and productsId
const generateUniqueOrderId = (userId, productsId) => {
    const uniqueString = userId + productsId; // Combine userId and productsId string
    const hashedString = Buffer.from(uniqueString).toString("base64"); // Convert the combined string to base64 hash
    return hashedString;
};

//make transaction api call
const transaction = async(senderAccountNumber, receiverAccountNumber, transactionAmount) => {
    try {
        const res = await axios.post(`${process.env.BANK_API}/api/v1/transaction/make-transaction`,{
            senderAccountNo: senderAccountNumber,
            receiverAccountNo: receiverAccountNumber,
            transactionAmount: transactionAmount
        });

        if(res.data.success){
            console.log(res.data.message);
            return res;
        }
        else{
            console.log(res.data.message)
        }
    } catch (error) {
        console.log(error)
        
    }
}

export const createOrderController = async(req, res) => {
    try {
        const {
            user,
            products,
            bankAccountNumber,
            billingAddress,
            contactNumber,
            orderPrice,
        } = req.body;

        // console.log(req.body)
        //ok

        const orderId = generateUniqueOrderId(user,products);

        // console.log(orderId);
        //ok

        // console.log(process.env.ECOMMERCE_BANK_ACCOUNT_NUMBER)
        //ok
        
        const transactionRes = await transaction(bankAccountNumber,process.env.ECOMMERCE_BANK_ACCOUNT_NUMBER,orderPrice);
        
        // console.log(transactionRes.data);
        // console.log(transactionRes);
        //ok
        const transactionId = transactionRes.data.transactionId

        const order = new orderModel({
            user,
            products,
            orderId,
            billingAddress,
            contactNumber,
            orderPrice,
            orderTransactionId: transactionId,
        });

        await order.save();

        res.status(201).json({success: true, message: "Order created successfully."})
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Failed to create order" });
    }
};


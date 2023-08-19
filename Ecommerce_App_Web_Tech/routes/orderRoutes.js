import express from 'express'
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js"
import { createOrderController } from '../controllers/orderController.js';
const router = express.Router();

//create-order || POST
router.post('/create-order',requireSignIn,createOrderController)


export default router;
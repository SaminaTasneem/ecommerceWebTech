import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import PageHeader from '../../components/page-header/PageHeader'
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import './cart.css'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, TextField } from '@mui/material';
import { useAuth } from '../../context/auth';
import { useCart } from '../../context/cart';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Cart = () => {
    const [auth] = useAuth();
    const [cart, setCart] = useCart();
    const [openDialog, setOpenDialog] = useState(false);
    const navigate = useNavigate();
    const [contactNumber, setContactNumber] = useState('');
    const [bankAccountNumber, setBankAccountNumber] = useState('');
    const [billingAddress, setBillingAddress] = useState('');

    const handlePlaceOrder = async () => {

        try {
            //calculate total price
            const totalAmount = cart.reduce((total, item) => total + item.price, 0);

            //Gather necessary order data
            const orderData = {
                user: auth?.user._id,
                products: cart.map(item => ({
                    product: item._id,
                    quantity: 1,
                })),
                bankAccountNumber,
                billingAddress,
                contactNumber,
                orderPrice: totalAmount,
            };

            const response = await fetch(`${process.env.REACT_APP_API}/api/v1/orders/create-order`, {
                method: 'POST',
                body: JSON.stringify(orderData),
            });
            if (response.success) {
                setOpenDialog(false);
                toast.success('Order placed successfully!');
            } else {
                toast.error('Failed to place order.Please try again later.')
            }

        } catch (error) {
            console.log(error)

        }


    };


    //total price
    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map((item) => {
                total = total + item.price;
            });
            return total.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
            });
        } catch (error) {
            console.log(error)

        }
    }
    //delete item
    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex((item) => item._id === pid);
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem('cart', JSON.stringify(myCart));
        } catch (error) {
            console.log(error)

        }
    }
    //handle Checkout
    const handleCheckout = () => {
        if (!auth.user) {
            toast.error('Please login first for checkout');
            navigate('/login');
        } else {
            if (cart?.length <= 0) {
                toast.error("Please add some product to cart.")
            } else {
                setOpenDialog(true);
            }
        }
    }

    // Close dialog
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    return (
        <>
            <Layout>
                <PageHeader />
                <section id="cart" className='section-p1'>
                    <table width="100%">
                        <thead>
                            <tr>
                                <td>Remove</td>
                                <td>Image</td>
                                <td>Product</td>
                                <td>Price</td>
                                <td>Quantity</td>
                                <td>Subtotal</td>
                            </tr>
                        </thead>
                        <tbody>
                            {/* <tr> */}

                            {
                                cart?.map((p) => (
                                    <>
                                        <tr>
                                            <td>
                                                <IconButton aria-label="delete" size="large" onClick={() => removeCartItem(p._id)}>
                                                    <CancelIcon />
                                                </IconButton>
                                            </td>
                                            <td><img src={`${process.env.REACT_APP_API}/api/v1/product/get-productPhoto/${p._id}`} alt="" /></td>
                                            <td>{p.name}</td>
                                            <td>${p.price}</td>
                                            <td><input type="number" defaultValue={1} /></td>
                                            <td>${p.price}</td>
                                        </tr>
                                    </>
                                ))
                            }
                            {/* <td>
                                    <IconButton aria-label="delete" size="large">
                                        <CancelIcon />
                                    </IconButton>
                                </td>
                                <td><img src="/images/call_of_duty.png" alt="" /></td>
                                <td>Call of Duty</td>
                                <td>$100.20</td>
                                <td><input type="number" defaultValue={1} /></td>
                                <td>$100.20</td> */}
                            {/* </tr> */}
                        </tbody>
                    </table>
                </section>

                <section id="cart-add" className='section-p1'>
                    <div id="coupon">
                        <h3>Apply Coupon</h3>
                        <div>
                            <input type="text" placeholder='Enter your Coupon' />
                            <button className='normal'>Apply</button>
                        </div>
                    </div>

                    <div id="subtotal">
                        <h3>Cart Totals</h3>
                        <table>
                            <tr>
                                <td>Cart Subtotal</td>
                                <td>{totalPrice()}</td>
                            </tr>
                            <tr>
                                <td>Shipping</td>
                                <td>Free</td>
                            </tr>
                            <tr>
                                <td><strong>Total</strong></td>
                                <td><strong>{totalPrice()}</strong></td>
                            </tr>
                        </table>
                        <Button variant="contained" endIcon={<ShoppingCartCheckoutIcon />} onClick={handleCheckout}>
                            Proceed to checkout
                        </Button>
                    </div>
                </section>

                {/* Checkout Dialog */}
                <Dialog
                    open={openDialog}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleCloseDialog}
                    aria-labelledby="checkout-dialog-title"
                    aria-describedby="checkout-dialog-description"
                >
                    <DialogTitle id="checkout-dialog-title" align="center">
                        Payment
                    </DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField
                                fullWidth
                                label="Bank Account Number"
                                variant="outlined"
                                value={bankAccountNumber}
                                onChange={(e) => setBankAccountNumber(e.target.value)}
                                margin="normal"
                                required
                            />
                            <TextField
                                fullWidth
                                label="Billing Address"
                                variant="outlined"
                                value={billingAddress}
                                onChange={(e) => setBillingAddress(e.target.value)}
                                margin="normal"
                                required
                            />
                            <TextField
                                fullWidth
                                label="Contact Number"
                                variant="outlined"
                                value={contactNumber}
                                onChange={(e) => setContactNumber(e.target.value)}
                                margin="normal"
                                required

                            />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handlePlaceOrder} color="primary">
                            Place Order
                        </Button>
                    </DialogActions>
                </Dialog>
            </Layout>
        </>
    )
}

export default Cart
import React,{useState} from 'react';
import Layout from '../../components/Layout/Layout';
import OrderMenu from '../../components/Layout/OrderMenu';
import {Container, Grid, Card, Typography } from '@mui/material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, TextField } from '@mui/material';
import './orderInfo.css';


const OrderInfo = () => {
    const [open, setOpen]=useState(false);
    const [action, setAction]=useState(false);

    const openAction=()=>{
        setAction(true);
    }

    const closeAction=()=>{
        setAction(false);
    }

    const openInfo=()=>{
        setOpen(true);
        // console.log(open)
    }
    const closeInfo=()=>{
        setOpen(false);
    }
    const handleSubmit=()=>{
        console.log('submitted');
    }

  return (
    <Layout>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <OrderMenu/>
          </Grid>
          <Grid item xs={12} md={9}>
          <section className='order-table'>
                    <table width="100%">
                        <thead>
                            <tr>
                                <td>Id</td>
                                <td>Price</td>
                                <td>Info</td>
                                <td>Status</td>
                                <td>Action</td>
                                {/* <td>Subtotal</td> */}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1234</td>
                                <td>price</td>
                                <td>
                                    <button className='info-btn'>Info</button>
                                </td>
                                <td>Confirmed</td>
                                <td>
                                    <button className='info-btn'>Action</button>
                                </td>
                            </tr>
                            <tr>
                                <td>1234</td>
                                <td>price</td>
                                <td>
                                    <button className='info-btn' onClick={openInfo}>Info</button>
                                </td>
                                <td>Confirmed</td>
                                <td>
                                    <button className='info-btn' onClick={openAction}>Action</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>
          </Grid>
        </Grid>
        </Container>
    
        <Dialog
        open={open}
        keepMounted
        onClose={closeInfo}
        aria-labelledby="checkout-dialog-title"
         aria-describedby="checkout-dialog-description"
        >
        <DialogTitle align="center">
            Order Information
        </DialogTitle>
        <DialogContent>
            <h4>Order ID</h4>
            <br/>
            <h5>Product Information:</h5>
            <section className='order-table dialog'>
            <table width="100%">
                        <thead>
                            <tr>
                                <td>ID</td>
                                <td>Name</td>
                                <td>Quantity</td>
                                {/* <td>Subtotal</td> */}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1234</td>
                                <td>Name</td>
                                <td>quantity</td>
                            </tr>
                        </tbody>
            </table>
            </section>
            <div classname='order-info' style={{marginTop: '30px'}}>
            <div className='order-1'>
                <h5>Billing Info: u8redf</h5>
                <h5>Contact No: 01826700175</h5>
            </div>
            <div className='order-2'>
                <h5>Order At: 12.34</h5>
                <h5>Transaction Id: alsdfdskjfwo45u89ewurih</h5>
            </div>
            </div>
        </DialogContent>
        <DialogActions>
        <Button onClick={closeInfo} color="primary">
            Cancel
        </Button>
        </DialogActions>
        </Dialog>


        <Dialog
        open={action}
        keepMounted
        onClose={closeAction}
        aria-labelledby="checkout-dialog-title"
         aria-describedby="checkout-dialog-description"
        >
        <DialogTitle>
            Change Order Status
        </DialogTitle>
        <DialogContent>
            <h3>Current order Status: Confirmed</h3>
            <div className='new-status'>
            <h3>New Order Satus: </h3>
            <select style={{marginRight: '20px'}}>
                <option>Pending</option>
                <option>Confirmed</option>
                <option>Shipping</option>
                <option>Shipped</option>
                <option>Delivering</option>
                <option>Delivered</option>
            </select>
        </div>
        </DialogContent>
        <DialogActions>
        <Button onClick={closeAction} color="primary">
            Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
            Submit
        </Button>
        </DialogActions>

        </Dialog>
       
    </Layout>
  )
}


export default OrderInfo
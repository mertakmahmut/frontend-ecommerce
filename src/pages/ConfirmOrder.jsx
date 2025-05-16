import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import error from '../assets/error.png'
import success from '../assets/success.png'
import { Link } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';
import axios from 'axios';

const load = async () => {
    return await loadStripe('pk_test_51ROa83PGnGtg4tWmhEFxesmcm2XFYjhjQ1x1Hzx7JaaN4gcgopQpZeZ2GW2lbklKyytKJVM9bhusxWiUYYfVMKLw001MYMJFgV')
}

const ConfirmOrder = () => {

    const [loader, setLoader] = useState(true)
    const [stripe, setStripe] = useState('')
    const [message, setMessage] = useState(null)

    useEffect(() => {
        if (!stripe) {
            return
        }
        const clientSecret = new URLSearchParams(window.location.search).get('payment_intent_client_secret')
        if (!clientSecret) {
            return
        }
        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch(paymentIntent.status){
                case "succeeded":
                    setMessage('succeeded')
                    break
                    case "processing":
                    setMessage('processing')
                    break
                    case "requires_payment_method":
                    setMessage('failed')
                    break
                    default:
                    setMessage('failed')

            }
        })
    },[stripe])

    const get_load = async () => {
        const tempStripe = await load()
        setStripe(tempStripe)
    }
    
    useEffect(() => {
        get_load()
    },[])

    const update_payment = async () => {
        const orderId = localStorage.getItem('orderId')
        if (orderId) {
            try {
                await axios.get(`http://localhost:1000/api/order/confirm/${orderId}`)
                localStorage.removeItem('orderId')
                setLoader(false)
            } catch (error) {
                console.log(error.response.data)
            }
        }
    }

    useEffect(() => {
        if (message === 'succeeded') {
            update_payment()
        }
    },[message])


    return (
        <div className='w-screen h-screen flex justify-center items-center flex-col gap-4'>
            {
                (message === 'failed' || message === 'processing') ? <>
                <img src={error} alt="" />
                <Link className='px-5 py-2 bg-green-500 rounded-sm text-white' to="/dashboard/my-orders">Satıcı Paneline Geri Dön </Link>
                </> : message === 'succeeded' ? loader ? <FadeLoader/> : <>
                <img src={success} alt="" />
                <Link className='px-5 py-2 bg-green-500 rounded-sm text-white' to="/dashboard/my-orders">Satıcı Paneline Geri Dön </Link>
                </> : <FadeLoader/> 
            }
            
        </div>
    );
};

export default ConfirmOrder;
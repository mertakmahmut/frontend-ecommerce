import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import axios from 'axios';
import CheckoutForm from '../CheckoutForm';
const stripePromise = loadStripe('pk_test_51ROa83PGnGtg4tWmhEFxesmcm2XFYjhjQ1x1Hzx7JaaN4gcgopQpZeZ2GW2lbklKyytKJVM9bhusxWiUYYfVMKLw001MYMJFgV')

const Stripe = ({stripe, orderId, price}) => {

    const [clientSecret, setClientSecret] = useState('')
    const appearance = {
        theme : 'stripe'
    }
    const options = {
        appearance,
        clientSecret
    }

    const create_payment = async () => {
        try {
            const {data} = await axios.post('http://localhost:1000/api/order/create-payment', {price}, {withCredentials: true})
            setClientSecret(data.clientSecret)
        } catch (error) {
            console.log(error.response.data)
        }
    }

    return (
        <div className='mt-4'>
            {
                clientSecret ? (
                    <Elements options = {options} stripe={stripePromise}>
                        <CheckoutForm orderId = {orderId}  />
                    </Elements>
                ) : <button onClick={create_payment} className='px-10 py-[6px] rounded-sm hover:shadow-green-700/30 hover:shadow-lg bg-green-700 text-white'>Ödeme Başlat</button>
            }
        </div>
    );
};

export default Stripe;
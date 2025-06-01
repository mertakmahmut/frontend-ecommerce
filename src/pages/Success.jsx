import React from 'react';
import { Link } from 'react-router-dom';
import success from '../assets/success.png';

const Success = () => {
    return (
        <div className='w-screen h-screen flex justify-center items-center flex-col gap-4'>
            <img src={success} alt="Başarılı" className='w-32 h-32' />
            <h2 className='text-xl font-semibold text-green-600'>Ödemeniz başarıyla alındı!</h2>
            <Link className='px-5 py-2 bg-green-500 rounded-sm text-white' to="/dashboard/my-orders">Siparişlerime Git</Link>
        </div>
    );
};

export default Success;
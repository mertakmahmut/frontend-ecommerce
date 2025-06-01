import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const HavaleEft = ({ orderId, price }) => {
    const navigate = useNavigate();

    const handleConfirmPayment = async () => {
        try {
            await axios.put(`http://localhost:1000/api/order/eft-confirm/${orderId}`, {}, {
                withCredentials: true
            });
            navigate('/order/success');
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

    return (
        <div className='w-full px-4 py-8 bg-white shadow-sm mt-6 text-black'>
            <h2 className='text-lg font-semibold mb-4'>Banka Bilgileri</h2>
            <ul className='mb-4 space-y-2'>
                <li><strong>Banka Adı:</strong> Ziraat Bankası</li>
                <li><strong>Hesap Sahibi:</strong> Medpazar Ltd. Şti.</li>
                <li><strong>IBAN:</strong> TR00 0000 0000 0000 0000 0000 00</li>
                <li><strong>Açıklama:</strong> Lütfen "Sipariş No: {orderId}" yazmayı unutmayınız.</li>
                <li><strong>Ödenecek Tutar:</strong> ₺{price}</li>
            </ul>

            <p className='mb-6 text-sm text-gray-600'>
                Bu banka hesabına toplam tutarı gönderiniz. Açıklama kısmına sipariş numarasını eklemeyi unutmayınız.
                Ödemeyi gerçekleştirdikten sonra "Ödemeyi Tamamladım" butonuna tıklayınız.
            </p>

            <button onClick={handleConfirmPayment} className='px-10 py-[6px] rounded-sm hover:shadow-green-500/20 hover:shadow-lg bg-[#059473] text-white'>
                Ödemeyi Tamamladım
            </button>
        </div>
    );
};

export default HavaleEft;

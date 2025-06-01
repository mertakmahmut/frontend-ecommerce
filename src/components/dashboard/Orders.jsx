import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { get_orders } from '../../store/reducers/orderReducer';
// Kullanıcının sipariş geçmişini dinamik olarak listeleyen ve filtreleme yapılabilen bir dashboard bileşenidir.
const Orders = () => {
    const [state, setState] = useState('all') // Bu state, seçilen sipariş durumunu (delivery_status) temsil eder. Varsayılanı all. Select menüsünde değiştikçe güncellenir ve useEffect tetiklenir.

    const dispatch = useDispatch()
    const {userInfo} = useSelector(state => state.auth) // auth slice’ından oturum açmış kullanıcının bilgileri alınır.
    const {myOrders} = useSelector(state => state.order) // order slice’ındaki myOrders, gelen sipariş listesini tutar.
    const navigate = useNavigate()

    useEffect(() => { // veri getirme - Sipariş durumu her değiştiğinde backend'e yeni istek atılır. 
        dispatch(get_orders({status : state, customerId : userInfo.id}))
    },[state])
    
    const redirect = (order) => {
        let items = 0
        for (let i = 0; i < order.length; i++) {
            items = order.products[i].quantity + items;
        }
        navigate('/payment', {
            state : {
                price : order.price,
                items,
                orderId : order._id
            }
        })
    }

    return (
        <div className='bg-white p-4 rounded-md'>
            <div className='flex justify-between items-center'>
                <h2 className='text-xl font-semibold text-slate-600'>Siparişlerim </h2>
                <select className='outline-none px-3 py-1 border rounded-md text-slate-600' value={state} onChange={(e) => setState(e.target.value)} >
                    <option value="all">--sipariş durumu--</option>
                    <option value="placed">Teslim Edildi</option>
                    <option value="pending">Sipariş Verildi</option>
                    <option value="processing">Hazırlanıyor</option>
                    <option value="cancelled">İptal Edildi</option>
                    <option value="warehouse">Kargoya Verildi</option>
                </select> 
            </div>

            <div className='pt-4'>
                <div className='relative overflow-x-auto rounded-md'>
                    <table className='w-full text-sm text-left text-gray-500'>
                        <thead className='text-xs text-gray-700 uppercase bg-gray-200'>
                            <tr>
                                <th scope='col' className='px-6 py-3'>Sipariş No</th>
                                <th scope='col' className='px-6 py-3'>Tutar</th>
                                <th scope='col' className='px-6 py-3'>Ödeme Durumu</th>
                                <th scope='col' className='px-6 py-3'>Sipariş Durumu</th>
                                <th scope='col' className='px-6 py-3'>Eylem</th> 
                            </tr>
                        </thead>
                        <tbody>
                            {myOrders.map((order, index) => (
                                <tr key={index} className='bg-white border-b'>
                                    <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>#{order._id}</td>
                                    <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>₺{order.price}</td>
                                    <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>{order.payment_status}</td>
                                    <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>{order.delivery_status}</td>
                                    <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>
                                    <Link to={`/dashboard/order/details/${order._id}`}>
                                        <span className='bg-green-200 text-green-800 text-md font-semibold mr-2 px-3 py-[2px] rounded'>
                                        Görüntüle
                                        </span>
                                    </Link>

                                    {
                                        order.payment_status != 'paid' && <span onClick={() => redirect(order)} className='bg-green-200 text-green-800 text-md font-semibold mr-2 px-3 py-[2px] rounded cursor-pointer'>
                                        Şimdi Öde
                                        </span>
                                    }
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>

                </div>

            </div>
          
        </div>
    );
};

export default Orders;
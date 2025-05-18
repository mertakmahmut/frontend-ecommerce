import React, { useEffect } from 'react';
import { RiShoppingCart2Fill } from "react-icons/ri";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link, redirect, useNavigate } from 'react-router-dom';
import { get_dashboard_index_data } from '../../store/reducers/dashboardReducer';

const Index = () => {

    const dispatch = useDispatch()
    const {userInfo} = useSelector(state => state.auth)
    const {recentOrders, totalOrder, pendingOrders, cancelledOrders} = useSelector(state => state.dashboard)

    const navigate = useNavigate()

    useEffect(() => {
        dispatch(get_dashboard_index_data(userInfo.id))
    }, [])

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
        <div>
            <div className='grid grid-cols-3 md:grid-cols-1 gap-5'>
                <div className='flex justify-center items-center p-5 bg-white rounded-md gap-5'>
                    <div className='bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl'>
                        <span className='text-xl text-green-800'><RiShoppingCart2Fill /></span>
                    </div>
                    <div className='flex flex-col justify-start items-start text-slate-600'>
                        <h2 className='text-3xl font-bold'>{totalOrder}</h2>
                        <span>Siparişler </span>
                    </div>     
                </div>


                <div className='flex justify-center items-center p-5 bg-white rounded-md gap-5'>
                    <div className='bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl'>
                        <span className='text-xl text-green-800'><RiShoppingCart2Fill /></span>
                    </div>
                    <div className='flex flex-col justify-start items-start text-slate-600'>
                        <h2 className='text-3xl font-bold'>{pendingOrders}</h2>
                        <span>Bekleyen Siparişler </span>
                    </div>     
                </div>


                <div className='flex justify-center items-center p-5 bg-white rounded-md gap-5'>
                    <div className='bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl'>
                        <span className='text-xl text-green-800'><RiShoppingCart2Fill /></span>
                    </div>
                    <div className='flex flex-col justify-start items-start text-slate-600'>
                        <h2 className='text-3xl font-bold'>{cancelledOrders}</h2>
                        <span>İptal Edilen Siparişler </span>
                    </div>     
                </div> 
            </div>

            <div className='bg-white p-5 mt-5 rounded-md'>
                <h2>Son Siparişler</h2>
                <div className='pt-4'>
                    <div className='relative overflow-x-auto rounded-md'>
                        <table className='w-full text-sm text-left text-gray-500'>
                            <thead className='text-xs text-gray-700 uppercase bg-gray-200'>
                                <tr>
                                    <th scope='col' className='px-6 py-3'>Sipariş No</th>
                                    <th scope='col' className='px-6 py-3'>Toplam</th>
                                    <th scope='col' className='px-6 py-3'>Ödeme Durumu</th>
                                    <th scope='col' className='px-6 py-3'>Sipariş Durumu</th>
                                    <th scope='col' className='px-6 py-3'>Eylem</th> 
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map((order, index) => (
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
    
        </div>
    );
};

export default Index;
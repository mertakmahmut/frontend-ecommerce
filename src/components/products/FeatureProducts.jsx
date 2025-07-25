import React, { useState, useEffect } from 'react';
import { FaEye, FaRegHeart } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import Rating from '../Rating';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { add_to_cart, add_to_wishlist, messageClear } from '../../store/reducers/cartReducer';
import toast from 'react-hot-toast';


const FeatureProducts = ({products}) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {userInfo} = useSelector(state => state.auth)
    const {successMessage, errorMessage} = useSelector(state => state.cart)

    const add_cart = (id) => {
        // console.log(id)
        if (userInfo) {
            dispatch(add_to_cart({
                userId : userInfo.id,
                quantity: 1,
                productId : id
            }))
        } else {
            navigate('/login')
        }
    }

    const add_wishlist = (product) => {
        // console.log(product)
        if (userInfo) {
            dispatch(add_to_wishlist({
                userId: userInfo.id,
                productId: product._id,
                name: product.name,
                price: product.price,
                image: product.images[0],
                discount: product.discount,
                rating: product.rating,
                slug: product.slug
            }))
        } else {
            navigate('/login')
        }
    }

    useEffect(() => {

        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())

        }
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())
        }

    },[successMessage,errorMessage])
    
    return (
        <div className='w-[85%] flex flex-wrap mx-auto'>
            <div className='w-full'>
                <div className='text-center flex justify-center items-center flex-col text-4xl text-slate-600 font-bold relative pb-[45px]'>
                    <h2>Öne Çıkan Ürünler </h2>
                    <div className='w-[100px] h-[2px] bg-[#059473] mt-4'></div>
                </div>
            </div>

            <div className='w-full grid grid-cols-4 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6'>
                {
                    products.map((p,i) => <div key={i} className='border group transition-all duration-500 hover:shadow-md hover:-mt-3'>
                    <div className='relative overflow-hidden'>
                        {
                            p.discount ? <div className='flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2'>{p.discount}% </div>  : ''
                        }
                        <img className='sm:w-full w-full h-[240px]' src={p.images[0]} alt="" />
                        <ul className='flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3'>
                            <li onClick={() => add_wishlist(p)} className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all'>
                            <FaRegHeart />
                            </li>
                            <Link to={`/product/details/${p.slug}`} className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all'>
                            <FaEye />
                            </Link>
                            <li onClick={() => add_cart(p._id)} className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all'>
                            <RiShoppingCartLine />
                            </li>
                        </ul>    
                    </div>

                    <div className='py-3 text-slate-600 px-2'>
                        <h2 className='font-bold truncate w-[230px]'>{p.name} </h2>
                        <div className='flex justify-start items-center gap-3'>
                            <span className='text-md font-semibold text-emerald-500	'>₺{p.price - (p.price * p.discount) / 100 }</span>
                            {/* <div className='flex'>
                                <Rating ratings = {p.rating}/>
                            </div> */}
                        </div>
                    </div>   

                    </div>
                    )
                }

            </div>
        </div>
    );
};

export default FeatureProducts;
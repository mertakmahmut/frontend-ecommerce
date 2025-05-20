import React, { useEffect } from 'react';
import { FaEye, FaRegHeart } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import Rating from '../Rating';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { add_to_cart, add_to_wishlist, messageClear } from '../../store/reducers/cartReducer';
import toast from 'react-hot-toast';

const ShopProducts = ({styles, products}) => {

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
        <div className={`w-full grid ${styles === 'grid' ? 'grid-cols-3 md-lg:grid-cols-2 md:grid-cols-2' : 'grid-cols-1 md-lg:grid-cols-2 md:grid-cols-2'} gap-3 `}>
            {
                products.map((p, i)=> <div key={i} className={`flex transition-all duration-1000 hover:shadow-md hover:-translate-y-3 ${styles === 'grid' ? 'flex-col justify-start items-start' : 'justify-start items-center md-lg:flex-col md-lg:justify-start md-lg:items-start'} w-full gap-4 bg-white p-1 rounded-md`}>
                    <div className={styles === 'grid' ? 'w-full relative group h-[210px] md:h-[270px] xs:h-[170px] overflow-hidden' : 'md-lg:w-full relative group h-[210px] md:h-[270px] overflow-hidden'}>
                        <img className='h-[240px] rounded-md md:h-[270px] xs:h-[170px] w-full object-cover' src={p.images[0]} alt="" />
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

                    <div className='flex justify-start items-start flex-col gap-1'>
                        <h2 className='font-bold truncate w-[230px]'> {p.name} </h2>
                        <div className='flex justify-start items-center gap-3'>
                            <span className='text-md font-semibold text-emerald-500'>₺{p.price}</span>
                            {/* <div className='flex'>
                                <Rating ratings = {p.rating}/>
                            </div> */}
                        </div>
                    </div>  

                </div>
                )
            }
        </div>
    );
};

export default ShopProducts;
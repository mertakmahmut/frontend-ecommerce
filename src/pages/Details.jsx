import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import Carousel from 'react-multi-carousel'; 
import 'react-multi-carousel/lib/styles.css'
import Rating from '../components/Rating';
import { FaHeart } from 'react-icons/fa6';
import { FaFacebookF} from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import Reviews from '../components/Reviews';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useDispatch } from 'react-redux';
import { product_details } from '../store/reducers/homeReducer';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { add_to_cart, add_to_wishlist, messageClear } from '../store/reducers/cartReducer';

const Details = () => {

    // const images = [1,2,3,4,5,6]
    const [image, setImage] = useState()
    // const discount = 10
    const stock = 3

    const { product, relatedProducts, moreProducts, totalReview } = useSelector(state => state.home)
    const { userInfo } = useSelector(state => state.auth)

    const [state, setState] = useState('description')

    const dispatch = useDispatch()
    const {slug} = useParams()

    useEffect(() => {
        dispatch(product_details(slug))
    }, [slug])
 
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 4
        },
        mdtablet: {
            breakpoint: { max: 991, min: 464 },
            items: 4
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 3
        },
        smmobile: {
            breakpoint: { max: 640, min: 0 },
            items: 2
        },
        xsmobile: {
            breakpoint: { max: 440, min: 0 },
            items: 1
        },
    }

    const [quantity, setQuantity] = useState(1)
    const navigate = useNavigate()
    const {successMessage, errorMessage} = useSelector(state => state.cart)

    const inc = () => {
        if (quantity >= product.stock) {
            toast.error('Stokta yok')
        } else {
            setQuantity(quantity + 1)
        }
    }

    const dec = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    const add_cart = () => {
        // console.log(id)
        if (userInfo) {
            dispatch(add_to_cart({
                userId : userInfo.id,
                quantity,
                productId : product._id
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

    const add_wishlist = () => {
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

    const buynow = () => {
        let price = 0;
        if (product.discount != 0) {
            price = product.price - Math.floor((product.price * product.discount) / 100)
        } else {
            price = product.price
        }

        const obj = [
            {
                sellerId: product.sellerId,
                shopName: product.shopName,
                price :  quantity * (price - Math.floor((price * 5) / 100)),
                products : [
                    {
                        quantity,
                        productInfo: product
                    }
                ]
            }
        ]
        if (userInfo.id) {
            navigate('/shipping',{
                state: {
                    products : obj,
                    price: price * quantity,
                    shipping_fee : 20,
                    items: 1
                }
            }) 
        } else {
            navigate('/login')
        }
        
   }

    return (
        <div>
            <Header />

            <section className='bg-[url("http://localhost:3000/images/banner/med.png")] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left'>
            <div className='absolute left-0 top-0 w-full h-full bg-[#2422228a]'>
                <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto '>
                    <div className='flex flex-col justify-center gap-1 items-center h-full w-full text-white'>
                        <h2 className='text-3xl font-bold'>Ürün Detayları </h2>
                        <div className='flex justify-center items-center gap-2 text-2xl w-full'>
                            <Link to='/'>Anasayfa</Link>
                            <span className='pt-1'>
                                <IoIosArrowForward />
                            </span>
                            <span>Ürün Detayları</span>
                        </div>
                    </div>

                </div>

            </div>

            </section>

            <section>
                <div className='bg-slate-100 py-5 mb-5'>
                    <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
                        <div className='flex justify-start items-center text-md text-slate-600 w-full'>
                            <Link to='/'>Anasayfa</Link>
                            <span className='pt-1'><IoIosArrowForward /></span>
                            <Link to='/'>{product.category}</Link>
                            <span className='pt-1'><IoIosArrowForward /></span>
                            <span>{product.name} </span>
                        </div>
        
                    </div>
                </div>
            </section>
 
            <section>
                <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
                    <div className='grid grid-cols-2 md-lg:grid-cols-1 gap-8'>
                        <div>
                            <div className='p-5 border'>
                                <img className='h-[400px] w-full' src={image ? image : product.images?.[0] } alt="" />
                            </div>
                            <div className='py-3'>
                                {
                                    product.images && <Carousel
                                    autoPlay={true}
                                    infinite={true} 
                                    responsive={responsive}
                                    transitionDuration={500}
                                >
                                    {
                                        product.images.map((img, i) => {
                                        return (
                                            <div key={i} onClick={() => setImage(img)}>
                                                <img className='h-[120px] cursor-pointer' src={img} alt="" /> 
                                            </div>
                                        )
                                        })
                                    }
                
                                </Carousel>
                                }
                            </div>    
                        </div>

                        <div className='flex flex-col gap-5'>
                            <div className='text-3xl text-slate-600 font-bold'>
                                <h3>{product.name} </h3>
                            </div>
                            {/* <div className='flex justify-start items-center gap-4'>
                                <div className='flex text-xl'>
                                    <Rating ratings={4.5} />
                                </div>
                                <span className='text-green-500'>({totalReview} reviews)</span> 
                            </div> */}
 
                            <div className='text-2xl text-red-500 font-bold flex gap-3'>
                                {
                                    product.discount !== 0 ? <>
                                    Price : <h2 className='line-through'>{product.price}</h2>
                                    <h2>₺{product.price - Math.floor((product.price * product.discount) / 100)} (-{product.discount}%) </h2>
                                    
                                    </> : <h2> Price : ₺{product.price} </h2>
                                }
                            </div>      

                            <div className='text-slate-600'>
                                <p>{product.description} </p>
                                <p className='text-slate-600 py-1 font-bold'>Mağaza Adı : {product.shopName}</p>
                            </div> 

                            <div className='flex gap-3 pb-10 border-b'>
                                {
                                    product.stock ? <>
                                    <div className='flex bg-slate-200 h-[50px] justify-center items-center text-xl'>
                                        <div onClick={dec} className='px-6 cursor-pointer'>-</div>
                                        <div className='px-6'>{quantity}</div>
                                        <div onClick={inc} className='px-6 cursor-pointer'>+</div>
                                    </div>
                                    <div>
                                        <button onClick={add_cart} className='px-8 py-3 h-[50px] cursor-pointer hover:shadow-lg hover:shadow-green-500/40 bg-[#059473] text-white'>Sepete Ekle</button>
                                    </div>

                                    
                                    </> : ''
                                }

                                <div>
                                    <div onClick={add_wishlist} className='h-[50px] w-[50px] flex justify-center items-center cursor-pointer hover:shadow-lg hover:shadow-cyan-500/40 bg-cyan-500 text-white'>
                                        <FaHeart />
                                    </div>
                                </div>
 
                            </div>

                            <div className='flex py-5 gap-5'>
                                <div className='w-[150px] text-black font-bold text-xl flex flex-col gap-5'>
                                    <span>Stok Durumu</span>
                                    <span>Paylaş</span> 
                                </div> 
                                <div className='flex flex-col gap-5'>
                                    <span className={`text-${product.stock ? 'green' : 'red'}-500`}>
                                        {product.stock ? `Stokta(${product.stock})` : 'Stokta Yok'}
                                    </span>

                                    <ul className='flex justify-start items-center gap-3'>
                                        <li>
                                            <a className='w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-indigo-500 rounded-full text-white' href="#"> <FaFacebookF /> </a>
                                        </li>
                                        <li>
                                            <a className='w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-cyan-500 rounded-full text-white' href="#"> <FaTwitter /> </a>
                                        </li>
                                        <li>
                                            <a className='w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-purple-500 rounded-full text-white' href="#"> <FaLinkedin /> </a>
                                        </li>
                                        <li>
                                            <a className='w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-blue-500 rounded-full text-white' href="#"> <FaGithub /> </a>
                                        </li>
                                    </ul> 
                                </div>
                            </div>

                            <div className='flex gap-3'>
                                {
                                    product.stock ? <button onClick={buynow} className='px-8 py-3 h-[50px] cursor-pointer hover:shadow-lg hover:shadow-green-500/40 bg-[#247462] text-white'>Şimdi Al</button> : ''
                                }
                                <Link to = {`/dashboard/chat/${product.sellerId}`} className='px-8 py-3 h-[50px] cursor-pointer hover:shadow-lg hover:shadow-red-500/40 bg-red-500 text-white'>
                                    Soru Sor
                                </Link>
                                </div>

                        </div>

                    </div>
                
                </div> 

                
            </section>

            <section>
            <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto pt-16'>
                <div className='flex flex-wrap'>
                    <div className='w-[72%] md-lg:w-full'>
                        <div className='pr-4 md-lg:pr-0'>
                            <div className='grid grid-cols-2'>
                            
                            <button onClick={() => setState('description')} className={`py-1 hover:text-white px-5 hover:bg-[#059473] ${state === 'description' ? 'bg-[#059473] text-white' : 'bg-slate-200 text-slate-700' } rounded-sm`}>Ürün Hakkında </button>
                            <button onClick={() => setState('reviews')} className={`py-1 hover:text-white px-5 hover:bg-[#059473] ${state === 'reviews' ? 'bg-[#059473] text-white' : 'bg-slate-200 text-slate-700'} rounded-sm`}>Yorumlar </button>
                            </div>

                            <div>
                                {
                                    state == 'reviews' ? <Reviews product = {product}/> :
                                    <p className='py-5 text-slate-600'>{product.description}</p>
                                }
                            </div>

                        </div>

                    </div>

                    <div className='w-[28%] md-lg:w-full'>
                        <div className='pl-4 md-lg:pl-0'>
                            <div className='px-3 py-2 text-slate-600 bg-slate-200'>
                                <h2 className='font-bold'>{product.shopName}</h2>
                            </div>
                            <div className='flex flex-col gap-5 mt-3 border p-3'>
                                {
                                    moreProducts.map((p,i) => {
                                        return (
                                            <Link className='block'>
                                                <div className='relative h-[270px]'>
                                                <img className='w-full h-full' src={p.images[0]} alt="" />
                                                {
                                                product.discount !== 0 && <div className='flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2'>{product.discount}%
                                                </div>
                                                }
                                                </div>
                                                <h2 className='text-slate-600 py-1 font-bold'>{p.name} </h2>
                                                <div className='flex gap-2'>
                                                    <h2 className='text-lg font-bold text-slate-600'>₺{p.price}</h2>
                                                    <div className='flex items-center gap-2'>
                                                        <Rating ratings={p.rating}  />
                                                    </div>
                                                </div>
                                                
                                            </Link>
                                        )
                                    })
                                }

                            </div>
                        </div>
                    </div>

                    


                </div>
            </div>
            </section>

            <section>
            <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
                <h2 className='text-2xl py-8 text-slate-600'>Benzer Ürünler </h2>
                <div>
                    <Swiper
                    slidesPerView='auto'
                    breakpoints={{
                        1280 : {
                            slidesPerView: 3
                        },
                        565 : {
                            slidesPerView: 2
                        }
                    }}
                    spaceBetween={25}
                    loop={true}
                    pagination={{
                        clickable: true,
                        el: '.custom_bullet'
                    }}
                    modules={[Pagination]}
                    className='mySwiper' 
                    > 

                    {
                        relatedProducts.map((p, i) => {
                            return (

                                <SwiperSlide key={i}>
                                    <Link className='block'>
                                        <div className='relative h-[270px]'>
                                            <div className='w-full h-full'>
                                                <img className='w-full h-full' src={p.images[0]} alt="" />
                                                <div className='absolute h-full w-full top-0 left-0 bg-[#000] opacity-25 hover:opacity-50 transition-all duration-500'> 
                                                </div>
                                            </div>
                                            {
                                            p.discount !== 0 && <div className='flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2'>{p.discount}%
                                            </div>
                                            }
                                            

                                        </div>

                                        <div className='p-4 flex flex-col gap-1'>
                                            <h2 className='text-slate-600 text-lg font-bold'>{p.name} </h2>
                                            <div className='flex justify-start items-center gap-3'>
                                                <h2 className='text-lg font-bold text-slate-600'>₺{p.price}</h2>
                                                {/* <div className='flex'>
                                                    <Rating ratings={p.rating} />
                                                </div> */}
                                            </div>
                                        </div>

                                    </Link>

                                </SwiperSlide>

                            )
                        })
                    }
                    
                    </Swiper>
                </div>

                <div className='w-full flex justify-center items-center py-8'>
                    <div className='custom_bullet justify-center gap-3 !w-auto'>
                    </div>
 
                </div>

            </div>
            </section>


            <Footer/>
        </div>
    );
};

export default Details;
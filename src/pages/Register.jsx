import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaFacebookF } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa6"; 
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { customer_register, messageClear } from '../store/reducers/authReducer';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { FadeLoader } from "react-spinners";

const Register = () => {

    const navigate = useNavigate()
    const {loader, errorMessage, successMessage, userInfo} = useSelector(state => state.auth)

    const [state, setState] = useState({
        name: '',
        email: '',
        password: ''
    })

    const dispatch = useDispatch()

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
 
    const register = (e) => {
        e.preventDefault()
        dispatch(customer_register(state))
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
        if (userInfo) {
            navigate('/')
        }

    },[successMessage,errorMessage])

    return (
        <div>

            {
                loader && <div className='w-screen h-screen flex justify-center items-center fixed left-0 top-0 bg-[#38303033] z-[999]'>
                    <FadeLoader/>
                </div>
            }

            <Header/>
                <div className='bg-slate-200 mt-4'>
                    <div className='w-full justify-center items-center p-10'>
                        <div className='grid grid-cols-2 w-[60%] mx-auto bg-white rounded-md'>
                            <div className='px-8 py-8'>
                                <h2 className='text-center w-full text-xl text-slate-600 font-bold'>Kayıt Ol </h2> 

                                <div>
                                    <form onSubmit={register} className='text-slate-600'>
                                        <div className='flex flex-col gap-1 mb-2'>
                                            <label htmlFor="name">İsim</label>
                                            <input onChange={inputHandle} value={state.name} className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md' type="text" name="name" id="name" placeholder='İsim' required />
                                        </div>

                                        <div className='flex flex-col gap-1 mb-2'>
                                            <label htmlFor="email">E-posta</label>
                                            <input onChange={inputHandle} value={state.email}  className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md' type="email" name="email" id="email" placeholder='E-posta' required />
                                        </div>


                                        <div className='flex flex-col gap-1 mb-2'>
                                            <label htmlFor="password">Parola</label>
                                            <input onChange={inputHandle} value={state.password}  className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md' type="password" name="password" id="password" placeholder='Parola' required />
                                        </div>

                                        <button className='px-8 w-full py-2 bg-[#059473] shadow-lg hover:shadow-green-500/40 text-white rounded-md'>Kayıt Ol</button>
                                    
                                    </form>
                                    <div className='flex justify-center items-center py-2'>
                                        <div className='h-[1px] bg-slate-300 w-[95%]'> </div>
                                        <span className='px-3 text-slate-600'>Yada</span>
                                        <div className='h-[1px] bg-slate-300 w-[95%]'> </div>
                                    </div>

                                    <button className='px-8 w-full py-2 bg-indigo-500 shadow hover:shadow-indigo-500/50 text-white rounded-md flex justify-center items-center gap-2 mb-3'>
                                        <span><FaFacebookF /> </span>
                                        <span>Facebook ile Kayıt Ol </span>
                                    </button>

                                    <button className='px-8 w-full py-2 bg-red-500 shadow hover:shadow-red-500/50 text-white rounded-md flex justify-center items-center gap-2 mb-3'>
                                        <span><FaGoogle  /></span>
                                        <span>Google ile Kayıt Ol </span>
                                    </button> 
                                </div>    

                                <div className='text-center text-slate-600 pt-1'>
                                    <p>Zaten hesabınız var mı? <Link className='text-blue-500' to='/login'> Giriş Yap</Link> </p>
                                </div> 
                                <a target='_blank' href="http://localhost:3001/login">
                                    <div className='px-8 w-full py-2 bg-[#02e3e0] shadow hover:shadow-red-500/50 text-white rounded-md flex justify-center items-center gap-2 mb-3'>
                                            Satıcı Olarak Giriş Yap
                                    </div>
                                </a>

                                <a target='_blank' href="http://localhost:3001/register">
                                <div className='px-8 w-full py-2 bg-[#ad2cc4] shadow hover:shadow-red-500/50 text-white rounded-md flex justify-center items-center gap-2 mb-3'>
                                        Satıcı Olarak Kaydolun
                                </div>
                                </a>
                                
                            </div> 

                            <div className='w-full h-full py-4 pr-4'>
                                <img src="http://localhost:3000/images/login.jpg" alt="" />
                            </div>    

                        </div>
                    </div>
                </div>        
            
            <Footer/>
        </div>
    );
};

export default Register;
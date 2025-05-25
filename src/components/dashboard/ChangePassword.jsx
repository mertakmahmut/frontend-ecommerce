import React, { useEffect, useState } from 'react';
import { change_password, messageClear, user_reset } from '../../store/reducers/authReducer';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

const ChangePassword = () => {


    const {userInfo, loader, successMessage, errorMessage} = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const [passwordData , setPasswordData] = useState({
        email : userInfo.email,
        old_password : "",
        new_password : ""
    })

    const pinputhandle = (e) => {
        setPasswordData({
            ...passwordData,
            [e.target.name] : e.target.value
        })
    }

    const handlePasswordChange = (e) => {
        e.preventDefault()
        dispatch(change_password(passwordData))
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
    },[successMessage, errorMessage, dispatch])

    return (
        <div className='p-4 bg-white'>
            <h2 className='text-xl text-slate-600 pb-5'>Parolanızı Değiştirin </h2>
        
            <form onSubmit={handlePasswordChange}>
                <div className='flex flex-col gap-1 mb-2'>
                    <label htmlFor="old_password">Geçerli Parola</label>
                    <input value={passwordData.old_password} onChange={pinputhandle} className='outline-none px-3 py-1 border rounded-md text-slate-600' type="password" name="old_password" id="old_password"  placeholder='Geçerli Parola'/>
                </div>

                <div className='flex flex-col gap-1 mb-2'>
                    <label htmlFor="new_password">Yeni Parola</label>
                    <input onChange={pinputhandle} value={passwordData.new_password} className='outline-none px-3 py-1 border rounded-md text-slate-600' type="password" name="new_password" id="new_password"  placeholder='Yeni Parola'/>
                </div>

                <div className='flex flex-col gap-1 mb-2'>
                    <label htmlFor="confirm_password">Parolayı Yeniden Girin</label>
                    <input className='outline-none px-3 py-1 border rounded-md text-slate-600' type="password" name="confirm_password" id="confirm_password"  placeholder='Parolayı Yeniden Girin'/>
                </div>
                <div>
                    <button disabled = {loader} className='px-8 py-2 bg-[#059473] shadow-lg hover:shadow-green-500/30 text-white rounded-md'>{ loader ? 'Yükleniyor...' : 'Değişiklikleri Kaydet'} </button>
                </div>

            </form>

        </div>
    );
};

export default ChangePassword;
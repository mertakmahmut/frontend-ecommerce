import React, { useEffect } from 'react';
import Header from '../components/Header';
import Banner from '../components/Banner';
import Categories from '../components/Categories';
import FeatureProducts from '../components/products/FeatureProducts';
import Products from '../components/products/Products';
import Footer from '../components/Footer';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { get_products } from '../store/reducers/homeReducer';

const Home = () => {

    const dispatch = useDispatch()
    const { products, latest_product, topRated_product, discount_product} = useSelector(state => state.home)
    
    useEffect(() => {
        dispatch(get_products())
    }, [])

    return (
        <div className='w-full'>
            <Header/>
            <Banner/>
            <Categories />
            <div className='py-[45px]'>
                <FeatureProducts products = {products} />
            </div>
            <div className='py-10'>
                <div className='w-[85%] flex flex-wrap mx-auto'>
                    <div className='grid w-full grid-cols-3 md-lg:grid-cols-2 md:grid-cols-1 gap-7'>
                        <div className='overflow-hidden'>
                            <Products products = {latest_product} title='Son Eklenenler'/>

                        </div>
                        <div className='overflow-hidden'>
                            <Products products = {topRated_product} title='En Çok Beğenilenler'/>

                        </div>
                        <div className='overflow-hidden'>
                            <Products products = {discount_product} title='İndirimli Ürünler'/>

                        </div>

                    </div>

                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Home;
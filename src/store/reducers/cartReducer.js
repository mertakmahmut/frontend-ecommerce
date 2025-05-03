import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from '../../api/api';

export const add_to_cart = createAsyncThunk(
    'cart/add_to_cart',
    async(info, { rejectWithValue, fulfillWithValue}) => {
        try {
            const {data} = await api.post('/home/product/add-to-cart', info)
            console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const get_cart_products = createAsyncThunk(
    'cart/get_cart_products',
    async(userId, { rejectWithValue, fulfillWithValue}) => {
        try {
            const {data} = await api.get(`/home/product/get-cart-products/${userId}`)
            console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const cartReducer = createSlice({
    name : 'cart',
    initialState : {
        cart_products : [],
        cart_product_count : 0,
        wishlist_count : 0,
        wishlist : [],
        price : 0,
        errorMessage : '',
        successMessage : '',
        shipping_fee : 0,
        outofstock_products : []
    },
    reducers : {
        messageClear : (state, _) => {
            state.errorMessage = ""
            state.successMessage = ""
        }
    },
    extraReducers: (builder) => {
    builder
    .addCase(add_to_cart.rejected, (state, { payload }) => {
        state.errorMessage = payload.error;
    })
    .addCase(add_to_cart.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
        state.cart_product_count = state.cart_product_count + 1
    })
    }
})

export const {messageClear} = cartReducer.actions
export default cartReducer.reducer
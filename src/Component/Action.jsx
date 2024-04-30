import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const userLogin = createAsyncThunk(
  'post/userLogin',
  async (dataObject, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://18.118.43.220/boomAPI/boom/api/v1/user/login", dataObject);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
export const customerLogin = createAsyncThunk(
  "customer/customerLogin",
  async(dataObject,{rejectWithValue}) =>{
    try{
      const response = await axios.post("http://18.118.43.220/boomAPI/boom/api/v1/merchant",dataObject);
      return response.data;
    }catch(error){
      return rejectWithValue(error.response?.data?.message || error.message)
    }
  }
);

export const loginAction = createAsyncThunk(
  'login/loginAction',
  async (formData) => {
    try {
      const response = await axios.post('https://660fa052356b87a55c51d7aa.mockapi.io/user', formData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getAction = createAsyncThunk(
    "get/getAction", 
    async () => { 
      try {
        const response = await axios.get('https://660fa052356b87a55c51d7aa.mockapi.io/user');
        return response.data; 
      } catch (error) {
        throw error;
      }
    }
  );


  export const updateAction = createAsyncThunk(
    "update/updateAction", 
    async (formData) => {
      try {
        const response = await axios.put(`https://660fa052356b87a55c51d7aa.mockapi.io/user/${formData.id}`, formData);
        return response.data;
      } catch (error) {
        throw error; 
      }
    }
  );

  
  export const deleteAction = createAsyncThunk(
    "delete/deleteAction",
    async (userId) => {
      try {
        const response = await axios.delete(`https://660fa052356b87a55c51d7aa.mockapi.io/user/${userId}`);
        return response.data;
      } catch (error) {
        throw error;
      }
    }
  );
  
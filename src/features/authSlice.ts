import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { registerUserType, InitialSingleUserStateType, LoginUserType, UserType, ForgotEmailType } from '../customTypes/types';
import axios from 'axios';

//register users
export const registerUsers = createAsyncThunk('auth/registerUsers', async (user: registerUserType, thunkAPI) => {
  const API_URL = 'http://localhost:8000/api/sole-luxury/users/register-users';

  try {
    const response = await axios.post(API_URL, user);
    if(response.data){
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  }catch (error: any) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

//login user
export const login = createAsyncThunk('auth/loginUsers', async (user: LoginUserType, thunkAPI) => {
  const LOGIN_API_URL = 'http://localhost:8000/api/sole-luxury/users/login-user';

  try {
    const response = await axios.post(LOGIN_API_URL, user);

    if(response.data){
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  }catch (error: any) {
    console.log(error);
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

//forgot password
export const forgotPassword = createAsyncThunk('auth/forgotpassword', async(userEmail: ForgotEmailType, thunkAPI) => {
  const FORGOT_PASSWORD__API_URL = 'http://localhost:8000/api/sole-luxury/users/forgot-password';

  try{
    const response = await axios.post(FORGOT_PASSWORD__API_URL, userEmail);
    return response.data.message;
  }catch(error: any){
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

//user
const user = JSON.parse(`${localStorage.getItem('user')}`);
const initialState = {
  user: user ? user : null,
  isLoadingRegister: false,
  isSuccessRegister: false,
  isErrorRegister: false,
  isRegisterMessage: '',
  isLoadingLogin: false,
  isSuccessLogin: false,
  isErrorLogin: false,
  isLoginMessage: '',
  isLoadingForgotEmail: false,
  isSuccessForgotEmail: false,
  isErrorForgotEmail: false,
  isForgotEmailMessage: '',
} as InitialSingleUserStateType;

const authSlice = createSlice({
  name: 'AuthSlice',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoadingRegister = false;
      state.isSuccessRegister = false;
      state.isErrorRegister = false;
      state.isRegisterMessage = '';
      state.isLoadingLogin = false;
      state.isSuccessLogin = false;
      state.isErrorLogin = false;
      state.isLoginMessage = '';
      state.isLoadingForgotEmail = false;
      state.isSuccessForgotEmail = false;
      state.isErrorForgotEmail = false;
      state.isForgotEmailMessage = '';

    },
    logout: (state) => {
      localStorage.removeItem('user');
      state.user = null;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(registerUsers.pending, (state, _) => {
        state.isLoadingRegister = true;
      })
      .addCase(registerUsers.fulfilled, (state, action: PayloadAction<UserType>) => {
        state.isLoadingRegister = false;
        state.user = action.payload;
        state.isRegisterMessage = '';
        state.isErrorRegister = false;
        state.isSuccessRegister = true;
      })
      .addCase(registerUsers.rejected, (state, action) => {
        state.isLoadingRegister = false;
        state.user = null;
        state.isRegisterMessage = action.payload as string;
        state.isErrorRegister = true;
        state.isSuccessRegister = false;
      }).addCase(login.pending, (state, _) => {
        state.isLoadingLogin = true;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<UserType>) => {
        state.isLoadingLogin = false;
        state.user = action.payload;
        state.isLoginMessage = '';
        state.isErrorLogin = false;
        state.isSuccessLogin = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoadingLogin = false;
        state.isErrorLogin = true;
        state.isLoginMessage = action.payload as string;
        state.user = null;
      })
      .addCase(forgotPassword.pending, (state, _) => {
        state.isLoadingForgotEmail = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoadingForgotEmail = false;
        state.isErrorForgotEmail = false;
        state.isForgotEmailMessage = action.payload as string;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoadingForgotEmail = false;
        state.isErrorForgotEmail = true;
        state.isForgotEmailMessage = action.payload as string;
      })
  },  
});

export const { reset, logout } = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;

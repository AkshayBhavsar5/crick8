import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import axios from 'axios';
const BASE_URL = 'http://139.59.17.31:8088/api/v1/auth';

interface VerifyIdentityResponse {
  timeStamp: string;
  status: string;
  data: {
    validIdentity: boolean;
    uuid: string;
  };
}
interface User {
  id: number;
  email: string;
  phone: string;
  firstname: string;
  lastname: string;
  username: string;
  dob: string;
  profileImg: string;
  status: number;
  gender: string;
  orgId: number;
  roles: string;
}

interface LoginResponse {
  timeStamp: string;
  status: string;
  data: {
    tokenType: string;
    token: string;
    user: User;
  };
}
interface UserState {
  user: User | null;
  token: string | null;
  tokenType: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export const verifyIdentity = async (
  identity: string
): Promise<VerifyIdentityResponse> => {
  const response = await axios.post(`${BASE_URL}/identity/${identity}/verify`);
  return response.data;
};

export const loginUser = async (
  uuid: string,
  password: string
): Promise<LoginResponse> => {
  const response = await axios.post(`${BASE_URL}/login`, {
    uuid,
    password,
  });
  return response.data;
};

export const authenticateUser = createAsyncThunk(
  'user/authenticate',
  async (
    { identity, password }: { identity: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      // Step 1: Verify identity
      const verifyResponse = await verifyIdentity(identity);

      if (!verifyResponse.data.validIdentity) {
        throw new Error('Invalid identity');
      }
      // Step 2: Login with UUID
      const loginResponse = await loginUser(verifyResponse.data.uuid, password);

      // Store in localStorage
      localStorage.setItem('token', loginResponse.data.token);
      localStorage.setItem('tokenType', loginResponse.data.tokenType);
      localStorage.setItem('user', JSON.stringify(loginResponse.data.user));
      localStorage.setItem('roles', loginResponse.data.user.roles);

      return loginResponse.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState: UserState = {
  user: null,
  token: null,
  tokenType: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.tokenType = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('tokenType');
      localStorage.removeItem('user');
      localStorage.removeItem('roles');
    },
    loadUserFromStorage: (state) => {
      const token = localStorage.getItem('token');
      const tokenType = localStorage.getItem('tokenType');
      const userStr = localStorage.getItem('user');

      if (token && userStr) {
        state.token = token;
        state.tokenType = tokenType;
        state.user = JSON.parse(userStr);
        state.isAuthenticated = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.tokenType = action.payload.tokenType;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      });
  },
});
export const { logout, loadUserFromStorage } = userSlice.actions;
export default userSlice.reducer;

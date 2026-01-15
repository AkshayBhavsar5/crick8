import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://139.59.17.31:8088/api/v1';

// Create axios instance with interceptor for auth token
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Add token to all requests
axiosInstance.interceptors.request.use(
  (config) => {
    // Try multiple sources for token
    const token =
      localStorage.getItem('token') ||
      localStorage.getItem('authToken') ||
      localStorage.getItem('accessToken') ||
      sessionStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Tournament Interface
interface Tournament {
  id: number;
  userId: number;
  organizerName: string;
  orgId: number;
  tourName: string;
  startDate: string;
  endDate: string;
  regStartDate: string;
  regEndDate: string;
  participantType: string;
  invityType: string;
  tourType: string;
  tourGroup: number;
  numOfTeam: number;
  groundName: string;
  location: string;
  tourDescription: string;
  publish: number;
  fixturePublish: number;
  status: number;
  tourImage?: string;
  shortName: string;
  webAddress: string;
  feeAmount: string;
  contactName: string;
  teamBuilding: string;
  tshirtManagement: string;
}

// Live Match Interface
interface LiveMatch {
  matchDate: string;
  matchSummary: string;
  teamName2: string;
  matchName: string;
  matchType: string;
  teamOver1: string;
  teamName1: string;
  teamOver2: string;
  macthId: number;
  teamId1: number;
  tourName: string;
  groundName: string;
  teamId2: number;
  logoImg: string | null;
  teamLogo1: string;
  matchStatus: string;
  teamLogo2: string;
  teamScore2: string;
  teamScore1: string;
  tourId: number;
  location: string | null;
}

// API Response Interfaces
interface TournamentsResponse {
  timeStamp: string;
  status: string;
  data: Tournament[];
}

interface LiveMatchesResponse {
  timeStamp: string;
  status: string;
  data: LiveMatch[];
}

// Match State Interface
interface MatchState {
  tournaments: Tournament[];
  liveMatches: LiveMatch[];
  loading: boolean;
  liveMatchesLoading: boolean;
  error: string | null;
  liveMatchesError: string | null;
}

// Initial State
const initialState: MatchState = {
  tournaments: [],
  liveMatches: [],
  loading: false,
  liveMatchesLoading: false,
  error: null,
  liveMatchesError: null,
};

// Async Thunk to fetch tournaments
export const fetchTournaments = createAsyncThunk(
  'match/fetchTournaments',
  async (orgId: number, { rejectWithValue }) => {
    try {
      console.log('Fetching tournaments for orgId:', orgId);
      const response = await axiosInstance.get<TournamentsResponse>(
        `/org/${orgId}/tournaments/live`
      );
      console.log('Tournaments response:', response.data);
      return response.data.data;
    } catch (error: any) {
      console.error('Tournament fetch error:', error.response || error);
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch tournaments'
      );
    }
  }
);

// Async Thunk to fetch live matches
export const fetchLiveMatches = createAsyncThunk(
  'match/fetchLiveMatches',
  async (tId: number, { rejectWithValue }) => {
    try {
      console.log('Fetching live matches for tId:', tId);
      const response = await axiosInstance.get<LiveMatchesResponse>(
        `/scorer/t/${tId}/live-matches/details`
      );
      console.log('Live matches response:', response.data);
      return response.data.data;
    } catch (error: any) {
      console.error('Live matches fetch error:', error.response || error);
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch live matches'
      );
    }
  }
);

// Match Slice
const matchSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearLiveMatchesError: (state) => {
      state.liveMatchesError = null;
    },
    clearTournaments: (state) => {
      state.tournaments = [];
    },
    clearLiveMatches: (state) => {
      state.liveMatches = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Tournaments
      .addCase(fetchTournaments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTournaments.fulfilled, (state, action) => {
        state.loading = false;
        state.tournaments = action.payload;
      })
      .addCase(fetchTournaments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch Live Matches
      .addCase(fetchLiveMatches.pending, (state) => {
        state.liveMatchesLoading = true;
        state.liveMatchesError = null;
      })
      .addCase(fetchLiveMatches.fulfilled, (state, action) => {
        state.liveMatchesLoading = false;
        state.liveMatches = action.payload;
      })
      .addCase(fetchLiveMatches.rejected, (state, action) => {
        state.liveMatchesLoading = false;
        state.liveMatchesError = action.payload as string;
      });
  },
});

export const {
  clearError,
  clearLiveMatchesError,
  clearTournaments,
  clearLiveMatches,
} = matchSlice.actions;
export default matchSlice.reducer;

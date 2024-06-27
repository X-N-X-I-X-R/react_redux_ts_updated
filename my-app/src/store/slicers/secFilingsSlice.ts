import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Filing {
  length: number;
  map(arg0: (filing: { path: string; date: string; }, index: number) => import("react").JSX.Element): import("react").ReactNode;
  documents: string[] | null;
}

interface SecFilingsState {
  filings: Filing | null;
  loading: boolean;
  error: string | null;
}

export const fetchSecFilings = createAsyncThunk(
  'secFilings/fetchSecFilings',
  async ({ ticker, report_type, after_date, before_date }: { ticker: string, report_type: string, after_date: string, before_date: string }) => {
    try {
      const response = await axios.post('http://127.0.0.1:8004/secFillings/', {
        ticker,
        report_type,
        after_date,
        before_date
      });
      return response.data;
    } catch (error:any) {
      throw new Error(error.response?.data || 'Unknown error');
    }
  }
);

const initialState: SecFilingsState = {
  filings: null,
  loading: false,
  error: null,
};

const secFilingsSlice = createSlice({
  name: 'secFilings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSecFilings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSecFilings.fulfilled, (state, action) => {
        state.loading = false;
        state.filings = action.payload;
      })
      .addCase(fetchSecFilings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch SEC filings';
      });
  },
});

export default secFilingsSlice.reducer;

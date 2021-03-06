import {
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';

export interface Univ {
  domain: string[];
  webPages: string[];
  name: string;
  alphaTwoCode: string;
  country: string;
  stateProvince: string | null;
  comment: string | null;
}

const createUnivData = (json: Record<string, any>): Univ => ({
  domain: json.domain,
  webPages: json.web_pages,
  name: json.name,
  alphaTwoCode: json.alpha_two_code,
  country: json.country,
  stateProvince: json['state-province'],
  comment: '',
});

export interface UnivState {
  value: Univ[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
const initialState: UnivState = {
  value: [],
  status: 'idle',
  error: null,
};

export const addNewUniv = createAsyncThunk('univList/addNewUniv', async () => {
  const response = await fetch(
    'http://universities.hipolabs.com/search?country=United+States'
  );
  return response.json();
});

export const univListSlice = createSlice({
  name: 'univList',
  initialState,
  reducers: {
    editComment: {
      reducer(state, action: any) {
        state.value[action.payload.index] = {
          ...state.value[action.payload.index],
          comment: action.payload.content,
        };
      },
      prepare(index: number, content: string) {
        return {
          payload: {
            index,
            content,
          },
        };
      },
    },
    clearComment: (state) => {
      state.value = state.value.map((univ) => ({
        ...univ,
        comment: '',
      }));
    },
  },
  extraReducers: {
    [addNewUniv.pending as any]: (state) => {
      state.status = 'loading';
    },
    [addNewUniv.fulfilled as any]: (state, action) => {
      state.status = 'succeeded';
      state.value = action.payload
        .slice(0, 10)
        .map((el: any) => createUnivData(el));
    },
    [addNewUniv.rejected as any]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export default univListSlice.reducer;
export const { editComment, clearComment } = univListSlice.actions;

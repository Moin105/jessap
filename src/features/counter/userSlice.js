import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const userSlice = createSlice({
    name: 'user',
    initialState: { role: null,id:null },
    reducers: {
      setRole: (state, action) => {
        state.role = action.payload;
        console.log("role",state.role)
      },
      setEmployeeId: (state, action) => {
        state.role = action.payload;
        console.log("role",state.id)
      },
    },
  });
  
  export const { setRole,setEmployeeId } = userSlice.actions;
  
  export default userSlice;
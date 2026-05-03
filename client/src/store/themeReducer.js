import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   theme: "dark"
}

const themeReducer = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme: (state, action) => {
        state.theme = action.payload
    }
  }
});

export const {changeTheme} = themeReducer.actions

export default themeReducer.reducer
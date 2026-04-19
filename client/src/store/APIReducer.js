import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from "../api"

const initialState = {
    loading: false,
    movies: [],
    error: null
}

const APIReducer = createSlice({
    name: "API",
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(getMovies.pending, (state)=>{
            state.loading = true,
            state.error = null
        })
        builder.addCase(getMovies.rejected, (state, action)=>{
            state.loading = false
            state.error = action.error.message
        })
        builder.addCase(getMovies.fulfilled, (state, action)=>{
            state.loading = false
            state.movies = action.payload
        })
    }
});

export const getMovies = createAsyncThunk("api/getMovies", async (data) => {
    let response = await api.get("/movies", {
        params: data
    })
    return response.data
})

export const { } = APIReducer.actions

export default APIReducer.reducer
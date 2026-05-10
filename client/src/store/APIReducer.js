import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from "../api"

const initialState = {
    loading: false,
    movies: [],
    error: null,
    movie: {}
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
        builder.addCase(searchMovies.pending, (state)=>{
            state.loading = true,
            state.error = null
        })
        builder.addCase(searchMovies.rejected, (state, action)=>{
            state.loading = false
            state.error = action.error.message
        })
        builder.addCase(searchMovies.fulfilled, (state, action)=>{
            state.loading = false
            state.movies = action.payload
        })
        // get movie info
        builder.addCase(getMovieInfo.pending, (state)=>{
            state.loading = true,
            state.error = null
        })
        builder.addCase(getMovieInfo.rejected, (state, action)=>{
            state.loading = false
            state.error = action.error.message
        })
        builder.addCase(getMovieInfo.fulfilled, (state, action)=>{
            state.loading = false
            state.movie = action.payload
        })
    }
});

export const getMovies = createAsyncThunk("api/getMovies", async (data) => {
    let response = await api.get("/movies", {
        params: data
    })
    return response.data
})

export const searchMovies = createAsyncThunk("api/searchMovie", async (data)=>{
    let response = await api.get("/search", {params: data})
    return response.data
})

export const getMovieInfo = createAsyncThunk("api/getMovieInfo", async (data)=>{
    let response = await api.get("/movieinfo/" + data)
    return response.data
})

export const { } = APIReducer.actions

export default APIReducer.reducer
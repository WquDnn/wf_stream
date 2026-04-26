import { useEffect } from 'react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMovies } from '../store/APIReducer'
import { Grid } from '@mui/material'
import { Card, CardMedia, CardHeader} from '@mui/material'
import { Link } from 'react-router'

export default function Main() {

    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(getMovies({ limit: 10 }))
    }, [])
    let movies = useSelector((state) => state.api.movies)
    return <Grid container spacing={2} sx={{ p: 2 }}>
        {movies.map((movie, index) => (
           
            <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
                 <Link to={("/movie/" + movie.id)} style={{textDecoration: "none"}}>
                <Card>
                    <CardMedia component="img" image={"http://localhost:3000/" + movie.poster_url}></CardMedia>
                    <CardHeader title={movie.title} subheader={movie.genre}></CardHeader>
                </Card>
</Link>
            </Grid>
            
       ) )}

    </Grid>

}

import React from 'react'
import { Plyr } from "plyr-react"
import "plyr-react/plyr.css"
import { useParams } from "react-router"
import { styled, Box, Paper, Card, CardMedia, Typography, Divider } from "@mui/material"
import { useSelector, useDispatch } from "react-redux"
import { getMovieInfo } from '../store/APIReducer'
import { useEffect } from 'react'
import { useTranslation, Trans } from 'react-i18next'
export default function Movie() {
    let { id } = useParams()
    let { t } = useTranslation()
    let dispatch = useDispatch()
    useEffect(()=>{
           dispatch(getMovieInfo(id))
    }, [])

    let movie = useSelector( state=> state.api.movie)
    return (
        <Wrapper>
            <InfoBar>
                <CardMedia image="http://locallhost:3000/poster.webp" sx={{aspectRatio: "3/4"}}/>
                <Typography variant="body1">
                    {t("release_data")}: {new Date(movie.release_data).toLocaleDateString}
                </Typography>
                <Typography variant="body1">
                    IMDB: {movie.rating}
                </Typography>
                <Typography variant="body1">
                   <Trans>duration</Trans>:     {movie.duration}
                </Typography>
            </InfoBar>
            <PlayerWrapper>
                <Typography variant="h4">{movie.title}</Typography>
                <Typography varient="h6">{movie.year}</Typography>

            
            <Plyr source={{
                type: "video",
                sources: [
                    {
                        src: `http://localhost:3000/movies/${id}`
                    }
                ],
                poster: "http://localhost3000/posters/poster.jpg"

            }}
                options={{
                    controls: [
                        "play",
                        "progress",
                        "current-time",
                        "mute",
                        "volume",
                        "settings",
                        "fullscreen"
                    ]
                }}
            />
            </PlayerWrapper>
            <OtherInfo>
                <Typography variant="h4"><Trans>description</Trans></Typography>
                <Divider></Divider>
                <Typography variant="body1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur porro iste fugit facilis ullam ipsa! Totam, culpa reprehenderit suscipit ipsum dicta amet harum autem! Facere molestias nobis provident aliquam ad?
                </Typography>
            </OtherInfo>
        </Wrapper>
    )
}

let Wrapper = styled(Box)`
   display: grid;
   grid-template-columns: repeat(3, 1fr);
   margin: 2rem 0;
   gap: 1rem;

`

let InfoBar = styled(Card)`
    display: flex;
    flex-direction: column;
    padding: 1rem;
`

let PlayerWrapper = styled(Box)`
    grid-column: span 2;
`

let OtherInfo = styled(Paper)`
    padding:  1rem;
    grid-column: 1/-1;
`
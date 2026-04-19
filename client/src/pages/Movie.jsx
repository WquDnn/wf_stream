import React from 'react'
import { Plyr } from "plyr-react"
import "plyr-react/plyr.css"
import { useParams } from "react-router"

export default function Movie() {
    let { id } = useParams()
    return (
        <div>
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
        </div>
    )
}

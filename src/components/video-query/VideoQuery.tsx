import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import axios from "axios"

import "./VideoQuery.scss"
import Video, { VideoElement } from "./Video"

const baseUrl = "https://youtube.googleapis.com/youtube/v3"
const key = "AIzaSyC0NZkDiGxlxEKwLxiXxcFr1HUxILU3fuI"

interface VideoQueryProps {}

const VideoQuery: React.FC<VideoQueryProps> = () => {
    const [videos, setVideos] = useState<VideoElement[]>([])

    const { search } = useLocation()

    useEffect(() => {
        (async () => {
            const { data } = await axios.get(`${baseUrl}/search?maxResults=20&q=${search.split("=")[1]}&type=video&key=${key}`)

            const videosArr: VideoElement[] = []

            for(const item of data.items) {
                videosArr.push(<Video key={`video-id-${item.id.videoId}`} id={item.id.videoId} />)
            }

            setVideos(videosArr)
        })()
    }, [])

    return (
        <section>
            {videos}
        </section>
    )
}

export default VideoQuery
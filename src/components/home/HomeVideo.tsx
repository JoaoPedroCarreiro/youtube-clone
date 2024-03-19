import React, { useEffect, useState } from "react"
import axios from "axios"

import "./HomeVideo.scss"

import { viewsMini, timeAgo } from "converters"

const baseUrl = "https://youtube.googleapis.com/youtube/v3"
const key = "AIzaSyC0NZkDiGxlxEKwLxiXxcFr1HUxILU3fuI"

type IHomeVideo = {
    title: string,
    img: string,
    views: string,
    ago: string,
    channel: string,
    channelImg: string
}

interface HomeVideoProps {
    id: string
}

const HomeVideo: React.FC<HomeVideoProps> = ({ id }) => {
    const [video, setVideo] = useState<IHomeVideo | null>(null)

    useEffect(() => {
        (async () => {
            const videoRes = await axios.get(`${baseUrl}/videos?part=snippet&part=statistics&part=contentDetails&id=${id}&key=${key}`)
            const channelRes = await axios.get(`${baseUrl}/channels?part=snippet&id=${videoRes.data.items[0].snippet.channelId}&key=${key}`)

            const homeVideo: IHomeVideo = {
                title: videoRes.data.items[0].snippet.title,
                img: videoRes.data.items[0].snippet.thumbnails.medium.url,
                views: viewsMini(Number(videoRes.data.items[0].statistics.viewCount)),
                ago: timeAgo(new Date().getTime() - new Date(videoRes.data.items[0].snippet.publishedAt).getTime()),
                channel: channelRes.data.items[0].snippet.title,
                channelImg: channelRes.data.items[0].snippet.thumbnails.default.url,
            }

            setVideo(homeVideo)
        })()
    }, [id])

    return (
        <div className="home-video">
            {
                video ?
                    <>
                        <a className="home-video-img" href={`/watch?v=${id}`}><img src={video.img} alt={video.title} /></a>
                        <div className="home-video-info">
                            <a href="#" className="channel-img"><img src={video.channelImg} alt={video.channel} title={video.channel} /></a>
                            <div className="right">
                                <a href={`/watch?v=${id}`} title={video.title}><h2>{video.title}</h2></a>
                                <div className="channel-name">
                                    <a href="#">{video.channel}</a>
                                    <span>{video.channel}</span>
                                </div>
                                <a href={`/watch?v=${id}`}><span>{video.views} views</span><span style={{ margin: "0px 4px" }}>•</span><span>{video.ago}</span></a>
                            </div>
                        </div>
                    </>
                :
                    <>

                    </>
            }
        </div>
    )
}

export type HomeVideoElement = React.ReactElement<HomeVideoProps, React.FC<HomeVideoProps>>

export default HomeVideo
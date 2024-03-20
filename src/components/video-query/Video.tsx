import React, { useEffect, useState } from "react"
import axios from "axios"

import "./Video.scss"

import { viewsMini, timeAgo, duration } from "converters"

const baseUrl = "https://youtube.googleapis.com/youtube/v3"
const key = "AIzaSyC0NZkDiGxlxEKwLxiXxcFr1HUxILU3fuI"

type IVideo = {
    title: string,
    img: string,
    views: string,
    ago: string,
    duration: string,
    channel: string,
    channelImg: string,
    desc: string
}

interface VideoProps {
    id: string
}

const Video: React.FC<VideoProps> = ({ id }) => {
    const [video, setVideo] = useState<IVideo | null>(null)

    useEffect(() => {
        (async () => {
            const videoRes = await axios.get(`${baseUrl}/videos?part=snippet&part=statistics&part=contentDetails&id=${id}&key=${key}`)
            const channelRes = await axios.get(`${baseUrl}/channels?part=snippet&id=${videoRes.data.items[0].snippet.channelId}&key=${key}`)

            const videoItem: IVideo = {
                title: videoRes.data.items[0].snippet.title,
                img: videoRes.data.items[0].snippet.thumbnails.medium.url,
                views: viewsMini(Number(videoRes.data.items[0].statistics.viewCount)),
                ago: timeAgo(new Date().getTime() - new Date(videoRes.data.items[0].snippet.publishedAt).getTime()),
                duration: duration(videoRes.data.items[0].contentDetails.duration),
                channel: channelRes.data.items[0].snippet.title,
                channelImg: channelRes.data.items[0].snippet.thumbnails.default.url,
                desc: videoRes.data.items[0].snippet.description
            }

            setVideo(videoItem)
        })()
    }, [id])

    return (
        <div className="video">
            {
                video ?
                    <>
                        <a className="img-link" href={`/watch?v=${id}`}>
                            <img src={video.img} alt={video.title} />
                            <span>{video.duration}</span>
                        </a>
                        <div className="video-right">
                            <div className="video-info">
                                <a className="info-top" href={`/watch?v=${id}`}>
                                    <h2 title={video.title}>{video.title}</h2>
                                    <span>{video.views} views</span><span style={{ margin: "0px 4px" }}>•</span><span>{video.ago}</span>
                                </a>
                            </div>
                            <a href={`/watch?v=${id}`} className="channel">
                                <img src={video.channelImg} alt={video.channel} />
                                <span>
                                    {video.channel}
                                    <span>{video.channel}</span>
                                </span>
                            </a>
                            <a href={`/watch?v=${id}`} className="desc">
                                <p>{video.desc}</p>
                                <span>From the video description</span>
                            </a>
                        </div>
                    </> 
                :
                    <>
                        <div className="unload-img-link"></div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            <div className="unload-title"></div>
                            <div className="unload-info"></div>
                        </div>
                    </>
            }
        </div>
    )
}

export type VideoElement = React.ReactElement<VideoProps, React.FC<VideoProps>>

export default Video
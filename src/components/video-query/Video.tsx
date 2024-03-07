import React, { useEffect, useState } from "react"
import axios from "axios"

import "./Video.scss"

const baseUrl = "https://youtube.googleapis.com/youtube/v3"
const key = "AIzaSyC0NZkDiGxlxEKwLxiXxcFr1HUxILU3fuI"

function views(views: number): string {
    if(views >= 1000000) return (views / 1000000) < 10 ? `${(views / 1000000).toFixed(1)}M` : `${Math.floor((views / 1000000))}M`
    if(views >= 1000) return (views / 1000) < 10 ? `${(views / 1000).toFixed(1)}K` : `${Math.floor((views / 1000))}K`
    return `${views}`
}

function timeAgo(time: number): string {
    const arr: number[] = [1000, 60, 60, 24, 7, 4, 12]
    const ago: string[] = ["second", "minute", "hour", "day", "week", "month", "year"]

    let newTime: number = time
    let curAgo: string = ago[0]

    for(let i: number = 0; i <= 6; i++) {
        newTime *= 1 / arr[i]

        if(newTime <= 1) {
            newTime *= arr[i]
            break
        }

        curAgo = ago[i]
    }

    return `${Math.floor(newTime)} ${curAgo}${Math.floor(newTime) > 1 ? "s" : ""} ago`
}

type IVideo = {
    title: string,
    img: string,
    views: string,
    ago: string,
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

            console.log(videoRes.data.items[0].snippet)

            const videoItem: IVideo = {
                title: videoRes.data.items[0].snippet.title,
                img: videoRes.data.items[0].snippet.thumbnails.medium.url,
                views: views(Number(videoRes.data.items[0].statistics.viewCount)),
                ago: timeAgo(new Date().getTime() - new Date(videoRes.data.items[0].snippet.publishedAt).getTime()),
                channel: channelRes.data.items[0].snippet.title,
                channelImg: channelRes.data.items[0].snippet.thumbnails.default.url,
                desc: videoRes.data.items[0].snippet.description
            }

            setVideo(videoItem)
        })()
    }, [])

    return (
        <div className="video">
            {
                video ?
                    <>
                        <a className="img-link" href={`/watch?v=${id}`}><img src={video.img} alt={video.title} /></a>
                        <div className="video-right">
                            <div className="video-info">
                                <a className="info-top"  href={`/watch?v=${id}`}>
                                    <h2>{video.title}</h2>
                                    <span>{video.views} views</span><span style={{ margin: "0px 4px" }}>•</span><span>{video.ago}</span>
                                </a>
                            </div>
                            <a href="#" className="channel">
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
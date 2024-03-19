import React, { useEffect, useState, useRef } from "react"
import axios from "axios"
import { useLocation } from "react-router-dom"

import "./VideoWatch.scss"

import { viewsMini, timeAgo, normalDate, normalViews } from "converters"

import DescLink from "./DescLink"

const baseUrl = "https://youtube.googleapis.com/youtube/v3"
const key = "AIzaSyC0NZkDiGxlxEKwLxiXxcFr1HUxILU3fuI"

type IWatch = {
    title: string,
    views: string,
    normalViews: string,
    ago: string,
    date: string,
    likes: string,
    desc: React.ReactElement<any, any>[],
    thirdLineDesc: string,
    channel: string,
    channelImg: string,
    subs: string
}

interface VideoWatchProps {}

const VideoWatch: React.FC<VideoWatchProps> = () => {
    const preRef = useRef<HTMLPreElement | null>(null)
    const descRef = useRef<HTMLDivElement | null>(null)
    const moreRef = useRef<HTMLSpanElement | null>(null)
    const hideRef = useRef<HTMLButtonElement | null>(null)

    const [watch, setWatch] = useState<IWatch | null>(null)
    const [date, setDate] = useState<string | null>(null)
    const [views, setViews] = useState<string | null>(null)

    const { search } = useLocation()

    useEffect(() => {
        (async () => {
            const videoRes = await axios.get(`${baseUrl}/videos?part=snippet&part=statistics&part=contentDetails&id=${search.split("=")[1]}&key=${key}`)
            const channelRes = await axios.get(`${baseUrl}/channels?part=snippet&part=statistics&id=${videoRes.data.items[0].snippet.channelId}&key=${key}`)

            let description: string = videoRes.data.items[0].snippet.description

            const links: RegExpMatchArray[] = [...description.matchAll(/(http).+/g)]

            for(const item of links) {
                description = description.replace(item[0], "<link-find-unique-uckl9>")
            }
            
            description = description.replaceAll("#", "<link-find-unique-uckl9>#")

            const descriptionSplitted: string[] = description.split("<link-find-unique-uckl9>")

            const arr: React.ReactElement<any, any>[] = []

            for(let i: number = 0; i < descriptionSplitted.length; i++) {
                if(descriptionSplitted[i].startsWith("#")) {
                    arr.push(<a style={{ color: "#065fd4" }} key={`hashtag-${i}`} href="#">{descriptionSplitted[i]}</a>)
                    continue
                }

                arr.push(<span key={`span-desc-link-${i}`}>{descriptionSplitted[i]}</span>)
                if(links[i]) arr.push(<DescLink key={`desc-link-${i}`} href={links[i][0]} />)
            }

            const watchItem: IWatch = {
                title: videoRes.data.items[0].snippet.title,
                views: viewsMini(Number(videoRes.data.items[0].statistics.viewCount)),
                normalViews: normalViews(videoRes.data.items[0].statistics.viewCount),
                ago: timeAgo(new Date().getTime() - new Date(videoRes.data.items[0].snippet.publishedAt).getTime()),
                date: normalDate(videoRes.data.items[0].snippet.publishedAt),
                likes: viewsMini(videoRes.data.items[0].statistics.likeCount),
                desc: arr,
                thirdLineDesc: description.split("\n")[2].split("<link-find-unique-uckl9>")[0],
                channel: channelRes.data.items[0].snippet.title,
                channelImg: channelRes.data.items[0].snippet.thumbnails.default.url,
                subs: viewsMini(channelRes.data.items[0].statistics.subscriberCount, 2),
            }

            setWatch(watchItem)
            setDate(watchItem.ago)
            setViews(watchItem.views)
        })()
    }, [search])

    const showMoreDesc = (event: React.MouseEvent<HTMLPreElement>): void => {
        event.currentTarget.style.height = "100%"
        if(hideRef.current) hideRef.current.style.display = ""
        if(descRef.current) descRef.current.style.cursor = "auto"
        if(moreRef.current) moreRef.current.style.display = "none"

        if(watch) {
            setDate(watch.date)
            setViews(watch.normalViews)
        }
    }

    const hideDesc = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.currentTarget.style.display = "none"
        if(preRef.current) preRef.current.style.height = ""
        if(descRef.current) descRef.current.style.cursor = ""
        if(moreRef.current) moreRef.current.style.display = ""

        if(watch) {
            setDate(watch.ago)
            setViews(watch.views)
        }
    }

    return (
        <div id="video-watch">
            <iframe title="Video Watch" src={`https://www.youtube.com/embed/${search.split("=")[1]}?autoplay=1`} allow="autoplay" allowFullScreen></iframe>
            <div id="content">
                {
                    watch ? 
                        <>
                            <h1>{watch.title}</h1>
                            <div id="info">
                                <div id="channel">
                                    <div id="channel-img"><img src={watch.channelImg} alt={watch.title} /></div>
                                    <div id="channel-info">
                                        <a href="#">{watch.channel}</a>
                                        <p>{watch.subs} subscribers</p>
                                    </div>
                                </div>
                                <div id="left-info">
                                    <div id="likes-dislikes">
                                        <button className="low-hover-lighter" id="like" title="I like this">
                                            <svg style={{ transform: "rotateZ(180deg)" }} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false">
                                                <path d="M17,4h-1H6.57C5.5,4,4.59,4.67,4.38,5.61l-1.34,6C2.77,12.85,3.82,14,5.23,14h4.23l-1.52,4.94C7.62,19.97,8.46,21,9.62,21 c0.58,0,1.14-0.24,1.52-0.65L17,14h4V4H17z M10.4,19.67C10.21,19.88,9.92,20,9.62,20c-0.26,0-0.5-0.11-0.63-0.3 c-0.07-0.1-0.15-0.26-0.09-0.47l1.52-4.94l0.4-1.29H9.46H5.23c-0.41,0-0.8-0.17-1.03-0.46c-0.12-0.15-0.25-0.4-0.18-0.72l1.34-6 C5.46,5.35,5.97,5,6.57,5H16v8.61L10.4,19.67z M20,13h-3V5h3V13z"></path>
                                            </svg>
                                            <span>{watch.likes}</span>
                                        </button>
                                        <button className="low-hover-lighter" id="dislike" title="I dislike this">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false">
                                                <path d="M17,4h-1H6.57C5.5,4,4.59,4.67,4.38,5.61l-1.34,6C2.77,12.85,3.82,14,5.23,14h4.23l-1.52,4.94C7.62,19.97,8.46,21,9.62,21 c0.58,0,1.14-0.24,1.52-0.65L17,14h4V4H17z M10.4,19.67C10.21,19.88,9.92,20,9.62,20c-0.26,0-0.5-0.11-0.63-0.3 c-0.07-0.1-0.15-0.26-0.09-0.47l1.52-4.94l0.4-1.29H9.46H5.23c-0.41,0-0.8-0.17-1.03-0.46c-0.12-0.15-0.25-0.4-0.18-0.72l1.34-6 C5.46,5.35,5.97,5,6.57,5H16v8.61L10.4,19.67z M20,13h-3V5h3V13z"></path>
                                            </svg>
                                        </button>
                                    </div>
                                    <button id="video-share-button" className="low-hover-lighter default-btn">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false">
                                            <path d="M15 5.63 20.66 12 15 18.37V14h-1c-3.96 0-7.14 1-9.75 3.09 1.84-4.07 5.11-6.4 9.89-7.1l.86-.13V5.63M14 3v6C6.22 10.13 3.11 15.33 2 21c2.78-3.97 6.44-6 12-6v6l8-9-8-9z"></path>
                                        </svg>
                                        <span>Share</span>
                                    </button>
                                    <button id="video-download-button" className="low-hover-lighter default-btn">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false">
                                            <path d="M17 18v1H6v-1h11zm-.5-6.6-.7-.7-3.8 3.7V4h-1v10.4l-3.8-3.8-.7.7 5 5 5-4.9z"></path>
                                        </svg>
                                        <span>Download</span>
                                    </button>
                                    <button className="low-hover-lighter" id="more-left-info">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false">
                                            <path d="M7.5 12c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5zm4.5-1.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm6 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div ref={descRef} id="description">
                                <p id="desc-top">{views} views<span>&nbsp;&nbsp;</span>{date}</p>
                                <pre ref={preRef} onClick={showMoreDesc} id="desc-bottom">
                                    {watch.desc}
                                    <span ref={moreRef} id="more-desc">...more</span>
                                </pre>
                                <button style={{ display: "none" }} ref={hideRef} id="show-less" onClick={hideDesc}>Show less</button>
                            </div>
                        </>
                    :
                        <></>
                }
            </div>
        </div>
    )
}

export default VideoWatch
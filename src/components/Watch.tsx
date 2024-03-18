import React from "react"

import TopHead from "./top-head/TopHead"
import VideoWatch from "./video-watch/VideoWatch"

interface WatchProps {}

const Watch: React.FC<WatchProps> = () => {
    return (
        <>
            <TopHead />
            <VideoWatch />
        </>
    )
}

export default Watch
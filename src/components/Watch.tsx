import React from "react"

import TopHead from "./top-head/TopHead"
import VideoWatch from "./video-watch/VideoWatch"
import NavMenu from "./nav/NavMenu"

interface WatchProps {}

const Watch: React.FC<WatchProps> = () => {
    return (
        <>
            <TopHead />
            <VideoWatch />
            <NavMenu />
        </>
    )
}

export default Watch
import React, { useEffect } from "react"

import TopHead from "./top-head/TopHead"
import Nav from "./nav/Nav"
import VideoQuery from "./video-query/VideoQuery"

interface SearchProps {}

const Search: React.FC<SearchProps> = () => {
    return (
        <>
            <TopHead />
            <Nav />
            <VideoQuery />
        </>
    )
}

export default Search
import React from "react"
import { useLocation } from "react-router-dom"

import { normalizeString } from "converters"

import TopHead from "./top-head/TopHead"
import Nav from "./nav/Nav"
import VideoQuery from "./video-query/VideoQuery"

interface SearchProps {}

const Search: React.FC<SearchProps> = () => {
    const { search } = useLocation()

    document.title = normalizeString(search.split("=")[1]) + " - YouTube"

    return (
        <>
            <TopHead />
            <Nav />
            <VideoQuery />
        </>
    )
}

export default Search
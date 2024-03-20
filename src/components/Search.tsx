import React from "react"
import { useLocation } from "react-router-dom"

import { normalizeString } from "converters"

import TopHead from "./top-head/TopHead"
import Nav from "./nav/Nav"
import VideoQuery from "./video-query/VideoQuery"
import NavMenu from "./nav/NavMenu"
import TypesBar from "./types-bar/TypesBar"

interface SearchProps {}

const Search: React.FC<SearchProps> = () => {
    const { search } = useLocation()

    document.title = normalizeString(search.split("=")[1]) + " - YouTube"

    return (
        <>
            <TopHead />
            <Nav />
            <TypesBar />
            <VideoQuery />
            <NavMenu />
        </>
    )
}

export default Search
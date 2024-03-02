import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

import TopHead from "./top-head/TopHead"
import Nav from "./nav/Nav"

const key = "AIzaSyC0NZkDiGxlxEKwLxiXxcFr1HUxILU3fuI"

interface SearchProps {}

const Search: React.FC<SearchProps> = () => {
    const { search } = useLocation()

    useEffect(() => {
        (async () => {
            const data = await fetch(`https://youtube.googleapis.com/youtube/v3/search?q=${search.split("=")[1]}&key=${key}`).then(res => res.json())

            console.log(data)
        })()
    }, [])

    return (
        <>
            <TopHead />
            <Nav />
            <p>Search</p>
        </>
    )
}

export default Search
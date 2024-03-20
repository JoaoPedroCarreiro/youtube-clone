import React from "react"
import "./TypesBar.scss"

interface TypesBarProps {}

const TypesBar: React.FC<TypesBarProps> = () => {
    return (
        <div id="types-bar">
            <button className="low-hover-lighter selected">All</button>
            <button className="low-hover-lighter">Gaming</button>
            <button className="low-hover-lighter">Songs</button>
            <button className="low-hover-lighter">Mixes</button>
            <button className="low-hover-lighter">Shorts</button>
            <button className="low-hover-lighter">Videos</button>
            <button className="low-hover-lighter">News</button>
            <button className="low-hover-lighter">Live</button>
            <button className="low-hover-lighter">Recently uploaded</button>
            <button className="low-hover-lighter">Unwatched</button>
            <button className="low-hover-lighter">Watched</button>
            <button className="low-hover-lighter">New to you</button>
        </div>
    )
}

export default TypesBar
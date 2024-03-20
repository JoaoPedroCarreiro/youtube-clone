import React from "react"

import "./Home.scss"

import HomeVideo,{ HomeVideoElement } from "./HomeVideo"

const ids: string[] = ["RkZQRb7tZc4", "CveoG7k2KDQ", "CveoG7k2KDQ", "CveoG7k2KDQ", "CveoG7k2KDQ", "CveoG7k2KDQ"]

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
    const getVideos = (): HomeVideoElement[] => {
        const arr: HomeVideoElement[] = []

        for(const item of ids) {
            arr.push(<HomeVideo key={item} id={item} />)
        }

        return arr
    }

    return (
        <section id="videos-section">
            <div>
                {getVideos()}
            </div>
        </section>
    )
}

export default Home
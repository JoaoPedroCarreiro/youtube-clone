import React from "react"

import "./Home.scss"

import HomeVideo,{ HomeVideoElement } from "./HomeVideo"

const ids: string[] = ["rwL2bIadXxs", "LDB4uaJ87e0", "oTEiQx88B2U", "CveoG7k2KDQ", "IHZwWFHWa-w", "X3y8gQNZlVc"]

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
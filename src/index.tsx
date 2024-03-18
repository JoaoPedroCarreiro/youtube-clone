import React from "react"
import ReactDOM from "react-dom/client"
import App from "components/App"
import Search from "components/Search"
import Watch from "components/Watch"

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"

import "styles/low-hover.scss"

type IPaths = {
    [key: string]: React.ReactElement<any, any>
}

interface ValidateUrlProps {}

const ValidateUrl: React.FC<ValidateUrlProps> = () => {
    const { pathname, search } = useLocation()

    const paths: IPaths = {
        "/results?search_query=": <Search />,
        "/watch?v=": <Watch />
    }

    const start = (pathname + search).split("=")[0] + "="

    return Object.hasOwn(paths, start) ? <>{paths[start]}</> : <></>
}

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/">
                <Route index element={<App/>} />
                <Route path="/:path">
                    <Route index element={<ValidateUrl />} />
                </Route>
            </Route>
        </Routes>
    </BrowserRouter>
)
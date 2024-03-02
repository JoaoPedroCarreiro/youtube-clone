import React from "react"
import ReactDOM from "react-dom/client"
import App from "components/App"
import Search from "components/Search"

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"

import "styles/low-hover.scss"

interface ValidateUrlProps {
    children: React.ReactNode
}

const ValidateUrl: React.FC<ValidateUrlProps> = ({ children }) => {
    const { pathname, search } = useLocation()

    return (pathname + search).startsWith("/results?search_query") ? <>{children}</> : <></>
}

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/">
                <Route index element={<App/>} />
                <Route path=":query">
                    <Route index element={<ValidateUrl><Search /></ValidateUrl>} />
                </Route>
            </Route>
        </Routes>
    </BrowserRouter>
)
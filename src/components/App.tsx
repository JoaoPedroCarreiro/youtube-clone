import "./App.scss"
import "styles/low-hover.scss"

import TopHead from "./top-head/TopHead"
import Nav from "./nav/Nav"

export default function App() {
    return (
        <div id="app">
            <TopHead />
            <Nav />
        </div>
    )
}
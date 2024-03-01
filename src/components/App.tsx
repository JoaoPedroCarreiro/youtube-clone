import "./App.scss"
import "styles/low-hover.scss"

import TopHead from "./top-head/TopHead"
import Nav from "./nav/Nav"

interface AppProps {}

const App: React.FC<AppProps> = () => {
    return (
        <div id="app">
            <TopHead />
            <Nav />
        </div>
    )
}

export default App
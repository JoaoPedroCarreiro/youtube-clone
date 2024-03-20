import TopHead from "./top-head/TopHead"
import Nav from "./nav/Nav"
import NavMenu from "./nav/NavMenu"
import Home from "./home/Home"
import TypesBar from "./types-bar/TypesBar"

interface AppProps {}

const App: React.FC<AppProps> = () => {
    document.body.toggleAttribute("home")

    return (
        <>
            <TopHead />
            <Nav />
            <TypesBar />
            <Home />
            <NavMenu />
        </>
    )
}

export default App
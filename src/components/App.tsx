import TopHead from "./top-head/TopHead"
import Nav from "./nav/Nav"
import NavMenu from "./nav/NavMenu"
import Home from "./home/Home"

interface AppProps {}

const App: React.FC<AppProps> = () => {
    document.body.toggleAttribute("home")

    return (
        <>
            <TopHead />
            <Nav />
            <Home />
            <NavMenu />
        </>
    )
}

export default App
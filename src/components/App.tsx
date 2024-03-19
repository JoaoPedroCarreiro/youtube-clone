import TopHead from "./top-head/TopHead"
import Nav from "./nav/Nav"
import NavMenu from "./nav/NavMenu"

interface AppProps {}

const App: React.FC<AppProps> = () => {
    document.body.toggleAttribute("home")

    return (
        <>
            <TopHead />
            <Nav />
            <NavMenu />
        </>
    )
}

export default App
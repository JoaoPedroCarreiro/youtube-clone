import TopHead from "./top-head/TopHead"
import Nav from "./nav/Nav"

interface AppProps {}

const App: React.FC<AppProps> = () => {
    document.body.toggleAttribute("home")

    return (
        <>
            <TopHead />
            <Nav />
        </>
    )
}

export default App
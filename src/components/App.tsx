import TopHead from "./top-head/TopHead"
import Nav from "./nav/Nav"

interface AppProps {}

const App: React.FC<AppProps> = () => {
    return (
        <>
            <TopHead />
            <Nav />
        </>
    )
}

export default App
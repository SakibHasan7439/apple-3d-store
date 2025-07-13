import Features from "./Components/Features/Features"
import Hero from "./Components/Hero/Hero"
import Highlight from "./Components/Highlight/Highlight"
import Models from "./Components/Models/Models"
import Navbar from "./Components/Navbar/Navbar"
import * as Sentry from "@sentry/react"

// eslint-disable-next-line react-refresh/only-export-components
function App() {
  return (
    <main>
        {/* navbar */}
        <Navbar />
        {/* hero */}
        <Hero />
        {/* highlighted */}
        <Highlight />
        {/* model */}
        <Models />
        {/* features */}
        <Features />
    </main>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export default Sentry.withProfiler(App)

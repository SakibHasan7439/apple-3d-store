import Hero from "./Components/Hero/Hero"
import Highlight from "./Components/Highlight/Highlight"
import Navbar from "./Components/Navbar/Navbar"

function App() {

  return (
    <main>
        {/* navbar */}
        <Navbar />
        {/* hero */}
        <Hero />
        {/* highlighted */}
        <Highlight />
    </main>
  )
}

export default App

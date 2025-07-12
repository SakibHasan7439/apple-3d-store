import Hero from "./Components/Hero/Hero"
import Highlight from "./Components/Highlight/Highlight"
import Models from "./Components/Models/Models"
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
        {/* model */}
        <Models />
    </main>
  )
}

export default App

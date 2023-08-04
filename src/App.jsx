import { BrowserRouter } from "react-router-dom"
import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, StarsCanvas } from "./components"
import { Route, Routes } from "react-router-dom";
import { Login, Signup } from "./pages";
import Home from "./pages/Home";
import UpdateProfile from "./pages/Update";
import PublicProfile from "./pages/PublicProfile";
import AnimatedCursor from "react-animated-cursor"


const App = () => {
  return (
    <BrowserRouter>

            <Routes>
              
        <Route path="/:userId" element={<PublicProfile />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/update" element={<UpdateProfile />} />
      </Routes>

      <AnimatedCursor
  innerSize={4}
  outerSize={25}
  innerScale={1}
  outerScale={2}
  outerAlpha={0}
  hasBlendMode={true}
  innerStyle={{
    backgroundColor: 'white'
  }}
  outerStyle={{
    border: '1px solid white'
  }}
  trailingSpeed={7}
  showSystemCursor={true}
/>

    </BrowserRouter>
  )
}

export default App

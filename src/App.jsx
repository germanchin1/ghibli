import { NavLink, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Characters from './pages/Characters.jsx'
import Contact from './pages/Contact.jsx'
import Game from './pages/Game.jsx'
import FilmDetail from './pages/FilmDetail.jsx' // NUEVO
export default function App() {
 return (
 <>
 <header>
 <nav>
 <NavLink to="/">Home</NavLink>
 <NavLink to="/characters">Characters</NavLink>
 <NavLink to="/contact">Contact</NavLink>
 <NavLink to="/game">Game</NavLink>
 </nav>
 </header>
 <Routes>
 <Route path="/" element={<Home />} />
 <Route path="/characters" element={<Characters />} />
 {/* Ruta dinámica: :id */}
 <Route path="/characters/:id" element={<FilmDetail />} />
 <Route path="/contact" element={<Contact />} />
 <Route path="/game" element={<Game />} />
 </Routes>
 </>
 )
}
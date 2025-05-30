import { Route, Routes } from 'react-router';
import Nav from './components/Nav';
import BaseLevel from './pages/BaseLevel';
import JamMaster from './pages/JamMaster';
import Maestro from './pages/Maestro';
import Virtuoso from './pages/Virtuoso';
import PokemonDetails from './pages/PokemonDetails';

function App() {
  return (
    <div className="bg-primary-subtle">
      <div className="d-flex flex-column">
        <Nav />
        <div className="container">
          <div style={{ maxWidth: 475 }}>
            <Routes>
              <Route path="/" element={<Virtuoso />} />
              <Route path="/base" element={<BaseLevel />} />
              <Route path="/jam" element={<JamMaster />} />
              <Route path="/maestro" element={<Maestro />} />
              <Route path="/pokemon/:id" element={<PokemonDetails />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

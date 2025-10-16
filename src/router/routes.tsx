import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Habitos from '../pages/Habitos';
import Planner from '../pages/Planner';
import Sobre from '../pages/Sobre';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/habitos" element={<Habitos />} />
        <Route path="/planner" element={<Planner />} />
        <Route path="/sobre" element={<Sobre />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;

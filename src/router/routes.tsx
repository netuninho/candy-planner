import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Habitos from '../pages/Habitos';
import Planner from '../pages/Planner';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/habitos" element={<Habitos />} />
        <Route path="/planner" element={<Planner />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Habitos from '../pages/Habitos';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/habitos" element={<Habitos />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;

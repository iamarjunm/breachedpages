import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Error505Page from "./pages/Error505Page";
import SecretLink from "./pages/SecretLink";
import DivineStatic from "./pages/DivineStatic";
import SecretMessage from "./pages/SecretMessage";
import ChessMoves from "./pages/ChessMoves";
import SilentHorror from "./pages/SilentHorror";
import Dome from "./pages/home"

const Home = () => (
  <>
  <Dome />
  </>
);


function App() {
  return (
    <Router>
      <main className="min-h-screen bg-white dark:bg-ieee-dark transition-colors duration-300">
          <Routes>
           <Route path="/" element={<Home />} />
            <Route path="/error" element={<div><Error505Page/></div>} />
            <Route path="/secret" element={<div><SecretLink/></div>} />
            <Route path="/divine" element={<div><DivineStatic/></div>} />
            <Route path="/message" element={<div><SecretMessage/></div>} />
            <Route path="/chess" element={<div><ChessMoves/></div>} />
            <Route path="/silent" element={<div><SilentHorror/></div>} />
          </Routes>
      </main>
    </Router>
  );
}

export default App;

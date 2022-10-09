import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Clock from "./components/Clock";
import Nav from "./components/Nav";
import Todos from "./components/Todos";

function App() {
    return (
        <div>
            <Router>
                <Nav />
                <Routes>
                    <Route path="/" element={<Clock />} />
                    <Route path="/todos" element={<Todos />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;

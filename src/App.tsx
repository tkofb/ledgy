import Home from "./pages/Home/Home";
import LoginOrCreate from "./pages/LoginOrCreate/LoginOrCreate";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  return (
    <main>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginOrCreate state="login" />} />
          <Route path="/createAccount" element={<LoginOrCreate state="create"/>} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;

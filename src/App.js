import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import AllTransaction from "./pages/AllTransaction";
import Layout from "./components/Layout";
function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/alltransaction' element={<AllTransaction />} />
          <Route />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

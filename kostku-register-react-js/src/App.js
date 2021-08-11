// import logo from "./logo.svg";
import "./App.css";
import Logo from "./assets/svg/randomsvg.svg";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { TestPage } from "./pages";
import { DetailKost, DetailKelas } from "./pages/HalamanDetail";
import { MainForm } from "./pages/FormDaftar";
import { Link } from "react-router-dom";
import { CobaCrop } from "./pages";

function App() {
  return (
    <div className="pb-10 min-h-screen bg-gray-200">
      {/* <div>
        <div class="sticky top-0 ...">Fixed child</div>
        Scroll me! Lorem ipsum...
      </div> */}
      <Router>
        <header className="sticky top-0 mb-3 border-b p-3 flex w-full items-center z-40 bg-blue-400">
          <Link to="/" className="text-white text-2xl mx-auto">
            KostKu
          </Link>
        </header>
        <div className="pl-3 pr-3">
          <Switch>
            <Route exact path="/">
              <TestPage />
              {/* <CobaCrop /> */}
            </Route>
            <Route exact path="/infokost/:id_kost">
              <DetailKost />
            </Route>

            <Route exact path="/detail-kelas/:id_kelas">
              <DetailKelas />
            </Route>

            <Route exact path="/daftar-kamar/:id_kelas/:id_kamar">
              <MainForm />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;

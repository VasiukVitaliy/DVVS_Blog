import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListMessages from "./ListMessages";
import Writter from "./Writer";
import LogRegWindow from "./LogRegWindow";
import LoginForm from "./Login";
import RegisterForm from "./Registration";
import NavBar from "./NavBar";
import "./App.css";
import { useState } from "react";

function App() {
  const [auth, setAuth] = useState(!!localStorage.getItem("token"))
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="min-h-[200px] w-full flex flex-col items-center justify-center p-6 border-1">
                <header className="mb-10 text-center">
                  <h1 className="text-4xl font-bold text-gray-800 drop-shadow-md">
                    Вітаю на моєму блозі(Васюк Віталій ФЕІ-32)
                  </h1>
                </header>
              </div>
              <ListMessages />
              <Writter />
            </>
          }
        />
        <Route path="/login" element={<LogRegWindow 
          Element={<><NavBar/>< LoginForm/></>}/>} />
        <Route path="/registration" element={<LogRegWindow 
          Element={<><NavBar/>< RegisterForm/></>}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

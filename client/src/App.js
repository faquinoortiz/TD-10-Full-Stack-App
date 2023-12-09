import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import UserContext from "./context/UserContext";
import Header from "./components/Header";
import UserSignIn from "./components/UserSignIn"; 
import UserSignUp from "./components/UserSignUp"; 
import UserSignOut from "./components/UserSignOut";

function App() {
  const [user, setUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [accentColor, setAccentColor] = useState("#63537d");
  const [fontPercentage, setFontPercentage] = useState(100);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    document.body.style.fontSize = `${fontPercentage}%`;
  }, [isDarkMode, fontPercentage]);

  const signInUser = (username, password) => {
    const newUser = {
      username,
      password,
    };
    setUser(newUser);
  };

  const signOutUser = () => {
    setUser(null);
  };

  const toggleDarkMode = () => {
    setIsDarkMode((currentMode) => !currentMode);
  };

  return (
    <div>
      <div id="root">
        <UserContext.Provider value={{ user, signInUser, signOutUser }}>
          <Header
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
            accentColor={accentColor}
            setAccentColor={setAccentColor}
            fontPercentage={fontPercentage}
            setFontPercentage={setFontPercentage}
          />
          {/* Your Routes go here */}
          <Routes>
            <Route path="/signin" element={<UserSignIn />} />
            <Route path="/signup" element={<UserSignUp />} />
            <Route path="/signout" element={<UserSignOut />} />
            
          </Routes>
        </UserContext.Provider>
      </div>
    </div>
  );
}

export default App;
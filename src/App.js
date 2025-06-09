import React, { useState } from "react";
import Login from "./Login";
import PokemonWebsite from "./PokemonWebsite";

export default function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (username) => {
    setUser(username);
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return <PokemonWebsite />;
}




  
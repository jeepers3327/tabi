import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import SplashPage from "./pages/Splash";
import LobbyPage from "./pages/Lobby";
import { Route, Switch } from "react-router-dom";
import { SocketProvider } from "./contexts/SocketContext";

function App() {
  return (
    <ChakraProvider>
      <SocketProvider wsUrl={import.meta.env.VITE_WS_URL}>
        <Switch>
          <Route path="/" exact component={SplashPage} />
          <Route path="/chat" exact component={LobbyPage} />
        </Switch>
      </SocketProvider>
    </ChakraProvider>
  );
}

export default App;

import React from "react";
import { createContext, FunctionComponent, useEffect } from "react";
import { Socket } from "phoenix";

type SocketContextProps = Socket | null;

interface SocketProviderProps {
  wsUrl: string;
  children: React.ReactNode;
}

export const SocketContext = createContext<SocketContextProps>(null);

export const SocketProvider: FunctionComponent<SocketProviderProps> = ({
  wsUrl,
  children,
}) => {
  const socket = new Socket(wsUrl);

  useEffect(() => {
    if (!socket !== null || !socket.isConnected) {
      socket.connect();
    }

    return () => {
      socket.disconnect();
    };
  }, [socket, wsUrl]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

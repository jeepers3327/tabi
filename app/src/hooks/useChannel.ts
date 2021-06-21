import React, { useContext, useEffect, useState } from "react";
import { Presence, Socket } from "phoenix";
import { SocketContext } from "../contexts/SocketContext";
import { UserState } from "../store/user";

const useChannel = (
  channelTopic: string,
  onMessage: (event: any, payload: any) => void,
  user: UserState
) => {
  const socket = useContext(SocketContext);
  const [broadcast, setBroadcast] = useState<
    (eventName: string, payload: object) => void
  >(mustJoinChannelWarning);

  const [presence, setPresence] = useState<Presence>();

  useEffect(() => {
    let doCleanup: () => void = () => null;
    if (socket != null) {
      doCleanup = joinChannel(
        socket,
        channelTopic,
        user,
        onMessage,
        setBroadcast,
        setPresence
      );
    }
    return doCleanup;
  }, [channelTopic, onMessage, socket, user]);

  return { broadcast, presence };
};

const joinChannel = (
  socket: Socket,
  channelTopic: string,
  user: UserState,
  onMessage: (event: any, payload: any) => void,
  setBroadcast: React.Dispatch<
    React.SetStateAction<(eventName: string, payload: object) => void>
  >,
  setPresence: React.Dispatch<React.SetStateAction<Presence | undefined>>
) => {
  const channel = socket.channel(channelTopic, {
    client: "browser",
    id: user.id,
  });

  const presence = new Presence(channel);
  setPresence(presence);

  channel.onMessage = (event, payload) => {
    // I don't think the chan_reply_ events are needed - always duplicates of phx_reply?
    if (event != null && !event.startsWith("chan_reply_")) {
      onMessage(event, payload);
    }

    // Return the payload since we're using the
    // special onMessage hook
    return payload;
  };

  channel
    .join()
    .receive(
      "ok",
      ({ messages }) => null
      //console.log("successfully joined channel", messages || "")
    )
    .receive("error", ({ reason }) =>
      console.error("failed to join channel", reason)
    );

  setBroadcast(
    (_oldstate: any) => (eventName: string, payload: object) =>
      channel.push(eventName, payload)
  );

  return () => {
    channel.leave();
  };
};

const mustJoinChannelWarning =
  (_oldstate: any) => (_eventName: string, _payload: object) =>
    console.error(
      `useChannel broadcast function cannot be invoked before the channel has been joined`
    );

export default useChannel;

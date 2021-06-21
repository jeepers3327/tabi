import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  List,
  ListItem,
  Spacer,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Redirect } from "react-router-dom";

import Header from "../components/Header";
import useChannel from "../hooks/useChannel";
import { useAppSelector } from "../store";

interface Message {
  id: string;
  nickname: string;
  message: string;
}

interface Meta {
  id: string;
  nickname: string;
}

const LobbyPage = () => {
  const user = useAppSelector((state) => state.users);
  const [users, setUsers] = useState<Meta[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState("");

  const ref = useRef<HTMLUListElement>(null);

  const onChannelMessage = useCallback((event, payload) => {
    if (event === "list_messages") {
      setMessages(payload.messages);
    } else if (event === "message_created") {
      setMessages((prevMessages) => {
        return [...prevMessages, payload];
      });
      if (ref.current) {
        ref.current.scrollTop = ref.current.scrollHeight;
      }
    }
  }, []);

  const { broadcast, presence } = useChannel(
    "room:lobby",
    onChannelMessage,
    user
  );

  const sendNewMessage = () => {
    broadcast("create_message", { message: messageText });
    setMessageText("");
  };

  const currentOnlineUsers = (presences: any[]) => {
    const users: Meta[] = [];

    presences.map(({ metas: [meta, ...rest] }) => {
      users.push({ id: meta.id, nickname: meta.nickname });
    });

    setUsers(users);
  };

  useEffect(() => {
    if (presence) {
      presence.onSync(() => {
        currentOnlineUsers(presence.list());
      });
    }
  }, [presence]);

  if (user.isLoading) return null;

  if (!user.isLoading && !user.isAuthenticated) {
    return <Redirect to={{ pathname: "/" }} />;
  }

  return (
    <Fragment>
      <Header />
      <Box
        width={["xs", "lg", "3xl", "4xl", "8xl"]}
        padding={[5, 10]}
        marginX="auto"
      >
        <Flex
          height={["full", "2xl", "3xl", "4xl", "5xl"]}
          direction={["column", "column", "row"]}
          gap="10%"
        >
          <VStack
            border="1px"
            borderColor="gray.300"
            alignItems="start"
            flex={["10", "7", "8"]}
          >
            <List
              height={["xl", "2xl", "3xl", "4xl", "5xl"]}
              overflow="auto"
              style={{ scrollbarWidth: "thin" }}
              spacing={1}
              padding="5"
              width="100%"
              ref={ref}
            >
              {messages &&
                messages.map((message) => {
                  return (
                    <ListItem key={message.id}>
                      <Text wordBreak="break-word" fontSize="lg">
                        {message.nickname} : {message.message}
                      </Text>
                    </ListItem>
                  );
                })}
            </List>

            <Stack marginTop="1" direction={["column", "row"]} width="100%">
              <Input
                size={"md"}
                value={messageText}
                onChange={(event) => setMessageText(event.target.value)}
              />
              <Button colorScheme="green" onClick={sendNewMessage}>
                Send message
              </Button>
            </Stack>
          </VStack>
          <Spacer />

          <Box
            width={["xs", "lg", "3xl", "4xl", "8xl"]}
            flex={["2", "3", "3"]}
            marginTop={["10", "10", "0", "0"]}
            marginBottom={["10", "10", "0", "0"]}
          >
            <Heading
              fontSize={["lg", "xl", "2xl", "3xl"]}
              textDecoration="underline"
            >
              Online users
            </Heading>
            <List
              height={["lg", "xl", "2xl", "3xl", "4xl", "5xl"]}
              style={{ scrollbarWidth: "thin" }}
              overflow="auto"
              spacing={1}
            >
              {users &&
                users.map((user) => {
                  return (
                    <ListItem key={user.id}>
                      <Text fontSize="lg">{user.nickname}</Text>
                    </ListItem>
                  );
                })}
            </List>
          </Box>
        </Flex>
      </Box>
    </Fragment>
  );
};

export default LobbyPage;

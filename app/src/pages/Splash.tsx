import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import { useAppDispatch } from "../store";
import { setUserData } from "../store/user";

const SplashPage = () => {
  const [nickname, setNickname] = useState("");
  const { isAuthenticated, isLoading } = useAuth();
  const dispatch = useAppDispatch();

  const joinChat = async () => {
    if (!nickname) {
      alert("Please enter a nickname!");
      return false;
    }
    await fetch(`${import.meta.env.VITE_API_URL}/registration`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({ nickname }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          return response.json();
        } else {
          throw Error(response.statusText);
        }
      })
      .then((data) => {
        dispatch(setUserData(data));
        localStorage.setItem("token", data.token);
      })
      .catch((error) => {
        alert(error);
      });
  };

  if (isLoading) return null;

  if (!isLoading && isAuthenticated) {
    return <Redirect to={{ pathname: "/chat" }} />;
  }

  return (
    <Box>
      <Heading padding="5" marginTop="10" size="4xl" textAlign="center">
        Tabi
      </Heading>
      <Center>
        <VStack padding="10" spacing="5" width="md">
          <FormControl id="nickname">
            <FormLabel>Nickname</FormLabel>
            <Input
              type="text"
              onChange={(event) => setNickname(event.target.value)}
            />
          </FormControl>
          <Button onClick={joinChat} colorScheme="blue" isFullWidth>
            Join
          </Button>
        </VStack>
      </Center>
    </Box>
  );
};

export default SplashPage;

import { Button, Flex, Heading, HStack } from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../store";
import { removeUserData } from "../store/user";

const Header = () => {
  const history = useHistory();
  const user = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  const logoutUser = async () => {
    dispatch(removeUserData());
    localStorage.removeItem("token");
    history.push("/");
  };

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="blue.500"
      color="white"
    >
      <Flex align="center" width={{ base: "100%", md: "auto" }}>
        <Heading size="xl">Tabi</Heading>
      </Flex>

      <HStack spacing={4}>
        <Heading size="md">Logged in as: {user.nickname}</Heading>
        <Button onClick={logoutUser} colorScheme="facebook">
          Logout
        </Button>
      </HStack>
    </Flex>
  );
};

export default Header;

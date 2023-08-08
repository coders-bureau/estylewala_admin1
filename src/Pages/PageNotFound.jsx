import {
  Box,
  Text,
  Button,
  Link,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import imgerror from "../Assets/ErrorNew500.jpg";

export default function PageNotFound() {
  const navigate = useNavigate();
  return (
    <>
      <Box mt={"70px"} textAlign="center" py={10} px={6}>
        <img
          style={{ widows: "40%", height: "400px", margin: "auto" }}
          src={imgerror}
          alt="Error500"
        />
        <Text
          fontSize="40px"
          backgroundClip="text"
          mt={3}
          mb={2}
          bgGradient="linear( red, #2b3148)"
        >
          We couldn't find any matches!
        </Text>
        <Text
          color={"gray.500"}
          bgGradient="linear( #08cf65, #2b3148)"
          backgroundClip="text"
          mb={6}
        >
          Please check the spelling or try searching something else
        </Text>
        <Link
          to="/"
          _hover={{
            textDecoration: "none",
          }}
        >
          {" "}
          <Button
            onClick={() => navigate("/")}
            padding="24px"
            style={{ fontSize: "17px" }}
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bg={"blue.400"}
            _hover={{
              bg: "red.300",
              textDecoration: "none",
            }}
          >
            Home
          </Button>
        </Link>
      </Box>
    </>
  );
}

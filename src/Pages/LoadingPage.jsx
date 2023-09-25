import { Box, Image } from "@chakra-ui/react";
import React from "react";
import loading from "../Assets/loading.gif";
const LoadingPage = () => {
  return (
    <div>
      <Box
      borderRadius={100}
        boxShadow={
          "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em"
        }
        position={"fixed"}
        top={{ lg: "50%", md: "50%", base: "30%" }}
        left={{ lg: "55%", md: "55%", base: "50%" }}
        transform={"translate(-50% , -50%)"}
      >
        <Image
          w={"50px"}
          m={"auto"}
          align={"center"}
          src={loading}
          alt="loading"
        />
      </Box>
    </div>
  );
};

export default LoadingPage;

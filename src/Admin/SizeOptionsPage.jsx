import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
  VStack,
  HStack,
  Text,
  FormControl,
  FormLabel,
  InputGroup,
  Box,
  Stack,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
import LoadingPage from "../Pages/LoadingPage";
import GSTManager from "./GSTManager";

const SizeOptions = () => {
  //   const [sizeOptions, setSizeOptions] = useState({});
  const [editingOptions, setEditingOptions] = useState({});
  const [newSizes, setNewSizes] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const toast = useToast();
  const [gstValues, setGstValues] = useState([]);
  const [newValue, setNewValue] = useState("");

  console.log(editingOptions, newSizes);
  // Fetch size options on component mount
  useEffect(() => {
    fetchSizeOptions();
    fetchGSTValues();
  }, []);

  const fetchSizeOptions = () => {
    setisLoading(true);
    axios
      .get(`${process.env.REACT_APP_BASE_API}/size/size-options`)
      .then((response) => {
        // setSizeOptions(response.data);
        setEditingOptions(response.data);
        setisLoading(false);
      })
      .catch((error) => {
        setisLoading(false);

        console.error("Error fetching size options:", error);
      });
  };

  const handleNewSizeChange = (category, value) => {
    setNewSizes((prevSizes) => ({
      ...prevSizes,
      [category]: value,
    }));
  };

  const handleAddSize = (category) => {
    if (newSizes[category]) {
      // setEditingOptions((prevOptions) => ({
      //   ...prevOptions,
      //   [category]: [...prevOptions[category], newSizes[category]],
      // }));
      // handleUpdateSizeOptions();
      setEditingOptions((prevOptions) => {
        const updatedOptions = { ...prevOptions };
        updatedOptions[category].push(newSizes[category]);
        // updatedOptions[category].splice(sizeIndex, 1);
        handleUpdateSizeOptions();
        return updatedOptions;
      });
      setNewSizes((prevSizes) => ({
        ...prevSizes,
        [category]: "",
      }));
    }
  };

  const handleDeleteSize = (category, sizeIndex) => {
    setEditingOptions((prevOptions) => {
      const updatedOptions = { ...prevOptions };
      updatedOptions[category].splice(sizeIndex, 1);
      handleUpdateSizeOptions();
      return updatedOptions;
    });
  };

  const handleUpdateSizeOptions = () => {
    setisLoading(true);

    axios
      .put(
        `${process.env.REACT_APP_BASE_API}/size/size-options`,
        editingOptions
      )
      .then((response) => {
        fetchSizeOptions();
        toast({
          position: "top",
          title: `Successfull`,
          status: "success",
          isClosable: true,
          duration: 1500,
        });
        setisLoading(false);
      })
      .catch((error) => {
        setisLoading(false);

        console.error("Error updating size options:", error);
        alert("error");
      });
  };

  const fetchGSTValues = async () => {
    setisLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API}/gst/gst-values`
      );
      setGstValues(response.data);
    } catch (error) {
      console.error("Error fetching GST values:", error);
      setisLoading(false);
    }
    setisLoading(false);
  };

  const handleAddGSTValue = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BASE_API}/gst/addgst`, {
        value: Number(newValue),
      });
      fetchGSTValues();
      setNewValue("");
    } catch (error) {
      console.error("Error adding GST value:", error);
    }
  };

  const handleDeleteGSTValue = async (value) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BASE_API}/gst/delgst/${value}`
      );
      fetchGSTValues();
    } catch (error) {
      console.error("Error deleting GST value:", error);
    }
  };
  return (
    <div>
      <AdminNavbar />
      {isLoading ? (
        <LoadingPage />
      ) : (
        <Box
          marginTop={"100px"}
          marginLeft={{ lg: "250px", md: "250px", base: "10px" }}
          marginRight={"10px"}
        >
          {/* <Button
            alignSelf={"right"}
            ml={{ lg: "50vw", md: "40vw", base: "0" }}
            colorScheme="blue"
            onClick={handleUpdateSizeOptions}
          >
            Update Size Options
          </Button> */}
          {/* <h1>Size Options</h1> */}
          <VStack align="flex-start">
            {Object.entries(editingOptions).map(([category, sizes]) => (
              <FormControl my={0} key={category}>
                <FormLabel>
                  {category === "standardSizes"
                    ? "Standard Sizes:"
                    : category === "waistSizes"
                    ? "Waist Sizes:"
                    : category === "ageSizes"
                    ? "Age Sizes:"
                    : category === "sleeveLength"
                    ? "Sleeve Length:"
                    : "Pant Closure:"}{" "}
                  
                </FormLabel>
                {/* <Stack direction={{ base: "column", md: "row" }} gridColumn={4} spacing={4}> */}
                <SimpleGrid
                  columns={{ lg: "10", md: "7", base: "4" }}
                  spacing={10}
                  gap={5}
                >
                  {sizes.map((size, sizeIndex) => (
                    <div key={size}>
                      <Text> {size} </Text>
                      <Button
                        size="xs"
                        colorScheme="red"
                        onClick={() => handleDeleteSize(category, sizeIndex)}
                      >
                        Delete
                      </Button>
                    </div>
                  ))}
                </SimpleGrid>
                {/* </Stack> */}
                <HStack my={10}>
                  <InputGroup>
                    <Input
                      w={200}
                      mx={10}
                      placeholder="New size"
                      value={newSizes[category] || ""}
                      onChange={(e) =>
                        handleNewSizeChange(category, e.target.value)
                      }
                    />
                    <Button
                      //   size="xs"
                      colorScheme="green"
                      onClick={() => handleAddSize(category)}
                    >
                      Add
                    </Button>
                  </InputGroup>
                </HStack>
              </FormControl>
            ))}
            <VStack align={"flex-start"}>
              <FormControl>
                <FormLabel>GST Values</FormLabel>
                <SimpleGrid
                  columns={{ lg: "10", md: "7", base: "4" }}
                  spacing={10}
                  gap={5}
                >
                  {gstValues.map((value) => (
                    <div key={value}>
                      <Text>{value}</Text>
                      <Button
                        size="xs"
                        colorScheme="red"
                        onClick={() => handleDeleteGSTValue(value)}
                      >
                        Delete
                      </Button>
                    </div>
                  ))}
                </SimpleGrid>
                <HStack my={5}>
                  <InputGroup>
                    <Input
                      w={200}
                      mx={10}
                      type="number"
                      placeholder="Enter a new GST value"
                      value={newValue}
                      onChange={(e) => setNewValue(e.target.value)}
                    />
                    <Button colorScheme="green" onClick={handleAddGSTValue}>
                      Add
                    </Button>
                  </InputGroup>
                </HStack>
              </FormControl>
            </VStack>
            {/* <GSTManager/> */}
            {/* <Button
              alignSelf={"flex-start"}
              m={5}
              colorScheme="blue"
              onClick={handleUpdateSizeOptions}
            >
              Update Size Options
            </Button> */}
          </VStack>
        </Box>
      )}
    </div>
  );
};

export default SizeOptions;

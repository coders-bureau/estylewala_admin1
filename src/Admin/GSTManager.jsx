import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";

const GSTManager = () => {
  const [gstValues, setGstValues] = useState([]);
  const [newValue, setNewValue] = useState("");

  useEffect(() => {
    fetchGSTValues();
  }, []);

  const fetchGSTValues = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API}/gst/gst-values`
      );
      setGstValues(response.data);
    } catch (error) {
      console.error("Error fetching GST values:", error);
    }
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
              Add GST Value
            </Button>
          </InputGroup>
        </HStack>
      </FormControl>
    </VStack>
  );
};

export default GSTManager;

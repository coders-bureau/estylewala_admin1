// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Text,
//   Box,
//   Button,
//   Center,
//   FormControl,
//   FormLabel,
//   Input,
//   Select,
//   VStack,
//   Spacer,
//   Checkbox,
//   HStack,
//   useToast,
//   IconButton,
//   Image,
//   InputGroup,
// } from "@chakra-ui/react";
// import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
// import AdminNavbar from "./AdminNavbar";

// const SizeOptionsPage = () => {
//   const [sizeOptions, setSizeOptions] = useState({});
//   const [editingOptions, setEditingOptions] = useState({});
//   const [isEditing, setIsEditing] = useState(false);

//   const [newSizes, setNewSizes] = useState({});
//   console.log(sizeOptions);
//   console.log(newSizes);
//   // Fetch size options on component mount
//   useEffect(() => {
//     fetchSizeOptions();
//   }, []);

//   const fetchSizeOptions = () => {
//     axios
//       .get("${process.env.REACT_APP_BASE_API}/size/size-options")
//       .then((response) => {
//         setSizeOptions(response.data);
//         setEditingOptions(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching size options:", error);
//       });
//   };

//   const handleEditInputChange = (category, index, value) => {
//     setEditingOptions((prevOptions) => {
//       const updatedOptions = { ...prevOptions };
//       updatedOptions[category][index] = value;
//       return updatedOptions;
//     });
//   };

//   const handleEditSave = () => {
//     axios
//       .put("/${process.env.REACT_APP_BASE_API}/size/size-options", editingOptions)
//       .then((response) => {
//         setIsEditing(false);
//         fetchSizeOptions();
//       })
//       .catch((error) => {
//         console.error("Error updating size options:", error);
//       });
//   };

//   const handleNewSizeChange = (category, value) => {
//     setNewSizes((prevSizes) => ({
//       ...prevSizes,
//       [category]: value,
//     }));
//   };

//   const handleAddSize = (category) => {
//     if (newSizes[category]) {
//       setSizeOptions((prevOptions) => ({
//         ...prevOptions,
//         [category]: [...prevOptions[category], newSizes[category]],
//       }));
//       setNewSizes((prevSizes) => ({
//         ...prevSizes,
//         [category]: "",
//       }));
//     }
//   };

//   const handleDeleteSize = (category, sizeIndex) => {
//     setSizeOptions((prevOptions) => {
//       const updatedOptions = { ...prevOptions };
//       updatedOptions[category].splice(sizeIndex, 1);
//       return updatedOptions;
//     });
//   };

//   return (
//     <>
//       <AdminNavbar />
//       <Box
//         marginTop={{ lg: "90px", md: "80px", base: "80px" }}
//         marginLeft={{ lg: "250px", md: "250px", base: "0px" }}
//         marginRight={"10px"}
//       >
//         <div>
//           {/* {Object.entries(sizeOptions).map(
//             ([category, sizes], categoryIndex) => (
//               <FormControl key={category}>
//                 <VStack >
//                   <FormLabel>
//                     {category === "standardSizes"
//                       ? "Standard"
//                       : category === "waistSizes"
//                       ? "Waist"
//                       : "Age"}{" "}
//                     Sizes:
//                   </FormLabel>
//                   <HStack gap={5}>
//                     {sizes.map((size, sizeIndex) => (
//                       <div key={size}>
//                         <Text> {size} </Text>
//                         <Button
//                           size="xs"
//                           colorScheme="red"
//                           onClick={() => handleDeleteSize(category, sizeIndex)}
//                         >
//                           Delete
//                         </Button>
//                       </div>
//                     ))}
//                   </HStack>
//                   <HStack>
//                     <InputGroup>
//                       <Input
//                         w={200}
//                         mx={10}
//                         placeholder="New size"
//                         value={newSizes[category] || ""}
//                         onChange={(e) =>
//                           handleNewSizeChange(category, e.target.value)
//                         }
//                       />
//                       <Button
//                         //   size="xs"
//                         colorScheme="green"
//                         onClick={() => handleAddSize(category)}
//                       >
//                         Add
//                       </Button>
//                     </InputGroup>
//                   </HStack>
//                 </VStack>
//               </FormControl>
//             )
//           )} */}
//           {Object.entries(sizeOptions).map(([category, sizes]) => (
//         <FormControl key={category}>
//           <VStack>
//             <FormLabel>
//               {category === "standardSizes"
//                 ? "Standard"
//                 : category === "waistSizes"
//                 ? "Waist"
//                 : "Age"}{" "}
//               Sizes:
//             </FormLabel>
//             <HStack gap={5}>
//               {sizes.map((size, sizeIndex) => (
//                 <div key={size}>
//                   <Text> {size} </Text>
//                   <Button
//                     size="xs"
//                     colorScheme="red"
//                     onClick={() => handleDeleteSize(category, sizeIndex)}
//                   >
//                     Delete
//                   </Button>
//                 </div>
//               ))}
//             </HStack>
//             <HStack>
//               <InputGroup>
//                 <Input
//                   w={200}
//                   mx={10}
//                   placeholder="New size"
//                   value={newSizes[category] || ""}
//                   onChange={(e) =>
//                     handleNewSizeChange(category, e.target.value)
//                   }
//                 />
//                 <Button
//                   //   size="xs"
//                   colorScheme="green"
//                   onClick={() => handleAddSize(category)}
//                 >
//                   Add
//                 </Button>
//               </InputGroup>
//             </HStack>
//           </VStack>
//         </FormControl>
//       ))}
//       <Button colorScheme="blue" onClick={handleUpdateSizeOptions}>
//         Update Size Options
//       </Button>
//         </div>
//       </Box>
//     </>
//   );
// };

// export default SizeOptionsPage;

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

const SizeOptions = () => {
  //   const [sizeOptions, setSizeOptions] = useState({});
  const [editingOptions, setEditingOptions] = useState({});
  const [newSizes, setNewSizes] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const toast = useToast();

  console.log(editingOptions);
  // Fetch size options on component mount
  useEffect(() => {
    fetchSizeOptions();
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
      setEditingOptions((prevOptions) => ({
        ...prevOptions,
        [category]: [...prevOptions[category], newSizes[category]],
      }));
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
      return updatedOptions;
    });
  };

  const handleUpdateSizeOptions = () => {
    setisLoading(true);

    axios
      .put(`${process.env.REACT_APP_BASE_API}/size/size-options`, editingOptions)
      .then((response) => {
        fetchSizeOptions();
        toast({
          position: "top",
          title: `Size updated successfully`,
          status: "success",
          isClosable: true,
          duration: 1500,
        });
    setisLoading(false);

      })
      .catch((error) => {
    setisLoading(false);

        console.error("Error updating size options:", error);
        toast({
          position: "top",
          title: `Error in updating successfully`,
          status: "Error",
          isClosable: true,
          duration: 1500,
        });
      });
  };

  return (
    <div>
      <AdminNavbar />
      {isLoading ? (
        <LoadingPage />
      ) : (
        <Box
          marginTop={"100px"}
          marginLeft={{ lg: "250px", md: "250px", base: "20px" }}
          marginRight={"20px"}
        >
          {/* <h1>Size Options</h1> */}
          <VStack align="flex-start">
            {Object.entries(editingOptions).map(([category, sizes]) => (
              <FormControl my={0} key={category}>
                <FormLabel>
                  {category === "standardSizes"
                    ? "Standard"
                    : category === "waistSizes"
                    ? "Waist"
                    : "Age"}{" "}
                  Sizes:
                </FormLabel>
                {/* <Stack direction={{ base: "column", md: "row" }} gridColumn={4} spacing={4}> */}
                <SimpleGrid
                  columns={{ lg: "10", md: "7", base: "5" }}
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

            <Button
              alignSelf={"flex-start"}
              m={5}
              colorScheme="blue"
              onClick={handleUpdateSizeOptions}
            >
              Update Size Options
            </Button>
          </VStack>
        </Box>
      )}
    </div>
  );
};

export default SizeOptions;

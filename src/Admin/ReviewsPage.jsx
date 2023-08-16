import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  HStack,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Heading,
  VStack,
  Image,
} from "@chakra-ui/react";
import AdminNavbar from "./AdminNavbar";
import LoadingPage from "../Pages/LoadingPage";

const ReviewsPage = () => {
  const [productsWithReviews, setReviews] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState("product");

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };
  console.log(productsWithReviews);
  useEffect(() => {
    fetchAllReviews();
  }, []);

  const fetchAllReviews = async () => {
    try {
      setisLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API}/admin/allreviews`
      );
      setReviews(response.data.data);
      setisLoading(false);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setisLoading(false);
    }
  };
  // console.log(product.reviews.length);

  return (
    <div>
      <AdminNavbar />
      {isLoading ? (
        <LoadingPage />
      ) : (
        <Box
          marginTop={{ lg: "90px", md: "80px", base: "80px" }}
          marginLeft={{ lg: "250px", md: "250px", base: "10px" }}
          marginRight={"10px"}
        >
          <Box>
            <Heading>Products with Reviews</Heading>
            <VStack mt={5}>
              {productsWithReviews.map((product) => (
                <HStack key={product._id}>
                  <div>
                    <Accordion allowMultiple>
                      <AccordionItem>
                        <h2>
                          <AccordionButton w={"75vw"}>
                            <HStack as="span" flex="1" textAlign="left">
                              <Text>{product.title}</Text>
                              {/* {product.reviews[0]} */}
                              <Image
                                boxSize="50px"
                                // objectFit="cover"
                                objectFit="contain"
                                src={
                                  process.env.REACT_APP_BASE_API +
                                  "/" +
                                  product.img
                                }
                                alt={"img"}
                              />
                            </HStack>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel bgColor={"white"} pb={4}>
                          <VStack>
                            {product.reviews.length > 1 ? (
                              <>
                                {product.reviews.map((review) => (
                                  <HStack
                                    borderColor={"black"}
                                    border={2}
                                    borderRadius={5}
                                    key={review._id}
                                    align={"flex-start"}
                                    textAlign={"left"}
                                  >
                                    <Text w={"20vw"} isTruncated>
                                      {review.user ? review.user.name : ""}
                                    </Text>
                                    <Text w={"10vw"} isTruncated>
                                      {review.rating}
                                    </Text>
                                    <Text w={"40vw"}> {review.content}</Text>
                                  </HStack>
                                ))}
                              </>
                            ) : (
                              <>No Reviews</>
                            )}
                          </VStack>
                        </AccordionPanel>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </HStack>
              ))}
            </VStack>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default ReviewsPage;

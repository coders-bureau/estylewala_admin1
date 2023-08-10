import { Box, Heading, HStack, Stack, Text } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import AdminNavbar from "./AdminNavbar";
import { getAllProductsData } from "../Redux/AppReducer/Action";
import LoadingPage from "../Pages/LoadingPage";
import PageNotFound from "../Pages/PageNotFound";
// import Calendar from './Calendar';
import axios from "axios";


const AdminDashboard = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  // const Allproducts = useSelector((store) => store.AppReducer);

  

  console.log(products);
  console.log("error: " + products.isError);
  useEffect(() => {
    // dispatch(getAllProductsData());
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setisLoading(true);
    await axios
      .get("http://localhost:5000/product/allproducts")
      .then((response) => {
        setProducts(response.data.data);
        console.log(response.data.data);
        setisLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setisLoading(false);
      });
  };

  
  // const kd = Allproducts.Products ? 0 : Allproducts.Products.data.filter((item) => item.type === "Kids").length ;
  // const md = Allproducts.Products ? 0 : Allproducts.Products.data.filter((item) => item.type === "Mens").length ;
  // const wd = Allproducts.Products ? 0 : Allproducts.Products.data.filter((item) => item.type === "Women").length ;
  const kd = products.filter((item) => item.type === "Kids").length ;
  const md = products.filter((item) => item.type === "Mens").length ;
  const wd = products.filter((item) => item.type === "Womens").length ;
  console.log(kd, md, wd);

  return (
    <Box minH="100vh" bg={"whiteAlpha.50"}>
      <AdminNavbar />
      {isLoading ? (
        false ? (
          <>
            <PageNotFound />{" "}
          </>
        ) : (
          <>
            <LoadingPage />
          </>
        )
      ) : (
        <Box
          marginTop={{ lg: "80px", md: "80px", base: "80px" }}
          pt={30}
          fontFamily={"sans-serif"}
          // bg={'#ffffff'}
          padding={4}
          // width={"80%"}
        >
          <Box
            ml={{ lg: "250px", md: "250px", base: "0px" }}
            borderRadius={15}
            mt={1}
            mb={4}
            border="2px solid lightBlue"
          >
            <Box display={{ lg: "block", md: "block", base: "none" }}>
              <Chart
                type="pie"
                height={"450px  "}
                series={[kd, md, wd]}
                options={{
                  noData: { text: "Unavailable" },
                  stroke: {
                    lineCap: "round",
                  },
                  radialBar: {
                    // dataLabels: {
                    total: {
                      show: true,
                      label: "TOTAL",
                    },
                    // }
                  },
                  // dropShadow: {
                  //   enabled: true,
                  //       top: 0,
                  //       left: 0,
                  //       blur: 3,
                  //       opacity: 0.5,
                  //     },
                  labels: ["KIDS-PRODUCTS", "MENS-PRODUCTS", "WOMENS-PRODUCTS"],
                }}
              ></Chart>
            </Box>
            <Box display={{ lg: "none", md: "none", base: "block" }}>
              <Chart
                type="bar"
                height="450px"
                series={[
                  {
                    data: [kd, md, wd],
                  },
                ]}
                options={{
                  noData: { text: "Unavailable" },
                  stroke: {
                    lineCap: "round",
                  },
                  plotOptions: {
                    bar: {
                      horizontal: true,
                      distributed: true,
                      dataLabels: {
                        position: "top",
                      },
                    },
                  },
                  dataLabels: {
                    enabled: true,
                    formatter: (val) => `${val}%`,
                  },
                  xaxis: {
                    categories: [
                      "Kids Products",
                      "Mens Products",
                      "Women Products",
                    ],
                  },
                }}
              />
            </Box>
          </Box>
          <Stack
            bg={"#a0aec0"}
            ml={{ lg: "250px", md: "250px", base: "0px" }}
            padding={5}
            borderRadius={15}
            boxShadow={"base"}
            cursor={"pointer"}
            _hover={{ bg: "#ffffff", border: "2px solid lightBlue" }}
          >
            <Text
              _hover={{ color: "#3751ff" }}
              color={"#373a47"}
              fontFamily={"sans-serif"}
            >
              Total Products : <b>{kd + md + wd}</b>
            </Text>
          </Stack>
          <HStack
            ml={{ lg: "250px", md: "250px", base: "0px" }}
            mt={3}
            pb={10}
            alignItems={"center"}
            spacing={3}
          >
            <Stack
              bg={"#00e396"}
              boxShadow={"base"}
              padding={4}
              borderRadius={15}
              cursor={"pointer"}
              _hover={{ bg: "#ffffff", border: "2px solid lightBlue" }}
            >
              <Text
                _hover={{ color: "#3751ff" }}
                color={"#373a47"}
                fontWeight={"small"}
                fontFamily={"sans-serif"}
              >
                Total Mens Products: <b>{md}</b>
              </Text>
            </Stack>
            <Stack
              bg={"#feb019"}
              padding={4}
              boxShadow={"base"}
              borderRadius={15}
              cursor={"pointer"}
              _hover={{ bg: "#ffffff", border: "2px solid lightBlue" }}
            >
              <Text
                _hover={{ color: "#3751ff" }}
                color={"#373a47"}
                fontWeight={"normal"}
                fontFamily={"sans-serif"}
              >
                Total Womens Products <b>{wd}</b>
              </Text>
            </Stack>
            <Stack
              bg={"#008ffb"}
              padding={4}
              boxShadow={"base"}
              borderRadius={15}
              cursor={"pointer"}
              _hover={{ bg: "#ffffff", border: "2px solid lightBlue" }}
            >
              <Text
                _hover={{ color: "#3751ff" }}
                color={"#373a47"}
                fontWeight={"normal"}
                fontFamily={"sans-serif"}
              >
                Total Kids Products <b>{kd}</b>
              </Text>
            </Stack>
          </HStack>
        </Box>
      )}
    </Box>
  );
};

export default AdminDashboard;

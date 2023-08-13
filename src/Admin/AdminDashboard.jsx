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
import OrderBarChart from "./OrderBarChart";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [chartData, setChartData] = useState({});
  const [months, setMonths] = useState({});
  const [numbers, setNumber] = useState({});

  // const Allproducts = useSelector((store) => store.AppReducer);
  useEffect(() => {
    // dispatch(getAllProductsData());
    fetchProducts();
    // fetchOrders();
    // fetchUsers();
    // fetchChartData();
  }, []);

  const fetchChartData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/admin/order/chart"
      );
      const data = response.data.chartData;

      if (!Array.isArray(data)) {
        console.error("Invalid chart data received:", data);
        return;
      }
      console.log(data);
      const months = [];
      const chartdata = [];
      const orderCounts = [];
      data.forEach((entry) => {
        if (entry.month && entry.count) {
          months.push(entry.month);
          orderCounts.push(entry.count);
          // chartdata.push({ label: entry.month, y: entry.count });
        }
      });
      setMonths(months);
      setNumber(numbers);
      console.log(months);
      // setChartData(chartdata);

      //   setChartData({
      //     labels: months,
      //     datasets: [
      //       {
      //         label: 'Number of Orders',
      //         data: orderCounts,
      //         backgroundColor: 'rgba(75, 192, 192, 0.6)', // Adjust the color as needed
      //       },
      //     ],
      //   });
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };

  const fetchProducts = async () => {
    setisLoading(true);
    await axios
      .get(`${process.env.REACT_APP_BASE_API}/product/allproducts`)
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
  const fetchOrders = async () => {
    try {
      setisLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API}/admin/allorders`
      ); // Adjust the endpoint accordingly
      setOrders(response.data.data);
      setisLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setisLoading(false);
    }
  };
  const fetchUsers = async () => {
    try {
      setisLoading(true);

      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API}/admin/allusers`
      ); // Adjust the endpoint accordingly
      setUsers(response.data.data);
      setisLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setisLoading(false);
    }
  };

  // const kd = Allproducts.Products ? 0 : Allproducts.Products.data.filter((item) => item.type === "Kids").length ;
  // const md = Allproducts.Products ? 0 : Allproducts.Products.data.filter((item) => item.type === "Mens").length ;
  // const wd = Allproducts.Products ? 0 : Allproducts.Products.data.filter((item) => item.type === "Women").length ;
  const kd = products.filter((item) => item.type === "Kids").length;
  const md = products.filter((item) => item.type === "Men").length;
  const wd = products.filter((item) => item.type === "Women").length;

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
          <HStack
            // gap={10}
            display={"block"}
            ml={{ lg: "250px", md: "250px", base: "0px" }}
            borderRadius={15}
            mt={1}
            mb={4}
            border="2px solid lightBlue"
          >
            {/* <Chart
                type="pie"
                height={"450px"}
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
              ></Chart> */}
            <Box display={{ lg: "block", md: "block", base: "block" }}>
              <Text
                ml={20}
                textAlign={"left"}
                fontWeight={500}
                fontSize={{ md: "40px", base: "20px" }}
              >
                PRODUCTS
              </Text>
              <Chart
                type="pie"
                height={"450px"}
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
          </HStack>
          <HStack  display={"block"}
            ml={{ lg: "250px", md: "250px", base: "0px" }}
            borderRadius={15}
            mt={1}
            mb={4}
            border="2px solid lightBlue">
            <Box display={{ lg: "block", md: "block", base: "block" }}>
              <Text
                ml={20}
                textAlign={"left"}
                fontWeight={500}
                fontSize={{ md: "40px", base: "20px" }}
              >
                No of Orders
              </Text>
              <Chart
                type="bar"
                height="450px"
                series={[
                  {
                    data: [7, 1, 3, 2, 5, 6],
                  },
                ]}
                options={{
                  noData: { text: "Unavailable" },
                  stroke: {
                    lineCap: "round",
                  },
                  plotOptions: {
                    bar: {
                      vertical: true,
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
                    // labels: ["Months"],
                    categories: ["Mar", "Apr", "May", "Jun", "Jul", "Aug"],
                  },
                }}
              />
            </Box>
            {/* <Box display={{ lg: "none", md: "none", base: "block" }}>
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
            </Box> */}
          </HStack>
          {/* <OrderBarChart /> */}
          {/* <Stack
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
          </Stack> */}
          {/* <HStack
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
          </HStack> */}
        </Box>
      )}
    </Box>
  );
};

export default AdminDashboard;

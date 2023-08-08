import { useLocation } from 'react-router-dom';
import './App.css';
import { MainRoutes } from './Routes/Routes';
import { useEffect } from 'react';
import { Box } from '@chakra-ui/react';

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top of the page
  }, [location]);
  return (
    <div className="App">
      <Box display={"none"} id="sign-in-button"></Box>
      <MainRoutes/>
    </div>
  );
}

export default App;

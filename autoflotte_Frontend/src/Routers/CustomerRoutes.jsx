import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import VehiculeDetails from "../customer/Components/Vehicule/VehiculeDetails/VehiculeDetails";
import Vehicule from "../customer/Components/Vehicule/Vehicule/Vehicule";
import Contact from "../Pages/Contact";
import TearmsCondition from "../Pages/TearmsCondition";
import PrivacyPolicy from "../Pages/PrivacyPolicy";
import About from "../Pages/About";
import Homepage from "../Pages/Homepage";
import Navigation from "../customer/Components/Navbar/Navigation";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Button} from "@mui/material";
import { customTheme, customerTheme } from "../Admin/them/customeThem";
import Order from "../customer/Components/orders/Order";
import OrderDetails from "../customer/Components/orders/OrderDetails";
import OrderCreation from "../customer/Components/orders/OrderCreation";
import Footer from "../customer/Components/footer/Footer";

const CustomerRoutes = () => {
    const location = useLocation();
    
  
  
    const showNavigation = location.pathname !== "*";

  
  return (
    <div>
    
    <ThemeProvider theme={customerTheme}>
    {showNavigation && <Navigation />}
     <Routes>
     <Route path="/login" element={<Homepage />}></Route>
     <Route path="/register" element={<Homepage />}></Route>

        <Route path="/" element={<Homepage />}></Route>
        <Route path="/home" element={<Homepage />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/privaciy-policy" element={<PrivacyPolicy />}></Route>
        <Route path="/terms-condition" element={<TearmsCondition />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/vehicules" element={<Vehicule/>}></Route>
        <Route path="/vehicule/:vehiculeId" element={<VehiculeDetails />}></Route>
        <Route path="/order/:orderId" element={<OrderDetails />}></Route>
        <Route path="/order/create/:vehiculeId" element={<OrderCreation />} />
        <Route path="/account/order" element={<Order />}></Route>
      
       

      </Routes>
      <Footer/>
    </ThemeProvider>
      
    </div>
  );
};

export default CustomerRoutes;

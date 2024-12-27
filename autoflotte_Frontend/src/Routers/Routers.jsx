
import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "../Pages/Homepage";
import About from "../Pages/About";
import PrivacyPolicy from "../Pages/PrivacyPolicy";
import TearmsCondition from "../Pages/TearmsCondition";
import Contact from "../Pages/Contact";
import Vehicule from "../customer/Components/Vehicule/Vehicule/Vehicule";
import VehiculeDetails from "../customer/Components/Vehicule/VehiculeDetails/VehiculeDetails";
import DemoAdmin from "../Admin/Views/DemoAdmin";
import AdminPannel from "../Admin/AdminPannel";
import Navigation from "../customer/Components/Navbar/Navigation";

const Routers = () => {
  return (
    <div>
        <div>
             <Navigation/>
        </div>
       <div className="">
        <Routes>

        <Route path="/" element={<Homepage/>}></Route>
        <Route path="/home" element={<Homepage/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/privaciy-policy" element={<PrivacyPolicy/>}></Route>
        <Route path="/terms-condition" element={<TearmsCondition/>}></Route>
        <Route path="/contact" element={<Contact/>}></Route>
        <Route path="/vehicule" element={<Vehicule/>}></Route>
        <Route path="/vehicule/:vehiculeId" element={<VehiculeDetails/>}></Route>
      

        <Route path="/admin" element={<AdminPannel/>}></Route>
        <Route path="/demo" element={<DemoAdmin/>}></Route>

      </Routes>
       </div>
      
    </div>
  );
};

export default Routers;

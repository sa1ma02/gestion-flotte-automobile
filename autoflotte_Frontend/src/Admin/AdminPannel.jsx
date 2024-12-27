import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import { ThemeProvider } from "@emotion/react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ListItemIcon from "@mui/material/ListItemIcon";
import { customTheme } from "./them/customeThem";
import AdminNavbar from "./Navigation/AdminNavbar";
import { Route, Routes, useNavigate } from "react-router-dom";
import CreateVehiculeForm from "./componets/createVehicule/CreateVehiculeFrom";
import "./AdminPannel.css";
import VehiculesTable from "./componets/Vehicules/VehiculesTable";
import OrdersTable from "./componets/Orders/OrdersTable";
import Customers from "./componets/customers/customers";
import UpdateVehiculeForm from "./componets/updateVehicule/UpdateVehicule";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Dashboard from "./componets/dashboard/Dashboard";
import HomeIcon from "@mui/icons-material/Home";

const drawerWidth = 240;

const menu = [
  // {name: "Accueil", path: "/", icon: <HomeIcon />},
  {name:"Liste des Véhicules", path:"/admin/vehicules", icon: <DirectionsCarIcon />},
  {name:"Ajouter un véhicule", path:"/admin/vehicule/create", icon: <AddCircleIcon />},
  { name: "Dashboard", path: "/admin/dashboard", icon: <DashboardIcon /> },
  {name:"Demandes", path:"/admin/orders", icon: <AssignmentIcon />},
  {name:"Utilisateurs", path:"/admin/customers", icon: <PeopleIcon />},
 
];

export default function AdminPannel() {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [sideBarVisible, setSideBarVisible] = React.useState(false);
  const navigate = useNavigate();

  const drawer = (
    <Box
      sx={{
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        marginTop: "64px",
        marginLeft: "5px",
        height: "100%",
      }}
    >
      {isLargeScreen && <Toolbar />}
      <List>
        {menu.map((item) => (
          <ListItem key={item.name} disablePadding onClick={() => navigate(item.path)}>
            <ListItemButton sx={{ justifyContent: "center" }}>
              <ListItemIcon style={{ color: "#09ba3f" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const handleSideBarViewInMobile = () => {
    setSideBarVisible(true);
  };
  const handleCloseSideBar = () => {
    setSideBarVisible(false);
  };

  const drawerVariant = isLargeScreen ? "permanent" : "temporary";

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ display: `${isLargeScreen ? "flex" : "block"} ` }}>
        <CssBaseline />
        <AdminNavbar handleSideBarViewInMobile={handleSideBarViewInMobile} />
        <Drawer
          variant={drawerVariant}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              ...(drawerVariant === "temporary" && {
                top: 0,
                [`& .MuiPaper-root.MuiDrawer-paperAnchorTop.MuiDrawer-paperTemporary`]: {
                  position: "fixed",
                  left: 0,
                  right: 0,
                  height: "100%",
                  zIndex: (theme) => theme.zIndex.drawer + 2,
                },
              }),
            },
          }}
          open={isLargeScreen || sideBarVisible}
          onClose={handleCloseSideBar}
        >
          {drawer}
        </Drawer>
        <Box className="adminContainer" component="main" sx={{ flexGrow: 1, alignItems: 'center' }}>
          <Toolbar />
          <Routes>
            <Route path="/" element={<VehiculesTable />} />
            <Route path="/vehicule/create" element={<CreateVehiculeForm />} />
            <Route path="/vehicule/update/:vehiculeId" element={<UpdateVehiculeForm />} />
            <Route path="/vehicules" element={<VehiculesTable />} />
            <Route path="/orders" element={<OrdersTable />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Avatar, Menu, MenuItem, Box, Button } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout } from "../../Redux/Auth/Action"; // Adjust the path as necessary
import IMAGES from "../../../src/Images/index"; // Make sure to import your images correctly
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

export default function AdminNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const { auth } = useSelector((store) => store); // Get auth state from Redux
  const [anchorEl, setAnchorEl] = useState(null);
  const openUserMenu = Boolean(anchorEl);
  const [openAuthModal, setOpenAuthModal] = useState(false);

  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt)); // Fetch user details if JWT exists
    }
  }, [jwt, dispatch]);

  const handleUserClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    dispatch(logout());
    navigate("/"); // Redirect to the home page after logout
  };

  const handleOpenAuthModal = () => {
    setOpenAuthModal(true);
  };

  const handleCloseAuthModal = () => {
    setOpenAuthModal(false);
  };

  return (
    <Box sx={{ flexGrow: 2 }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: "rgb(255, 255, 255)" }}
      >
        <Toolbar>
          <img
            alt="OCP"
            src={IMAGES.imgTwo}
            sx={{ marginLeft: "50px" }}
            style={{ width: "60px", height: "60px" }}
          />
          <Typography
            variant="body1"
            style={{
              marginLeft: "430px",
              fontSize: "50px",
              fontStyle: "italic",
              fontWeight: "bold",
              color: "#09ba3f",
            }}
          >
            Auto Flotte
          </Typography>

          {/* Avatar Circle for User Login/Logout */}
          <Box sx={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
            {auth.user ? (
              <div>
                <Avatar
                  onClick={handleUserClick}
                  sx={{
                    bgcolor: deepPurple[500],
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  {auth.user?.firstName ? auth.user.firstName[0].toUpperCase() : "?"}
                </Avatar>

                <Menu anchorEl={anchorEl} open={openUserMenu} onClose={handleCloseUserMenu}>
                  <MenuItem onClick={handleLogout}>Se déconnecter</MenuItem>
                </Menu>
              </div>
            ) : (
              <Button
                onClick={handleOpenAuthModal}
                style={{ color: "#09ba3f" }}
                className="text-sm font-medium hover:text-[#09ba3f]"
              >
                Se connecter
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

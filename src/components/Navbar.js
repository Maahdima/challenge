import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ContactSupportOutlinedIcon from "@mui/icons-material/ContactSupportOutlined";

const Navbar = () => {
  const navigate = useNavigate();
  const pages = [
    { name: "Home", path: "/", icon: HomeOutlinedIcon },
    { name: "About", path: "/about", icon: InfoOutlinedIcon },
    { name: "Buy", path: "/buy", icon: ShoppingCartOutlinedIcon },
    { name: "Contact", path: "/contact", icon: ContactSupportOutlinedIcon },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          {pages.map((page) => (
            <Typography
              style={{ cursor: "pointer" }}
              onClick={() => navigate(page.path)}
              variant="h7"
              component="div"
              sx={{ flexGrow: 1 }}
              key={page.name}
            >
              <page.icon style={{ verticalAlign: "middle" }} />
              {page.name}
            </Typography>
          ))}

          <Button
            onClick={() => navigate("/signup")}
            color="inherit"
            size="large"
          >
            Sign Up
          </Button>
          <Button
            onClick={() => navigate("/signin")}
            color="inherit"
            size="large"
          >
            Sign In
          </Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
  );
};
export default Navbar;

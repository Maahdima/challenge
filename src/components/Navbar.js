import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useNavigate, NavLink } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ContactSupportOutlinedIcon from "@mui/icons-material/ContactSupportOutlined";

const Navbar = ({ isSignedin, setIsSignedin }) => {
  const navigate = useNavigate();
  const pages = [
    { name: "Home", path: "/", icon: HomeOutlinedIcon, hidden: false },
    { name: "About", path: "/about", icon: InfoOutlinedIcon, hidden: false },
    {
      name: "Buy",
      path: "/buy",
      icon: ShoppingCartOutlinedIcon,
      hidden: !isSignedin,
    },
    {
      name: "Contact",
      path: "/contact",
      icon: ContactSupportOutlinedIcon,
      hidden: !isSignedin,
    },
  ];

  const handleClick = () => {
    setIsSignedin(false);
    alert("You've been successfully logged out");
    navigate("/");
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            {pages.map((page) => (
              <NavLink
                key={page.name}
                style={({ isActive }) =>
                  isActive
                    ? {
                        fontWeight: "1000",
                        fontSize: "18px",
                        fontFamily: "roboto",
                        color: "black",
                        flexGrow: 1,
                        textDecoration: "none",
                      }
                    : {
                        fontWeight: "lighter",
                        fontSize: "18px",
                        fontFamily: "roboto",
                        color: "inherit",
                        flexGrow: 1,
                        textDecoration: "none",
                      }
                }
                hidden={page.hidden}
                to={page.path}
              >
                <page.icon style={{ verticalAlign: "middle" }} />
                {page.name}
              </NavLink>
            ))}
            <Button
              onClick={() => navigate("/signup")}
              color="success"
              size="large"
              variant="contained"
            >
              Sign Up
            </Button>
            {!isSignedin && (
              <Button
                sx={{ marginLeft: "5px" }}
                onClick={() => navigate("/signin")}
                color="secondary"
                size="large"
                variant="contained"
              >
                Sign In
              </Button>
            )}
            {isSignedin && (
              <Button
                sx={{ marginLeft: "5px" }}
                onClick={handleClick}
                color="error"
                size="large"
                variant="contained"
              >
                Logout
              </Button>
            )}
          </Toolbar>
        </AppBar>
        <Toolbar />
      </Box>
    </div>
  );
};
export default Navbar;

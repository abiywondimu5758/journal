import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { mainListItemsData, secondaryListItemsData } from "./listItems";

import { Avatar, Container, ListItemButton, ListItemIcon, ListItemText, Switch } from "@mui/material";
import { useState } from "react";
import DashboardContent from "./DashboardContent";
import JournalContent from "../Journal";
import { tw } from "typewind";

interface listItem {
  primary: string;
  icon: JSX.Element;
}

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}

      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

interface props {
  mode: boolean;
  setMode: () => void;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export default function Dashboard({ mode, setMode }: props) {
  const [open, setOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState("Dashboard");
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const renderComponent = () => {
    switch (selectedItem) {
      case "Dashboard":
        return <DashboardContent />;
      case "Journal":
        return <JournalContent />;
      // case "Books":
      //   return <BooksContent />;
      // Add more cases for other menu items
      default:
        return null;
    }
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px",
              // backgroundColor: 'primary'
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="primary">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <Avatar
              alt="Remy Sharp"
              src="/Hero.jpg"
              sx={{ width: 30, height: 30, marginLeft: "6px" }}
            />
            <Switch
              checked={mode}
              onChange={setMode}
              inputProps={{ "aria-label": "controlled" }}
              color="primary"
            />
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
          {mainListItemsData.map((item:listItem) => (
              <ListItemButton
                key={item.primary}
                onClick={() => setSelectedItem(item.primary)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.primary} />
              </ListItemButton>
            ))}
            <Divider sx={{ my: 1 }} />
            {secondaryListItemsData.map((item:listItem) => (
              <ListItemButton
                key={item.primary}
                onClick={() => setSelectedItem(item.primary)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.primary} />
              </ListItemButton>
            ))}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
          
        >
          <Container className={tw.p_24}>{renderComponent()}</Container>
          <Copyright />
        </Box>
      </Box>
    </>
  );
}

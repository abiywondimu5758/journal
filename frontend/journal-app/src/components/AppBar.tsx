import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

import {
    Alert,
  Avatar,
  CircularProgress,
  ListItemIcon,
  Menu,
  MenuItem,
  Snackbar,
  Switch,
} from "@mui/material";
import { useState } from "react";
import { useLogout, useUser } from "../queries";
import { useNavigate } from "react-router-dom";

interface props {
    mode: boolean;
    setMode: () => void;
    title: string;
  }

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
  }

  interface DropdownMenuProps {
    handleLogout: () => Promise<void>;
  }
  
  const DropdownMenu: React.FC<DropdownMenuProps> = ({ handleLogout }) => {
    const customStyles = {
      color: "#ffffff",
    };
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { data: user, isLoading, isError } = useUser();
    const navigate = useNavigate();
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
    const handleProfileNavigation = () => {
      setAnchorEl(null);
      navigate('/profile')
    }
  
    return (
      <>
        <IconButton color="inherit" onClick={handleClick}>
          {user != undefined && <Avatar
            alt="Remy Sharp"
            src= {user.avatar}
            sx={{ width: 30, height: 30 }}>            {user.first_name.charAt(0)}
            {user.last_name.charAt(0)}</Avatar>}
          {
            isLoading && <CircularProgress size={30} style={customStyles}/>
          }
          {
            isError && <p>Error</p>
          }
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          PaperProps={{
            style: {
              width: "150px", // Set your desired width here
            },
          }}
        >
          <MenuItem onClick={handleProfileNavigation}>
            <ListItemIcon>
              <AccountCircleIcon sx={{ fontSize: 22 }} />
            </ListItemIcon>
            Profile
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <SettingsIcon sx={{ fontSize: 22 }} />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon sx={{ fontSize: 22 }} />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </>
    );
  };
  


export const AppBar1 = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })<AppBarProps>(() => ({
  }));


const AppBar = ({ mode, setMode, title }: props) => {
    
  const { mutate: logout, isLoading, isError } = useLogout();
  const navigate = useNavigate();
    const handleLogout = async () => {
        await logout();
        navigate("/login");
      };

      if (isLoading) {
        return (
          <div className="flex flex-col items-center h-screen ">
            <CircularProgress size={30} />
          </div>
        );
      }
    
      if (isError) {
        return (
          <Snackbar open={isError} autoHideDuration={60}>
            <Alert severity="error" sx={{ width: "100%" }}>
              Couldn't logout, please try again!
            </Alert>
          </Snackbar>
        );
      }
  return (
    <AppBar1 position="absolute">
    <Toolbar
      sx={{
        pr: "24px",
        // backgroundColor: 'primary'
      }}
    >
      {/* <IconButton
        edge="start"
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawer}
        sx={{
          marginRight: "36px",
          ...(open && { display: "none" }),
        }}
      > */}
        {/* <MenuIcon />
      </IconButton> */}
      <Typography
        component="h1"
        variant="h6"
        color="inherit"
        noWrap
        sx={{ flexGrow: 1 }}
      >
        {title}
      </Typography>
      <IconButton color="inherit">
        <Badge badgeContent={4} color="primary">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <DropdownMenu handleLogout={() => handleLogout()} />
      <Switch
        checked={mode}
        onChange={setMode}
        inputProps={{ "aria-label": "controlled" }}
        color="primary"
      />
    </Toolbar>
  </AppBar1>
  )
}

export default AppBar
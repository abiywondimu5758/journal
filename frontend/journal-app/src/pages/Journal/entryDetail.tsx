import React, { useState,ChangeEvent, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getEntryById,usePutEntry } from "../../queries"; // Implement this function to fetch a single entry by id
import {
  Alert,
  Avatar,
  Badge,
  Box,
  CircularProgress,
  Divider,
  IconButton,
  Snackbar,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";

import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

const drawerWidth: number = 340;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  open2?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "open2",
})<AppBarProps>(({ theme, open, open2 }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: open2 ? `calc(100% - ${2 * drawerWidth}px)` : `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  ...(open2 && {
    marginRight: drawerWidth,
    width: open ? `calc(100% - ${2 * drawerWidth}px)` : `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin-right"], {
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

const EndDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "fixed",
    top: 0,
    left: "auto",
    bottom: 0,
    right: open ? 0 : -drawerWidth, // Adjust drawerWidth as needed
    width: drawerWidth,
    transition: theme.transitions.create("right", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("right", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    }),
  },
}));


const EntryDetail: React.FC = () => {
  const [open, setOpen] = useState(true);
  const [open2, setOpen2] = useState(true);

  const [editingMode, setEditingMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');

  const { id } = useParams<{ id: string }>();
  const entryId = parseInt(id || "0", 10);

  const putEntryMutation = usePutEntry();



  const handleEditClick = () => {
    setEditingMode(true);
  };



  const handleTitleChange = (event:ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(event.target.value);
  };


  const toggleDrawer = () => {
    setOpen(prev => !prev);
  };
  const toggleDrawer2 = () => {
    setOpen2(prev => !prev);
  };
  

  const {
    data: entry,
    isLoading,
    isError,
  } = useQuery(["entry", entryId], () => getEntryById(entryId));

  useEffect(() => {
    if (!isLoading && !isError && entry) {
      setEditedTitle(entry.title);
    }
  }, [isLoading, isError, entry]);
  if (isLoading) {
    return (
      <div className="flex flex-col items-center h-screen ">
        <CircularProgress size={30} />
      </div>
    );
  }

  if (isError || !entry) {
    return (
      <>
        <div className="flex flex-col items-center h-screen ">
          <Alert severity="error" sx={{ width: "100%" }}>
            Couldn't load Entries!
          </Alert>
        </div>
        <Snackbar open={isError} autoHideDuration={60}>
          <Alert severity="error" sx={{ width: "100%" }}>
            Couldn't load Entries!
          </Alert>
        </Snackbar>
      </>
    );
  }

  const handleSaveClick = async () => {
    try {
      // Assuming you have the updated entry data in a variable called 'updatedEntry'
      const updatedEntry = { id:entry.id, title:editedTitle, content:entry.content};
  
      // Call the mutate function with the updated entry data
      await putEntryMutation.mutateAsync(updatedEntry);
  
      // The mutation was successful, you can handle the success if needed
      console.log('Entry updated successfully');
    } catch (error) {
      // Handle the error if the mutation fails
      console.error('Failed to update entry', error);
    }
  
  
  setEditingMode(false);
};

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="absolute" open={open} open2={open2}>
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
                        {editingMode ? (
              <TextField
                value={editedTitle}
                onChange={handleTitleChange}
                variant="outlined"
              />
            ) : (
              entry.title
            )}
          </Typography>
          <IconButton>
            {editingMode?(<SaveIcon onClick={handleSaveClick}/>):(<EditIcon onClick={handleEditClick}/>)}
            
          </IconButton>
          <IconButton >
            <Badge badgeContent={4} color="primary">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <Avatar
            alt="Remy Sharp"
            src="/Hero.jpg"
            sx={{ width: 30, height: 30, marginLeft: "10px",marginRight: "20px" }}
          />
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer2}
            sx={{
              marginRight: "-15px",
              ...(open2 && { display: "none" }),
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
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
      </Drawer>
      <EndDrawer variant="permanent" open={open2}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            px: [1],
          }}
        >
        {/* <div className="bg-white h-20 w-full"></div> */}
          <IconButton onClick={toggleDrawer2}>
            <ChevronRightIcon />
          </IconButton>
        </Toolbar>
        <Divider />
      </EndDrawer>
      <div className="w-full h-screen bg-white"></div>
    </Box>
    // <div>
    //   <h2>{entry?.title}</h2>
    //   <p>{entry?.content}</p>
    //   {/* Render other details as needed */}
    // </div>
  );
};

export default EntryDetail;

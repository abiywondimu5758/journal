import React, { useState,ChangeEvent, useEffect } from "react";
import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css';
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
import { styled, Theme } from "@mui/material/styles";
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

interface ContentProps {
  theme: Theme;
  drawerOpen: boolean;
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

const Content = styled("div")<ContentProps>(({ theme, drawerOpen }) => ({
  marginRight: drawerOpen ? drawerWidth : 0,
  transition: theme.transitions.create("margin-right", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
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
    whiteSpace: "nowrap",
    top: 0,
    left: "auto",
    bottom: 0,
    right: open ? 0 : -drawerWidth,
    width: drawerWidth,
    backgroundColor: theme.palette.primary,
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
      width: theme.spacing(7), // Set width to 0 when closed
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9), // Set width to 0 for larger breakpoints when closed
      },
    }),
  },
}));


const EntryDetail: React.FC = () => {
  const [open, setOpen] = useState(true);
  const [open2, setOpen2] = useState(false);

  const [editingMode, setEditingMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isEditError, setIsEditError] = useState(false);

  const { id } = useParams<{ id: string }>();
  const entryId = parseInt(id || "0", 10);

  const putEntryMutation = usePutEntry();

  // const quillRef = useRef<Quill | null>(null);

  // useEffect(() => {
  //   const quill = new Quill('#editor', {
  //     theme: 'snow', // or 'bubble'
  //     modules: {
  //       // Include necessary modules for collaborative editing
  //       toolbar: '#toolbar',
  //       history: {
  //         userOnly: true,
  //       },
  //       // Add more modules as needed
  //     },
  //     // Add your own configurations
  //   });

  //   quillRef.current = quill;
  // }, []);

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
      setEditedContent(entry.content);
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
      const updatedEntry = { id:entry.id, title:editedTitle, content:editedContent};
  
      // Call the mutate function with the updated entry data
      await putEntryMutation.mutateAsync(updatedEntry).then(() => {
        setIsSuccess(true);
      });
  
    } catch (error) {
      setIsEditError(true);
      <Snackbar open={isEditError} autoHideDuration={6}>
      <Alert severity="error" sx={{ width: "100%" }}>
        Couldn't Edit Entry!
      </Alert>
    </Snackbar>
    }
  
  
  setEditingMode(false);
};

  return (
    <> 
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
      <Content theme={undefined as never} drawerOpen={open2} className="h-full w-full">
      <div className="w-full h-screen py-20 px-20">

    <ReactQuill value = {editedContent} onChange={setEditedContent}  readOnly={!editingMode}className="h-full"/>
      </div>
      </Content>
    </Box>

         <Snackbar open={isSuccess} autoHideDuration={6000} onClose={()=>setIsSuccess(false)}>
    <Alert severity="success" sx={{ width: "100%" }}>
       successfully Edited!
    </Alert>
  </Snackbar></>
  );
};

export default EntryDetail;

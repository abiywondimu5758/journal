import  { useState, ChangeEvent } from "react";
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";
import { usePostEntry } from "../../queries"; // Implement this function to fetch a single entry by id
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

import { useNavigate } from "react-router-dom";

import SaveIcon from "@mui/icons-material/Save";

const drawerWidth: number = 340;
// interface response {
//     id: number;
//     title: string;
//     content: string;
// }

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "open2",
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

const CreateEntries = () => {
  const [open, setOpen] = useState(true);
  const [createdTitle, setCreatedTitle] = useState("");
  const [createdContent, setCreatedContent] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isCreateError, setIsCreateError] = useState(false);

  const navigate = useNavigate();
  const {mutateAsync, isLoading, isError} = usePostEntry();
  

  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };
  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCreatedTitle(event.target.value);
  };
  const handleSaveClick = async () => {
    try {
      // Assuming you have the updated entry data in a variable called 'updatedEntry'
      const createEntry = { title: createdTitle, content: createdContent };
      // Call the mutate function with the updated entry data
      await mutateAsync(createEntry,{
        onSuccess: (data: { id: number; }) => {

              setIsSuccess(true);

              navigate(`/entries/${data.id}`);
          },
      })
        

      
    } catch (error) {
      setIsCreateError(true);
      <Snackbar open={isCreateError} autoHideDuration={6}>
        <Alert severity="error" sx={{ width: "100%" }}>
          Couldn't Create Entry!
        </Alert>
      </Snackbar>;
    }
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
              <TextField
                value={createdTitle}
                onChange={handleTitleChange}
                variant="outlined"
              />
            </Typography>
            <IconButton>
              <SaveIcon onClick={handleSaveClick} />
            </IconButton>
            <IconButton>
              <Badge badgeContent={4} color="primary">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <Avatar
              alt="Remy Sharp"
              src="/Hero.jpg"
              sx={{
                width: 30,
                height: 30,
                marginLeft: "10px",
                marginRight: "20px",
              }}
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
        </Drawer>
        <div className="w-full h-screen py-20 px-20">
          <ReactQuill
            value={createdContent}
            onChange={setCreatedContent}
            readOnly={false}
            className="h-full"
          />
        </div>
      </Box>
      <Snackbar open={isSuccess} autoHideDuration={6000} onClose={()=>setIsSuccess(false)}>
    <Alert severity="success" sx={{ width: "100%" }}>
       successfully Created!
    </Alert>
  </Snackbar>
    </>
  );
};

export default CreateEntries;

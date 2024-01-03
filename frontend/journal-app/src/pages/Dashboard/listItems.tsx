// import * as React from 'react';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// // import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BookIcon from '@mui/icons-material/Book';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LogoutIcon from '@mui/icons-material/Logout';
import HelpIcon from '@mui/icons-material/Help';

// export const mainListItems = (
//   <React.Fragment>
//     <ListItemButton>
//       <ListItemIcon>
//         <DashboardIcon />
//       </ListItemIcon>
//       <ListItemText primary="Dashboard" />
//     </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         <MenuBookIcon />
//       </ListItemIcon>
//       <ListItemText primary="Journal" />
//     </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         <BookIcon />
//       </ListItemIcon>
//       <ListItemText primary="Books" />
//     </ListItemButton>

//   </React.Fragment>
// );

// export const secondaryListItems = (
//   <React.Fragment>
//     <ListItemButton>
//       <ListItemIcon>
//         <HelpIcon />
//       </ListItemIcon>
//       <ListItemText primary="Help" />
//     </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         <LogoutIcon />
//       </ListItemIcon>
//       <ListItemText primary="Logout" />
//     </ListItemButton>
//   </React.Fragment>
// );

export const mainListItemsData = [
  { primary: "Dashboard", icon: <DashboardIcon /> },
  { primary: "Journal", icon: <MenuBookIcon /> },
  { primary: "Books", icon: <BookIcon /> },
  // Add more menu items as needed
];

export const secondaryListItemsData = [
  { primary: "Help", icon: <HelpIcon /> },
  { primary: "Logout", icon: <LogoutIcon /> },
  // Add more menu items as needed
];
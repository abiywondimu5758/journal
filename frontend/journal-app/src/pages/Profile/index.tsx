import { DeleteForever } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Alert,
  Avatar,
  CircularProgress,
  Divider,
  Grid,
  Snackbar,
  Typography,
} from "@mui/material";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { useUser } from "../../queries";
import VerifiedIcon from '@mui/icons-material/Verified';
import { deepOrange } from "@mui/material/colors";

const Profile = () => {
  const { data: user, isLoading, isError } = useUser();
  console.log(user)

  if (isLoading) {
    return (
      <div className="flex flex-col items-center h-screen ">
        <CircularProgress size={30} />
      </div>
    );
  }

  if (isError || !user) {
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
    <div className="flex flex-col items-center h-fit space-y-8">
      <div className="flex flex-row justify-between items-center w-full">
        <div className="flex space-x-4 items-center">
          <ArrowBackIcon />
          <Avatar alt="Remy Sharp" sx={{width:50, height:50,  bgcolor: deepOrange[500] }}>{user.first_name.charAt(0)}{user.last_name.charAt(0)}</Avatar>
          <div className="flex flex-col items-start x-space-0">
            <Typography variant="h5">{user.first_name} {user.last_name}</Typography>
            <Typography variant="subtitle2" color="grey">
              My name is Remy and I love writing on my journal. I am easy going,
              professional person.{user.bio}
            </Typography>
          </div>
        </div>
        <div className="flex space-x-4 items-center">
          <Typography variant="caption" >
            {user.otp_validated ? (<div className="flex items-center space-x-1"><VerifiedIcon color='primary' sx={{fontSize:20}}/> <span>Email verified</span></div>): 'Email not verified'}
          </Typography>
          <div className="w-28 h-12 dark:bg-primaryPink bg-white rounded-md flex items-center px-4 space-x-1">
            <DeleteForever sx={{ color: "#FFFFFF" }} />
            <Typography variant="subtitle1" sx={{ color: "#FFFFFF" }}>
              Delete
            </Typography>
          </div>
        </div>
      </div>
      <Divider className="w-full " />
      <div className="px-10 w-full">
        <div className="flex flex-col space-y-4 mb-8 items-center">
          <Typography variant="subtitle1" color="GrayText">
            PROFILE IMAGE
          </Typography>
          <div className="w-80 h-72 bg-gray-500 flex items-center rounded-lg">
            {" "}
            <img src="/Hero.jpg" className="w-full h-full rounded-lg" />
          </div>
          <div
            className="flex items-center space-x-2 "
            onClick={() => console.log("hi")}
          >
            <InsertPhotoIcon sx={{ color: "#FF007A" }} />
            <Typography variant="subtitle1" sx={{ color: "#FF007A" }}>
              {" "}
              Change Profile Image{" "}
            </Typography>
          </div>
        </div>
        <Grid
          container
          rowSpacing={4}
          columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}
        >
          <Grid item xs={12} md={4}>
            <div className="flex flex-col space-y-4 ">
              <Typography variant="subtitle1" color="GrayText">
                PERSONAL DETAILS
              </Typography>
              <div className="w-full flex flex-col items-start justify-between h-16 py-2 px-4 rounded-md shadow-sm shadow-gray-100 dark:shadow-gray-700 dark:shadow-md">
                <Typography variant="body2" color="grayText">
                  Fullname
                </Typography>
                <Typography>{user.first_name} {user.last_name}</Typography>
              </div>
              <div className="w-full flex flex-col items-start justify-between h-16 py-2 px-4 rounded-md shadow-sm shadow-gray-100 dark:shadow-gray-700 dark:shadow-md">
                <Typography variant="body2" color="grayText">
                  Username
                </Typography>
                <Typography>{user.username}</Typography>
              </div>
              <div className="w-full flex flex-col items-start justify-between h-16 py-2 px-4 rounded-md shadow-sm shadow-gray-100 dark:shadow-gray-700 dark:shadow-md">
                <Typography variant="body2" color="grayText">
                  Email
                </Typography>
                <Typography>{user.email}</Typography>
              </div>
              <div className="w-full flex flex-col items-start justify-between h-16 py-2 px-4 rounded-md shadow-sm shadow-gray-100 dark:shadow-gray-700 dark:shadow-md">
                <Typography variant="body2" color="grayText">
                  BirthDate
                </Typography>
                <Typography>{user.birth_date}</Typography>
              </div>
              <div className="w-full flex flex-col items-start justify-between h-16 py-2 px-4 rounded-md shadow-sm shadow-gray-100 dark:shadow-gray-700 dark:shadow-md">
                <Typography variant="body2" color="grayText">
                  Joined Date
                </Typography>
                <Typography>{user.date_joined}</Typography>
              </div>
              <div className="w-full flex flex-col items-start justify-between h-16 py-2 px-4 rounded-md shadow-sm shadow-gray-100 dark:shadow-gray-700 dark:shadow-md">
                <Typography variant="body2" color="grayText">
                  Last Login
                </Typography>
                <Typography>{user.last_login}</Typography>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className="flex flex-col space-y-4 ">
              <Typography variant="subtitle1" color="GrayText">
                STATISTICS
              </Typography>
              <div className="w-full flex flex-col items-start justify-between h-16 py-2 px-4 rounded-md shadow-sm shadow-gray-100 dark:shadow-gray-700 dark:shadow-md">
                <Typography variant="body2" color="grayText">
                  Number of Journal Entries
                </Typography>
                <Typography>20</Typography>
              </div>
              <div className="w-full flex flex-col items-start justify-between h-16 py-2 px-4 rounded-md shadow-sm shadow-gray-100 dark:shadow-gray-700 dark:shadow-md">
                <Typography variant="body2" color="grayText">
                  Number of Total Edits
                </Typography>
                <Typography>110</Typography>
              </div>
              <div className="w-full flex flex-col items-start justify-between h-16 py-2 px-4 rounded-md shadow-sm shadow-gray-100 dark:shadow-gray-700 dark:shadow-md">
                <Typography variant="body2" color="grayText">
                  Most Edited Journal
                </Typography>
                <Typography>What do you actually want?</Typography>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className="flex flex-col space-y-4 ">
              <Typography variant="subtitle1" color="GrayText">
                PERSONAL DETAILS
              </Typography>
              <div className="w-full flex flex-col items-start justify-between h-16 py-2 px-4 rounded-md shadow-sm shadow-gray-100 dark:shadow-gray-700 dark:shadow-md">
                <Typography variant="body2" color="grayText">
                  Fullname
                </Typography>
                <Typography>Remy Sharp</Typography>
              </div>
              <div className="w-full flex flex-col items-start justify-between h-16 py-2 px-4 rounded-md shadow-sm shadow-gray-100 dark:shadow-gray-700 dark:shadow-md">
                <Typography variant="body2" color="grayText">
                  Username
                </Typography>
                <Typography>remy</Typography>
              </div>
              <div className="w-full flex flex-col items-start justify-between h-16 py-2 px-4 rounded-md shadow-sm shadow-gray-100 dark:shadow-gray-700 dark:shadow-md">
                <Typography variant="body2" color="grayText">
                  Email
                </Typography>
                <Typography>remysharp@gmail.com</Typography>
              </div>
              <div className="w-full flex flex-col items-start justify-between h-16 py-2 px-4 rounded-md shadow-sm shadow-gray-100 dark:shadow-gray-700 dark:shadow-md">
                <Typography variant="body2" color="grayText">
                  BirthDate
                </Typography>
                <Typography>12/12/89</Typography>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Profile;

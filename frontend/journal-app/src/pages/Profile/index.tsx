import { DeleteForever, Visibility, VisibilityOff } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Alert,
  Avatar,
  Button,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { useDeleteUser, useEmailVerificationOtp, useLogout, usePutUser, useUser, useVerifyEmail } from "../../queries";
import VerifiedIcon from "@mui/icons-material/Verified";
import { deepOrange } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { useEffect, useState } from "react";

import type { UploadProps } from "antd";
import { Upload } from "antd";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const customStyles = {
    color: "#ffffff",
  };
  const { data: user, isLoading, isError } = useUser();
  const putUserMutation = usePutUser();
  const deleteUserMutation = useDeleteUser();
  const logoutMutation = useLogout();
  const generateOtp = useEmailVerificationOtp();
  const verifyEmail = useVerifyEmail();
  const navigate = useNavigate();

  const [editingMode, setEditingMode] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isEditError, setIsEditError] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isDeleteError, setIsDeleteError] = useState(false);
  const [isVerifyingEmail, setIsVerifyingEmail] = useState(false);
  const [isGeneratingSuccess, setIsGeneratingSuccess] = useState(false);
  const [isGeneratingError, setIsGeneratingError] = useState(false);
  const [otp,setOtp] = useState('');
  const [isVerifyingSuccess, setIsVerifyingSuccess] = useState(false);
  const [isVerifyingError, setIsVerifyingError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // const passwordRef = useRef<HTMLInputElement>(null);
  // const bioRef = useRef<HTMLInputElement>();
  // const avatarRef = useRef<HTMLInputElement>();
  const props: UploadProps = {
    name: "file",
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        setFile(info.file?.originFileObj || null);

        // message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        // message.error(`${info.file.name} file upload failed.`);
        return;
      }
    },
  };

  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    birth_date: Date,
    password: "",
    bio: "",
    avatar: "",
    date_joined: "",
    otp_validated: "",
    last_login: "",
  });

  const handleEditingMode = () => {
    setEditingMode((prev) => !prev);
  };

  useEffect(() => {
    if (!isLoading && !isError && user) {
      setData({
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        email: user.email,
        birth_date: user.birth_date,
        password: "",
        bio: user.bio,
        avatar: user.avatar,
        date_joined: user.date_joined,
        otp_validated: user.otp_validated,
        last_login: user.last_login,
      });
    }
  }, [isLoading, isError, user]);
  if (isLoading || deleteUserMutation.isLoading || logoutMutation.isLoading) {
    return (
      <div className="flex flex-col items-center h-screen ">
        <CircularProgress size={30} />
      </div>
    );
  }

  if (isError || deleteUserMutation.isError || logoutMutation.isError) {
    return (
      <>
        <div className="flex flex-col items-center h-screen">
          <Alert severity="error" sx={{ width: "100%" }}>
            {isError && <>Couldn't Load Profile!</>}
            {deleteUserMutation.isError && <>Couldn't delete user</>}
            {logoutMutation.isError && <>Couldn't Logout</>}
          </Alert>
        </div>
        {/* <Snackbar open={isError} autoHideDuration={60}>
          <Alert severity="error" sx={{ width: "100%" }}>
            Couldn't Load Profile!
          </Alert>
        </Snackbar> */}
      </>
    );
  }

  const handleFieldChange = (fieldName: string, value: string) => {
    setData({ ...data, [fieldName]: value });
  };

  const handleSaveClick = async () => {
    try {
      // const birthDateValue = Date.now();
      // const passwordValue = passwordRef.current?.value || "";
      // Assuming you have the updated entry data in a variable called 'updatedEntry'
      const formData = new FormData();
      formData.append("first_name", data.first_name);
      formData.append("last_name", data.last_name);
      formData.append("username", data.username);
      formData.append("email", data.email);
      formData.append("birth_date", data.birth_date.toString());
      formData.append("password", data.password);
      formData.append("bio", data.bio);
      formData.append("avatar", file || "");

      // Call the mutate function with the updated entry data
      const response = await putUserMutation.mutateAsync(formData);

      if (response.ok) {
        setIsSuccess(true);
        setEditingMode(false);
      } else {
        setIsEditError(true);
      }
    } catch (error) {
      setIsEditError(true);
    }
  };
  const handleDelete = async () => {
    try {
      await (await deleteUserMutation).mutateAsync().then(() => {
        setIsSuccess(true);
        logoutMutation.mutate();
        navigate("/login");
      });
    } catch (error) {
      setIsDeleteError(true);
    }
  };

  const handleVerifyBtn = () => {
    const formData = new FormData();
    generateOtp.mutate(formData,{
      onError: () => {
        setIsGeneratingError(true);
      },
      onSuccess: () => {
        setIsVerifyingEmail(true);
        setIsGeneratingSuccess(true)
      }
    });
  }

  const handleVerification = () => {
    const formData = new FormData();
    formData.append('otp',otp);
    verifyEmail.mutate(formData,{
      onError: () => {
        setIsVerifyingError(true);
      },
      onSuccess: () => {
        setIsVerifyingSuccess(true);
        setIsVerifyingEmail(false);
      }
    });
  }

  return (
    <div className="flex flex-col items-center h-fit space-y-8 p-10">
      <div className="flex flex-col justify-between items-center w-full space-y-2 md:flex-row md:space-y-0">
        <div className="flex flex-col space-x-0 space-y-4 items-start md:flex-row md:space-x-4 md:items-center md:space-y-0">
          <div className="flex space-x-4 items-center">
          <ArrowBackIcon />
          <Avatar
            alt="Remy Sharp"
            sx={{ width: 50, height: 50, bgcolor: deepOrange[500] }}
            src={file ? URL.createObjectURL(file) : data.avatar}
          >
            {data.first_name.charAt(0)}
            {data.last_name.charAt(0)}
          </Avatar>
          </div>
          <div className="flex flex-col items-center md:items-start space-y-0">
            <div className="flex items-center space-x-2">
              <Typography variant="h5">
                {data.first_name} {data.last_name}
              </Typography>
              {!editingMode ? (
                <EditIcon sx={{ fontSize: 18 }} onClick={handleEditingMode} />
              ) : (
                ""
              )}
            </div>
            {!editingMode ? (
              <Typography variant="subtitle2" color="grey">
                {data.bio.length > 0 ? data.bio : "Update bio here"}
              </Typography>
            ) : (
              <TextField
                variant="standard"
                value={data.bio}
                sx={{ width: 500 }}
                onChange={(e) => handleFieldChange("bio", e.target.value)}
              />
            )}
          </div>
        </div>
        <div className="flex space-x-4 items-center">
          <Typography variant="caption">
            {data.otp_validated ? (
              <div className="flex items-center space-x-1">
                <VerifiedIcon color="primary" sx={{ fontSize: 20 }} />{" "}
                <span>Email verified</span>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-1">
                {isVerifyingEmail && <span>Email not verified</span>}{" "}
                {!isVerifyingEmail ? (
                  <span className="text-primaryPink font-semibold" onClick={handleVerifyBtn}>
                    {generateOtp.isLoading ? <CircularProgress size={30} /> :<>verify here</>}
                  </span>
                ) : (
                  <div className="flex items-center space-x-1">
                    <TextField
                      variant="standard"
                      defaultValue=''
                      sx={{ width: 300 }}
                      onChange={(e) =>
                        setOtp(e.target.value)
                      }
                    />
                    <Button onClick={handleVerification} disabled={otp.length < 5}>{verifyEmail.isLoading ? <CircularProgress size={30} /> :<>Verify</>}</Button>
                  </div>
                )}{" "}
              </div>
            )}
          </Typography>
          <div
            className="w-28 h-12 dark:bg-primaryPink bg-white rounded-md flex items-center px-4 space-x-1"
            onClick={handleDelete}
          >
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
            <img
              src={file ? URL.createObjectURL(file) : data.avatar}
              className="w-full h-full rounded-lg"
              alt="Upload profile picture"
            />
          </div>
          {editingMode ? (
            <Upload {...props}>
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
            </Upload>
          ) : (
            <></>
          )}
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
              <div
                className={`w-full flex flex-col items-start justify-between py-2 px-4 rounded-md shadow-sm shadow-gray-100 dark:shadow-gray-700 dark:shadow-md ${
                  !editingMode ? "h-16" : "h-20"
                }`}
              >
                <Typography variant="body2" color="grayText">
                  First Name
                </Typography>
                {!editingMode ? (
                  <Typography>{data.first_name}</Typography>
                ) : (
                  <TextField
                    variant="standard"
                    value={data.first_name}
                    fullWidth
                    onChange={(e) =>
                      handleFieldChange("first_name", e.target.value)
                    }
                  />
                )}
              </div>
              <div
                className={`w-full flex flex-col items-start justify-between py-2 px-4 rounded-md shadow-sm shadow-gray-100 dark:shadow-gray-700 dark:shadow-md ${
                  !editingMode ? "h-16" : "h-20"
                }`}
              >
                <Typography variant="body2" color="grayText">
                  Last Name
                </Typography>
                {!editingMode ? (
                  <Typography>{data.last_name}</Typography>
                ) : (
                  <TextField
                    variant="standard"
                    value={data.last_name}
                    fullWidth
                    onChange={(e) =>
                      handleFieldChange("last_name", e.target.value)
                    }
                  />
                )}
              </div>
              <div
                className={`w-full flex flex-col items-start justify-between py-2 px-4 rounded-md shadow-sm shadow-gray-100 dark:shadow-gray-700 dark:shadow-md ${
                  !editingMode ? "h-16" : "h-20"
                }`}
              >
                <Typography variant="body2" color="grayText">
                  Username
                </Typography>
                {!editingMode ? (
                  <Typography>{data.username}</Typography>
                ) : (
                  <TextField
                    variant="standard"
                    value={data.username}
                    fullWidth
                    onChange={(e) =>
                      handleFieldChange("username", e.target.value)
                    }
                  />
                )}
              </div>
              <div
                className={`w-full flex flex-col items-start justify-between py-2 px-4 rounded-md shadow-sm shadow-gray-100 dark:shadow-gray-700 dark:shadow-md ${
                  !editingMode ? "h-16" : "h-20"
                }`}
              >
                <Typography variant="body2" color="grayText">
                  Email
                </Typography>
                {!editingMode ? (
                  <Typography>{data.email}</Typography>
                ) : (
                  <TextField
                    variant="standard"
                    value={data.email}
                    fullWidth
                    onChange={(e) => handleFieldChange("email", e.target.value)}
                  />
                )}
              </div>
              <div
                className={`w-full flex flex-col items-start justify-between py-2 px-4 rounded-md shadow-sm shadow-gray-100 dark:shadow-gray-700 dark:shadow-md ${
                  !editingMode ? "h-16" : "h-20"
                }`}
              >
                <Typography variant="body2" color="grayText">
                  BirthDate
                </Typography>
                {!editingMode ? (
                  <Typography>
                    {new Date(data.birth_date.toString()).toLocaleDateString(
                      "en-US",
                      { year: "numeric", month: "long", day: "numeric" }
                    )}
                  </Typography>
                ) : (
                  <TextField
                    variant="standard"
                    value={data.birth_date.toString()}
                    fullWidth
                    onChange={(e) =>
                      handleFieldChange("birth_date", e.target.value)
                    }
                  />
                )}
              </div>
              <div className="w-full flex flex-col items-start justify-between h-16 py-2 px-4 rounded-md shadow-sm shadow-gray-100 dark:shadow-gray-700 dark:shadow-md">
                <Typography variant="body2" color="grayText">
                  Joined Date
                </Typography>
                <Typography>
                  {" "}
                  {new Date(data.date_joined.toString()).toLocaleDateString(
                    "en-US",
                    { year: "numeric", month: "long", day: "numeric" }
                  )}
                </Typography>
              </div>
              <div className="w-full flex flex-col items-start justify-between h-16 py-2 px-4 rounded-md shadow-sm shadow-gray-100 dark:shadow-gray-700 dark:shadow-md">
                <Typography variant="body2" color="grayText">
                  Last Login
                </Typography>
                <Typography>{data.last_login}</Typography>
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
            <div className="flex flex-col justify-between h-full">
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
              {/* <div className="w-28 h-12 dark:bg-primaryPink bg-white rounded-md flex items-center px-4 space-x-1">
            <SaveIcon sx={{ color: "#FFFFFF" }} onClick={handleSaveClick}/> 
            <Typography variant="subtitle1" sx={{ color: "#FFFFFF" }}>
              Save
            </Typography>
          </div> */}
              {editingMode && (
                <>
                  <div
                    className={`w-full flex flex-col items-start justify-between py-2 px-4 rounded-md shadow-sm shadow-gray-100 dark:shadow-gray-700 dark:shadow-md ${
                      !editingMode ? "h-16" : "h-20"
                    }`}
                  >
                    <Typography variant="body2" color="grayText">
                      Password
                    </Typography>
                    {!editingMode ? (
                      <></>
                    ) : (
                      <Input
                        error={isEditError}
                        // helperText={isEditError ? "Incorrect Password" : ""}
                        type={showPassword ? "text" : "password"}
                        // variant="standard"
                        fullWidth
                        onChange={(e) =>
                          handleFieldChange("password", e.target.value)
                        }
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={()=>{setShowPassword(prev => !prev)}}
                              
                            >
                              {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    )}
                  </div>
                  <div className="flex flex-col space-x-0 space-y-2 mt-4 md:flex-row md:space-x-4 md:space-y-0 md:mt-0">

                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={putUserMutation.isLoading ? "" : <SaveIcon />}
                    onClick={handleSaveClick}
                    disabled={data.password.length < 8}
                  >
                    {putUserMutation.isLoading ? (
                      <CircularProgress size={30} style={customStyles} />
                    ) : (
                      ("Save" as React.ReactNode)
                    )}
                  </Button>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={()=> setEditingMode(false)}
                    color="secondary"
                  >
                    {putUserMutation.isLoading ? (
                      <CircularProgress size={30} style={customStyles} />
                    ) : (
                      ("Cancel" as React.ReactNode)
                    )}
                  </Button>
                  </div>
                </>
              )}
            </div>
          </Grid>
        </Grid>
      </div>
      <Snackbar
        open={isSuccess}
        autoHideDuration={6000}
        onClose={() => setIsSuccess(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Profile edited successfully!
        </Alert>
      </Snackbar>
      <Snackbar
        open={isEditError}
        autoHideDuration={6000}
        onClose={() => setIsEditError(false)}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          Error while editing profile!
        </Alert>
      </Snackbar>
      
      <Snackbar open={isDeleteError} autoHideDuration={6}>
        <Alert severity="error" sx={{ width: "100%" }}>
          Error while deleting entry!
        </Alert>
      </Snackbar>

      <Snackbar
        open={isGeneratingSuccess}
        autoHideDuration={6000}
        onClose={() => setIsGeneratingSuccess(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Code sent to email, Please verify it!
        </Alert>
      </Snackbar>
      <Snackbar
        open={isGeneratingError}
        autoHideDuration={6000}
        onClose={() => setIsGeneratingError(false)}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          Error while sending code to email!
        </Alert>
      </Snackbar>

      <Snackbar
        open={isVerifyingSuccess}
        autoHideDuration={6000}
        onClose={() => setIsVerifyingSuccess(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Email verified successfully!
        </Alert>
      </Snackbar>
      <Snackbar
        open={isVerifyingError}
        autoHideDuration={6000}
        onClose={() => setIsVerifyingError(false)}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          Error while verifying email!
        </Alert>
      </Snackbar>
      
    </div>
  );
};

export default Profile;

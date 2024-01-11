import React, { useState } from "react";
import {
  Alert,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import "./index.css";
import { Link } from "react-router-dom";
import {
  useLogin,
  usePostChangePassword,
  usePostForgotPassword,
  usePostVerifyOtp,
} from "../../queries";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Visibility, VisibilityOff } from "@mui/icons-material";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// function Copyright(props: any) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" to={"https://mui.com/"} >
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoginError, setIsLoginError] = useState(false);
  const [emptyValue, setEmptyValue] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isVerifyOtp, setIsVerifyOtp] = useState(false);
  const [isSetPassword, setIsSetPassword] = useState(false);
  const [isSendingOtpSuccess, setIsSendingOtpSuccess] = useState(false);
  const [isSendingOtpError, setIsSendingOtpError] = useState(false);
  const [isVerifyOtpSuccess, setIsVerifyOtpSuccess] = useState(false);
  const [isVerifyOtpError, setIsVerifyOtpError] = useState(false);
  const [isPasswordChangeSuccess, setIsPasswordChangeSuccess] = useState(false);
  const [isPasswordChangeError, setIsPasswordChangeError] = useState(false);
  const [doesPasswordsMatch, setDoesPasswordsMatch] = useState(false);

  const navigate = useNavigate();
  const { loginMutation, isLoggedIn } = useLogin();
  const forgotPass = usePostForgotPassword();
  const verifyOtp = usePostVerifyOtp();
  const changePass = usePostChangePassword();

  React.useEffect(() => {
    // Check the condition and redirect if necessary
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);
  const handleLogin = async (event: React.FormEvent) => {
    // Access the input values using refs

    if (username == "" || password == "") {
      setEmptyValue(true);
      event.preventDefault();
    } else {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      // Call the useLogin mutation with the provided credentials
      loginMutation.mutate(formData, {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
          setIsLoginError(true);
          console.error(error.response.message);
          // if (error.response.status === 401) {
          //   console.log("whoooooh");
          // }
        },
        onSuccess: () => {
          setIsSuccess(true);
        },
      });
    }
  };
  const handleFrogotPassword = async (event: React.FormEvent) => {
    setEmptyValue(false);
    if (email === "") {
      setEmptyValue(true);
      event.preventDefault();
    } else {
      const formData = new FormData();
      formData.append("email", email);
      forgotPass.mutate(formData, {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
          event.preventDefault();
          setIsSendingOtpError(true);
          console.error(error.response.message);
          // if (error.response.status === 401) {
          //   console.log("whoooooh");
          // }
        },
        onSuccess: () => {
          event.preventDefault();
          setIsSendingOtpSuccess(true);
          setIsVerifyOtp(true);
          setIsForgotPassword(false);
          setIsSetPassword(false);
          setEmptyValue(false);
        },
      });
    }
  };
  const handleVerifyOtp = async (event: React.FormEvent) => {
    setEmptyValue(false);
    if (otp == "") {
      setEmptyValue(true);
      event.preventDefault();
    } else {
      const formData = new FormData();
      formData.append("otp", otp);
      verifyOtp.mutate(formData, {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
          setIsVerifyOtpError(true);
          console.error(error.response.message);
          // if (error.response.status === 401) {
          //   console.log("whoooooh");
          // }
        },
        onSuccess: () => {
          setIsVerifyOtpSuccess(true);
          setIsVerifyOtp(false);
          setIsForgotPassword(false);
          setIsSetPassword(true);
          setEmptyValue(false);
        },
      });
    }
  };

  const handlePasswordChange = async (event: React.FormEvent) => {
    setEmptyValue(false);
    if (otp == "") {
      setEmptyValue(true);
      event.preventDefault();
    } else {
      const formData = new FormData();
      formData.append("otp", otp);
      formData.append("new_password", newPassword);
      formData.append("confirm_new_password", confirmPassword);
      if (newPassword === confirmPassword) {
        changePass.mutate(formData, {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onError: (error: any) => {
            setIsPasswordChangeError(true);
            console.error(error.response.message);
            // if (error.response.status === 401) {
            //   console.log("whoooooh");
            // }
          },
          onSuccess: () => {
            setIsPasswordChangeSuccess(true);
            setIsVerifyOtp(false);
            setIsForgotPassword(false);
            setIsSetPassword(false);
            setEmptyValue(false);
          },
        });
      } else {
        setDoesPasswordsMatch(true);
      }
    }
  };

  return (
    <>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            backgroundColor: (theme: any) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {!isForgotPassword ? "Sign in" : "Enter Email"}
            </Typography>
            {!isForgotPassword && !isVerifyOtp && !isSetPassword ? (
              <Box
                component="form"
                noValidate
                onSubmit={handleLogin}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoComplete="username"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setUsername(event.target.value)
                  }
                  autoFocus
                  error={emptyValue}
                  helperText={emptyValue ? "Field is required" : ""}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(event.target.value)
                  }
                  error={emptyValue}
                  helperText={emptyValue ? "Field is required" : ""}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => {
                            setShowPassword((prev) => !prev);
                          }}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleLogin}
                  disabled={
                    loginMutation.isLoading ||
                    username.length < 4 ||
                    password.length < 8
                  }
                >
                  {" "}
                  {loginMutation.isLoading ? (
                    <CircularProgress size={30} />
                  ) : (
                    ("Sign In" as React.ReactNode)
                  )}
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link
                      to={""}
                      onClick={() => {
                        setIsForgotPassword((prev) => !prev);
                      }}
                    >
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <span className="font-medium">
                      {" "}
                      Don't have an account?{" "}
                      <Link to="/signup">
                        <span className="text-primaryPink font-semibold">
                          Signup
                        </span>
                      </Link>
                    </span>
                  </Grid>
                </Grid>
                {/* <Copyright sx={{ mt: 5 }} /> */}
              </Box>
            ) : isForgotPassword && !isVerifyOtp && !isSetPassword ? (
              <Box
                component="form"
                noValidate
                onSubmit={handleLogin}
                sx={{ mt: 1, width: "100%" }}
              >
                {" "}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  type="email"
                  autoComplete="email"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(event.target.value)
                  }
                  autoFocus
                  error={emptyValue}
                  helperText={emptyValue ? "Field is required" : ""}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleFrogotPassword}
                  disabled={forgotPass.isLoading || email.length < 5}
                >
                  {" "}
                  {forgotPass.isLoading ? (
                    <CircularProgress size={30} />
                  ) : (
                    ("Send OTP" as React.ReactNode)
                  )}
                </Button>
              </Box>
            ) : !isForgotPassword && isVerifyOtp && !isSetPassword ? (
              <Box
                component="form"
                noValidate
                onSubmit={handleLogin}
                sx={{ mt: 1, width: "100%" }}
              >
                {" "}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="otp"
                  label="OTP"
                  type={showPassword ? "text" : "password"}
                  defaultValue=""
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => {
                            setShowPassword((prev) => !prev);
                          }}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setOtp(event.target.value)
                  }
                  autoFocus
                  // error={emptyValue}
                  // helperText={}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleVerifyOtp}
                  disabled={verifyOtp.isLoading || otp.length < 6}
                >
                  {" "}
                  {verifyOtp.isLoading ? (
                    <CircularProgress size={30} />
                  ) : (
                    ("Verify OTP" as React.ReactNode)
                  )}
                </Button>
              </Box>
            ) : (
              <Box
                component="form"
                noValidate
                onSubmit={handleLogin}
                sx={{ mt: 1, width: "100%" }}
              >
                {" "}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="newPassword"
                  label="New Password"
                  type="password"
                  defaultValue=""
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setNewPassword(event.target.value)
                  }
                  autoFocus
                  error={doesPasswordsMatch}
                  helperText={
                    doesPasswordsMatch ? "Passwords do not match" : ""
                  }
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setConfirmPassword(event.target.value)
                  }
                  autoFocus
                  error={doesPasswordsMatch}
                  helperText={
                    doesPasswordsMatch ? "Passwords do not match" : ""
                  }
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handlePasswordChange}
                  disabled={
                    loginMutation.isLoading ||
                    newPassword.length < 8 ||
                    confirmPassword.length < 8
                  }
                >
                  {" "}
                  {loginMutation.isLoading ? (
                    <CircularProgress size={30} />
                  ) : (
                    ("Update Password" as React.ReactNode)
                  )}
                </Button>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
      <Snackbar
        open={isSuccess}
        autoHideDuration={6000}
        onClose={() => setIsSuccess(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Login successful!
        </Alert>
      </Snackbar>
      <Snackbar
        open={isLoginError}
        autoHideDuration={6000}
        onClose={() => setIsLoginError(false)}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          Error while Loging In!
        </Alert>
      </Snackbar>
      <Snackbar
        open={isSendingOtpSuccess}
        autoHideDuration={6000}
        onClose={() => setIsSendingOtpSuccess(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          OTP sent to email successfully!
        </Alert>
      </Snackbar>
      <Snackbar
        open={isSendingOtpError}
        autoHideDuration={6000}
        onClose={() => setIsSendingOtpError(false)}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          Error while sending OTP!
        </Alert>
      </Snackbar>
      <Snackbar
        open={isVerifyOtpSuccess}
        autoHideDuration={6000}
        onClose={() => setIsVerifyOtpSuccess(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          OTP verified successfully!
        </Alert>
      </Snackbar>
      <Snackbar
        open={isVerifyOtpError}
        autoHideDuration={6000}
        onClose={() => setIsVerifyOtpError(false)}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          Error while verifying OTP!
        </Alert>
      </Snackbar>
      <Snackbar
        open={isPasswordChangeSuccess}
        autoHideDuration={6000}
        onClose={() => setIsPasswordChangeSuccess(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          New password set successfully!
        </Alert>
      </Snackbar>
      <Snackbar
        open={isPasswordChangeError}
        autoHideDuration={6000}
        onClose={() => setIsPasswordChangeError(false)}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          Error while setting new password!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Login;

{
  /* <>
<div
  className={
    tw.w_full.h_screen.bg_white.dark(tw.bg_blackS1).flex.items_center
      .justify_center
  }
>
  <div
    className={
      tw.w_["2/3"].h_["3/4"].bg_black.flex.items_start.justify_between
        .shadow_2xl.shadow_primaryPink.rounded_xl
    }
  >
    <div className={tw.w_["1/2"].h_full.bg_white.rounded_l_xl}>
      <img src="/Auth.jpg" className={tw.h_full.w_full.rounded_l_xl} />
    </div>

    <div
      className={
        tw.h_full.bg_darkGray.rounded_r_xl.flex.flex_col.px_14.py_8
          .items_start.space_y_8.w_["2/3"]
      }
    >
      <div>
        <span
          className={tw.text_primaryPink.text_2xl.tracking_tighter.mb_40}
        >
          LOGIN
        </span>
      </div>
      <div className={tw.flex.flex_col.space_y_4.w_full}>
        <TextField
          id="filled-basic"
          label="Username"
          variant="filled"
          inputRef={usernameRef}
          style={textfieldStyles}
        />

        <TextField
          id="filled-basic"
          label="Password"
          variant="filled"
          inputRef={passwordRef}
          style={textfieldStyles}
        />

        <span className={tw.text_black.font_medium}>
          {" "}
          Don't have an account?{" "}
          <Link to="/signup">
            <span className={tw.text_primaryPink.font_semibold}>
              Signup
            </span>
          </Link>
        </span>
      </div>
      <ColorButton
        variant="contained"
        className={tw.w_full.h_10.text_primaryPink}
        onClick={handleLogin}
        disabled={loginMutation.isLoading}
      >
        {loginMutation.isLoading ? (
          <CircularProgress size={30} style={customStyles} />
        ) : (
          ("Login" as React.ReactNode)
        )}
      </ColorButton>

      <div></div>
    </div>
  </div>
</div>
</> */
}

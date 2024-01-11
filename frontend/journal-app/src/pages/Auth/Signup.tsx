import { useRef,useState } from "react";
import { Alert, CircularProgress, Snackbar, TextField } from "@mui/material";
// import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
// import { tw } from "typewind";
import { useRegister } from "../../queries";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers";
import Avatar from "@mui/material/Avatar";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";

// const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
//   color: theme.palette.getContrastText("#000000"),
//   backgroundColor: "#FF007A",
//   "&:hover": {
//     backgroundColor: "#FF007A",
//   },
// }));

const Signup = () => {
  
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const birthDateRef = useRef<HTMLInputElement>(null);

  const [isSuccess, setIsSuccess] = useState(false);
  const [isRegisterError, setIsRegisterError] = useState(false);

  const navigate = useNavigate();

  const { mutate, isLoading } = useRegister();

  const convertDateFormat = (inputDate: string) => {
    const parts = inputDate.split("/");
    const formattedDate = `${parts[2]}-${parseInt(parts[0], 10)}-${parseInt(
      parts[1],
      10
    )}`;
    return formattedDate;
  };

  const handleRegister = () => {
    
    // Access the input values using refs
    const firstnameValue = firstNameRef.current?.value || "";
    const lastnameValue = lastNameRef.current?.value || "";
    const usernameValue = usernameRef.current?.value || "";
    const emailValue = emailRef.current?.value || "";
    const passwordValue = passwordRef.current?.value || "";
    const confirmPasswordValue = confirmPasswordRef.current?.value || "";
    const birthdateValue = birthDateRef.current?.value || "";
    if (confirmPasswordValue === passwordValue) {
      // Call the useLogin mutation with the provided credentials

      mutate(
        {
          first_name: firstnameValue,
          last_name: lastnameValue,
          username: usernameValue,
          email: emailValue,
          password: passwordValue,
          birth_date: convertDateFormat(birthdateValue),
        },
        {
          onError: () => {
            // const errorMessage = "Error Signing Up";
            // message.error(errorMessage);
            setIsRegisterError(true);
          },
          onSuccess: () => {
            // const successMessage = "Sucessfully Signed Up";
            // message.success(successMessage);
            setIsSuccess(true)
            navigate("/login")
          },
        }
      );
    }
  };

  return (
    // <>
    //   <div
    //     className={
    //       tw.w_full.h_screen.bg_white.dark(tw.bg_blackS1).flex.items_center
    //         .justify_center
    //     }
    //   >
    //     <div
    //       className={
    //         tw.w_["2/3"].h_["3/4"].bg_black.flex.items_start.justify_between
    //           .shadow_2xl.shadow_primaryPink.rounded_xl
    //       }
    //     >
    //       <div className={tw.w_["1/2"].h_full.bg_white.rounded_l_xl}>
    //         <img src="/Auth.jpg" className={tw.h_full.w_full.rounded_l_xl} />
    //       </div>
    //       <div
    //         className={
    //           tw.h_full.bg_darkGray.rounded_r_xl.flex.flex_col.px_14.py_8
    //             .items_start.space_y_8.w_["2/3"]
    //         }
    //       >
    //         <div>
    //           <span className={tw.text_primaryPink.text_2xl.tracking_tighter}>
    //             SIGNUP
    //           </span>
    //         </div>
    //         <div
    //           className={tw.grid.grid_cols_1.md(tw.grid_cols_2.h_fit.gap_6)}
    //         >
    //           <TextField
    //             id="filled-basic"
    //             label="First Name"
    //             variant="filled"
    //             color="secondary"
    //             inputRef={firstNameRef}
    //           />
    //           <TextField
    //             id="filled-basic"
    //             label="Last Name"
    //             variant="filled"
    //             inputRef={lastNameRef}
    //           />
    //           <TextField
    //             id="filled-basic"
    //             label="Username"
    //             variant="filled"
    //             inputRef={usernameRef}
    //           />
    //           <TextField
    //             id="filled-basic"
    //             label="Email"
    //             variant="filled"
    //             inputRef={emailRef}
    //           />
    //           <TextField
    //             id="filled-basic"
    //             label="Password"
    //             variant="filled"
    //             inputRef={passwordRef}
    //           />
    //           <TextField
    //             id="filled-basic"
    //             label="Confirm Password"
    //             variant="filled"
    //             inputRef={confirmPasswordRef}
    //           />
    //           <DatePicker
    //           // id="filled-basic"
    //           label="Birth Date"
    //           // variant="filled"
    //           views={['year', 'month', 'day']}
    //           inputRef={birthDateRef}

    //           />

    //         </div>
    //         <span className={tw.text_black.font_medium}>
    //             {" "}
    //             Already have an account?{" "}
    //             <Link to='/login'>
    //             <span
    //               className={tw.text_primaryPink.font_semibold}
    //             >
    //               Login
    //             </span>
    //             </Link>
    //           </span>
    //         <ColorButton
    //           variant="contained"
    //           className={tw.w_full.h_10.text_primaryPink}
    //           onClick={handleRegister}
    //           disabled={isLoading}
    //         >
    //           {isLoading ? (
    //             <CircularProgress size={30} style={customStyles} />
    //           ) : (
    //             ("Signup" as React.ReactNode)
    //           )}
    //         </ColorButton>
    //         <div></div>
    //       </div>
    //     </div>
    //   </div>
    // </>
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
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleRegister}
              sx={{ mt: 1 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="First Name"
                    name="FirstName"
                    autoComplete="FirstName"
                    inputRef={firstNameRef}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Last Name"
                    name="name"
                    autoComplete="LastName"
                    inputRef={lastNameRef}
                  />
                </Grid>{" "}
                <Grid item xs={12} md={6}>
                  {" "}
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    inputRef={emailRef}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    inputRef={usernameRef}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    autoComplete="password"
                    inputRef={passwordRef}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="ConfirmPassword"
                    label="Confirm Password"
                    name="ConfirmPassword"
                    type="password"
                    autoComplete="Confirm Password"
                    inputRef={confirmPasswordRef}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  {" "}
                  <DatePicker
                    // id="filled-basic"
                    label="Birth Date"
                    // variant="filled"
                    views={["year", "month", "day"]}
                    inputRef={birthDateRef}
                  />
                </Grid>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleRegister}
                disabled={isLoading}
              >
                {" "}
                {isLoading ? (
                  <CircularProgress size={30} />
                ) : (
                  ("SignUp" as React.ReactNode)
                )}
              </Button>
              <Grid container>
                <Grid item xs>
                  <span className=" font-medium">
                    {" "}
                    Already have an account?{" "}
                  </span>
                </Grid>
                <Grid item>
                  <Link to="/login">
                    <span className="text-primaryPink font-semibold">
                      Login
                    </span>
                  </Link>
                </Grid>
              </Grid>
              {/* <Copyright sx={{ mt: 5 }} /> */}
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Snackbar
        open={isSuccess}
        autoHideDuration={6000}
        onClose={() => setIsSuccess(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
         Account successfully Created!
        </Alert>
      </Snackbar>
      <Snackbar
        open={isRegisterError}
        autoHideDuration={6000}
        onClose={() => setIsRegisterError(false)}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          Error while Creating Account!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Signup;

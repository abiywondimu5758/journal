import React, { useRef } from "react";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
// import Stack from '@mui/material/Stack';
import { tw } from "typewind";
import "./index.css";
import { Link } from "react-router-dom";
import { useLogin } from "../../queries";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { message } from "antd";
// import { black } from '@mui/material/colors';

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText("#000000"),
  backgroundColor: "#FF007A",
  "&:hover": {
    backgroundColor: "#FF007A",
  },
}));

const Login = () => {
  const customStyles = {
    color: "#ffffff",
  };
  const textfieldStyles = {
    color: "#FF007A",
  };

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { loginMutation, isLoggedIn } = useLogin();

  React.useEffect(() => {
    // Check the condition and redirect if necessary
    if (isLoggedIn) {
      navigate("/entries");
    }
  }, [isLoggedIn, navigate]);
  const handleLogin = () => {
    // Access the input values using refs
    const usernameValue = usernameRef.current?.value || "";
    const passwordValue = passwordRef.current?.value || "";

    // Call the useLogin mutation with the provided credentials
    loginMutation.mutate(
      { username: usernameValue, password: passwordValue },
      {
        onError: () => {
          const errorMessage = "Error Logging In";
          message.error(errorMessage);
        },
        onSuccess: () => {
          const successMessage = "Sucessfully Logged In";
          message.success(successMessage);
        },
      }
    );
  };

  return (
    <>
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
    </>
  );
};

export default Login;

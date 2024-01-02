import { useRef, useState } from "react";
import { CircularProgress, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import { tw } from "typewind";
import { useRegister } from "../../queries";
import "./index.css";
import { Link } from "react-router-dom";
import { message } from "antd";

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText("#000000"),
  backgroundColor: "#FF007A",
  "&:hover": {
    backgroundColor: "#FF007A",
  },
}));

const Signup = () => {
  const customStyles = {
    color: "#ffffff",
  };
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);


  const { mutate, isLoading} = useRegister();

 
  const handleRegister = () => {
    // Access the input values using refs
    const firstnameValue = firstNameRef.current?.value || "";
    const lastnameValue = lastNameRef.current?.value || "";
    const usernameValue = usernameRef.current?.value || "";
    const emailValue = emailRef.current?.value || "";
    const passwordValue = passwordRef.current?.value || "";
    const confirmPasswordValue = confirmPasswordRef.current?.value || "";

    if (confirmPasswordValue === passwordValue) {
      // Call the useLogin mutation with the provided credentials

      mutate({
        first_name: firstnameValue,
        last_name: lastnameValue,
        username: usernameValue,
        email: emailValue,
        password: passwordValue,
      },      {
        onError: () => {
          const errorMessage = "Error Signing Up";
          message.error(errorMessage);
        },
        onSuccess: () => {
          const successMessage = "Sucessfully Signing Up";
          message.success(successMessage);
        },
      });
    }
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
              <span className={tw.text_primaryPink.text_2xl.tracking_tighter}>
                SIGNUP
              </span>
            </div>
            <div
              className={tw.grid.grid_cols_1.md(tw.grid_cols_2.h_["1/2"].gap_6)}
            >
              <TextField
                id="filled-basic"
                label="First Name"
                variant="filled"
                color="secondary"
                inputRef={firstNameRef}
              />
              <TextField
                id="filled-basic"
                label="Last Name"
                variant="filled"
                inputRef={lastNameRef}
              />
              <TextField
                id="filled-basic"
                label="Username"
                variant="filled"
                inputRef={usernameRef}
              />
              <TextField
                id="filled-basic"
                label="Email"
                variant="filled"
                inputRef={emailRef}
              />
              <TextField
                id="filled-basic"
                label="Password"
                variant="filled"
                inputRef={passwordRef}
              />
              <TextField
                id="filled-basic"
                label="Confirm Password"
                variant="filled"
                inputRef={confirmPasswordRef}
              />
              <span className={tw.text_black.font_medium}>
                {" "}
                Already have an account?{" "}
                <Link to='/login'>
                <span
                  className={tw.text_primaryPink.font_semibold}
                >
                  Login
                </span>
                </Link>
              </span>
            </div>
            <ColorButton
              variant="contained"
              className={tw.w_full.h_10.text_primaryPink}
              onClick={handleRegister}
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress size={30} style={customStyles} />
              ) : (
                ("Signup" as React.ReactNode)
              )}
            </ColorButton>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;

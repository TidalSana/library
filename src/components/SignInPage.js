import { Typography } from "@mui/material";
import GoogleButton from "react-google-button";

const SignIn = (props) => {
  const { click } = props;
  return (
    <div className="sign-in center-box flex">
      <Typography variant="h4" margin="1.5rem">
        {" "}
        Please sign in below
      </Typography>
      <GoogleButton onClick={click} />
    </div>
  );
};

export default SignIn;

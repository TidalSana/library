import GoogleButton from "react-google-button";

const SignIn = (props) => {
  const { click } = props;
  return (
    <div className="sign-in">
      <GoogleButton onClick={click} />
    </div>
  );
};

export default SignIn;

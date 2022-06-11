const LogOut = (props) => {
  const { logOff, pfp } = props;
  return (
    <div className="profile-section flex">
      <img className="profile-pic" src={pfp} alt="profile" />
      <div onClick={logOff} className="logout-text-div">
        Logout
      </div>
    </div>
  );
};

export default LogOut;

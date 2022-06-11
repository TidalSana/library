import "../../styles/Nav.css";
const Header = (props) => {
  const { pfp } = props;
  return (
    <div className="profile-section flex">
      <img src={pfp} alt="" />
    </div>
  );
};

export default Header;

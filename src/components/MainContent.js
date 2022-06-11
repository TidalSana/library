import Intro from "./content/Intro";
import Library from "./content/Library";
const MainContent = (props) => {
  const { send, change, remove, library } = props;
  return (
    <div className="main-content">
      <Intro send={send} change={change} />
      <Library remove={remove} library={library} />
    </div>
  );
};

export default MainContent;

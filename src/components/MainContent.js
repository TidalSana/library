import Intro from "./content/Intro";
import Library from "./content/Library";

const MainContent = (props) => {
  const { send, status, change, remove, update, library } = props;
  return (
    <div className="main-content">
      <Intro send={send} status={status} change={change} />
      <Library remove={remove} library={library} update={update} />
    </div>
  );
};

export default MainContent;

import Intro from "./content/Intro";
import Library from "./content/Library";

const MainContent = (props) => {
  const { user, send, status, readStatus, change, remove, update, library } =
    props;
  return (
    <div className="main-content">
      <Intro
        user={user}
        send={send}
        status={status}
        readStatus={readStatus}
        change={change}
      />
      <Library remove={remove} library={library} update={update} />
    </div>
  );
};

export default MainContent;

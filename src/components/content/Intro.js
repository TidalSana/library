import "../../styles/Intro.css";

const Intro = (props) => {
  const { send, change } = props;
  return (
    <div className="top-section">
      <div className="title-section">
        <h1 className="title">My Library</h1>
        <p className="intro">
          Hi my name is Joshua Semana and this is my take on the Library
          Project! We practiced Objects, prototypal inheritance and
          constructors. Of course we also used a lot of other techniques on top
          of this.
        </p>
      </div>
      <div className="form-container">
        <form onSubmit={send}>
          <div className="title-container">
            <label htmlFor="name">Book:</label>
            <input
              onChange={change}
              type="text"
              id="book-title"
              name="name"
              required
              defaultValue=""
            />
          </div>
          <div className="author-name">
            <label htmlFor="author">Author:</label>
            <input
              onChange={change}
              type="text"
              id="author-title"
              name="author"
              required
              defaultValue=""
            />
          </div>
          <div className="status">
            <label htmlFor="status"></label>
            <select
              name="status"
              defaultValue="Read"
              className="status-dropdown"
              onChange={change}
            >
              <option value="Read">Read</option>
              <option defaultValue value="Not Read">
                Not Read
              </option>
            </select>
          </div>
          <button type="submit" className="submit-info">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default Intro;

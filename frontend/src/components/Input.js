export default function Input({ foodName, handleChange, search, url }) {
  return (
    <div className="input-container">
      <h1> Search for a meal: </h1>
      <input
        className="input"
        placeholder="Search for a meal"
        value={foodName}
        onChange={handleChange}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            search(url);
          }
        }}
      />
      <button className="search" onClick={() => search(url)}>
        SEARCH
      </button>
    </div>
  );
}

function Search({ query, setQuery }) {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Rechercher un film..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}

export default Search;
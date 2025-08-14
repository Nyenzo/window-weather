import '../styles/SearchBar.css';

function SearchBar({ searchCity, setSearchCity, handleSearch }) {
  return (
    <div className="search-section">
      <form onSubmit={handleSearch} className='search-form'>
        <input
          type="text"
          placeholder="Another location"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          className='search-input'
        />   
        <button type="submit" className='search-button'/>
        </form>
    </div>
  );
}

export default SearchBar;
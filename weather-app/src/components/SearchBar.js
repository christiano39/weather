import React from "react";
import { TextField, Button } from "@material-ui/core";

const SearchBar = (props) => {
  const { searchText, onSearchChange, onSubmit, searchError } = props;

  return (
    <div className="search-container">
      <form onSubmit={onSubmit}>
        <TextField
          id="search-field"
          value={searchText}
          onChange={onSearchChange}
          placeholder="Search by city..."
        />
        <Button id="search-btn" variant="contained" color="primary">
          Add City
        </Button>
      </form>
      {searchError && <p className="error">{searchError}</p>}
    </div>
  );
};

export default SearchBar;

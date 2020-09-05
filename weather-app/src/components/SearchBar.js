import React from "react";
import { TextField, Button } from "@material-ui/core";

const SearchBar = (props) => {
  const { searchText, onSearchChange, onSubmit, searchError } = props;

  return (
    <div className="search-container">
      <form onSubmit={onSubmit}>
        <TextField
          value={searchText}
          onChange={onSearchChange}
          placeholder="Search by city..."
        />
        <Button>Search</Button>
        {searchError && <p className="error">{searchError}</p>}
      </form>
    </div>
  );
};

export default SearchBar;

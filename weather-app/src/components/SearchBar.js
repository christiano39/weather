import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";

const SearchBar = (props) => {
  const { searchText, onSearchChange, onSubmit, searchError } = props;

  return (
    <div className="search-container">
      <TextField
        value={searchText}
        onChange={onSearchChange}
        placeholder="Search by city..."
      />
      <Button onClick={onSubmit}>Search</Button>
      {searchError && <p className="error">{searchError}</p>}
    </div>
  );
};

export default SearchBar;

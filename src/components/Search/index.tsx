import React, { useState } from 'react';
import Button from '../Button';

interface SearchProps {
  onClick: (text: string) => void;
}

const Search = ({ onClick }: SearchProps) => {
  const [searchText, setSearchText] = useState('');

  const onSearchButtonClick = (e: React.FormEvent) => {
    e.preventDefault();
    onClick(searchText);
  }
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.currentTarget.value);

  return (
    <header className="navbar bg-dark">
      <h3 className="text-light mx-auto">Flickr App</h3>
      <div className="container justify-content-end mobile-search-center">
        <form className="form-inline my-2 my-lg-0 ml-auto" onSubmit={onSearchButtonClick}>
          <div className="input-group display-inline-flex">
            <input
              type="search"
              name="search"
              className="form-control mr-sm-2 custom-search"
              placeholder="Search by title..."
              value={searchText}
              onChange={onChange}
            />
            <Button title="Search" />
          </div>
        </form>
      </div>
    </header>
  );
}

export default Search;

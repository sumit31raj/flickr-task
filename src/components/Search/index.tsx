import React, { useState } from 'react';
import Button from '../Button';

interface SearchProps {
  onClick: (text: string) => void;
}

const Search = ({ onClick }: SearchProps) => {
  const [searchText, setSearchText] = useState('');

  const onSearchButtonClick = () => onClick(searchText);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.currentTarget.value);

  return (
    <header className="navbar bg-dark">
      <div className="container">
        <form className="form-inline my-2">
          <div className="input-group">
            <input
              type="search"
              name="search"
              className="form-control mr-sm-2"
              placeholder="Search by title..."
              value={searchText}
              onChange={onChange}
            />
            <Button
              title="Search"
              onClick={onSearchButtonClick}
            />
          </div>
        </form>
      </div>
    </header>
  );
}

export default Search;

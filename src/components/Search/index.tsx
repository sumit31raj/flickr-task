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
    <div className="Search">
      <input 
        placeholder="Search Images!"
        value={searchText}
        onChange={onChange}
      />
      <Button title="Search" onClick={onSearchButtonClick}/>
    </div>
  );
}

export default Search;

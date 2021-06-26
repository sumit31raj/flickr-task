import React, { useState } from 'react';
import Search from '../../components/Search';
import CardContainer from '../../components/CardContainer';

const Home = () => {
  const [searchText, setSearchText] = useState('');

  return (
    <div className="Home">
      <Search onClick={text => setSearchText(text)} />
      <CardContainer searchText={searchText} />
    </div>
  );
}

export default Home;

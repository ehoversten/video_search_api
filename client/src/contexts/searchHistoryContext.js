import { useState, createContext, useEffect } from 'react';
import axios from 'axios';

const SearchContext = createContext();

const SearchContextProvider = (props) => {
  const localSearchResults = localStorage.getItem('searchResults');
  const keyword = localStorage.getItem('keyword');
  const [search, setSearch] = useState({
    results: null,
    keywordSearch: '',
  });

  useEffect(() => {
    console.log('Ran from inside videoHistoryContext');
  }, []);

  // const getLocalVideosArr = () => {
  //   const localData = localStorage.getItem('search');
  //   return localData ? JSON.parse(localData) : []; //parsing the string json and turning into json obj
  // };

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {props.children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
export { SearchContextProvider };

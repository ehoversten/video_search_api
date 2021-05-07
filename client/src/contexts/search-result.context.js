import { useState, createContext } from 'react';

const SearchResultContext = createContext();

const SearchResultContextProvider = (props) => {

    const [searchResults, setSearchResults] = useState([]);

    return (
        <SearchResultContext.Provider value={{ searchResults, setSearchResults }}>
            { props.children }
        </SearchResultContext.Provider>
    )
}

export default SearchResultContext;
export { SearchResultContextProvider };



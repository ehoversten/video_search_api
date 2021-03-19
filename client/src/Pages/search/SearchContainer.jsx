import React, { useContext, useEffect, useState } from 'react';
import SearchForm from '../../components/search-form/search-form';
import ResultsList from '../../components/results-list/results-list.component';

import SearchContext from '../../contexts/searchHistoryContext';
export default function SearchContainer() {
  const [videos, setVideos] = useState({});
  const { search, setSearch } = useContext(SearchContext);
  useEffect(() => {
    const getSearchResults = async () => {
      if (search.results && search.keywordSearch) {
        setVideos(search.results);
      }
    };
    getSearchResults();
    return () => {
      //cleanup
    };
  }, [search]);
  return (
    <>
      <SearchForm setData={setVideos} />
      <ResultsList dataSet={videos} />
    </>
  );
}

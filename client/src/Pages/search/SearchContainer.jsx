import React, { useState } from 'react';
import SearchForm from './SearchForm';
import ResultsList from './ResultsList';

export default function SearchContainer() {

    const [videos, setVideos] = useState({});

    return (
        <div>
            <SearchForm setData={setVideos}/>
            <ResultsList dataSet={videos}/>
        </div>
    )
}

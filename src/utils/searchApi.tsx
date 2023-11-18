import axios from 'axios';

interface Media {
    imdbID: string;
    Title: string;
    Poster: string;
    Type: string;
    Year: string;
}

interface MediaSearchResult {
    imdbID: string;
}

interface Rating {
    Source: string;
    Value: string;
}

interface OMDBMedia {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: Rating[];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: string;
}

export default OMDBMedia;


const SearchMedia = async (key: string) => {
    const omdbApiKey = process.env.REACT_APP_OMDB_API_KEY;
    let searchResults: MediaSearchResult[] = [];
    try {
        const response = await axios.get(`http://www.omdbapi.com/?apikey=${omdbApiKey}&s=${key}`);
        console.log('search response', response);
        searchResults = response.data.Search.map((item: any) => item["imdbID"]);
    } catch (error) {
        console.error('Error fetching search results:', error);
    }
    return searchResults;
};

const MediaDetails = async (imdbID: string) => {
    const omdbApiKey = process.env.REACT_APP_OMDB_API_KEY;
    let mediaMetaData: Media[] = [];
    try {
        const response = await axios.get(`http://www.omdbapi.com/?apikey=${omdbApiKey}&i=${imdbID}`);
        mediaMetaData = response.data.Search || [];
    } catch (error) {
        console.error('Error fetching search results:', error);
    }
    return mediaMetaData;
};


export type { MediaSearchResult, OMDBMedia };
export { SearchMedia, MediaDetails };

import axios from 'axios';

interface MediaSearchResult {
    id: string;
    type: "omdb" | "anime";
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


const SearchMedia = async (key: string) => {
    const omdbApiKey = process.env.REACT_APP_OMDB_API_KEY;
    let searchResults: MediaSearchResult[] = [];
    try {
        const response = await axios.get(`https://www.omdbapi.com/?apikey=${omdbApiKey}&s=${key}`);
        if (response.data["Response"] === "False")
            return searchResults;
        searchResults = response.data["Search"].map((item: any) => {
            return { "id": item["imdbID"], "type": "omdb" }
        });
    } catch (error) {
        console.error('Error fetching search results:', error);
    }
    return searchResults;
};

const MediaDetails = async (imdbID: string) => {
    const omdbApiKey = process.env.REACT_APP_OMDB_API_KEY;
    let mediaMetaData: OMDBMedia | null = null; // Initialize with null
    try {
        const response = await axios.get(`https://www.omdbapi.com/?apikey=${omdbApiKey}&i=${imdbID}`);
        mediaMetaData = response.data;
    } catch (error) {
        console.error('Error fetching search results:', error);
    }
    return mediaMetaData;
};


export type { MediaSearchResult, OMDBMedia };
export { SearchMedia, MediaDetails };

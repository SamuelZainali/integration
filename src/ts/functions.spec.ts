import {IMovie} from "./models/Movie";
import {movieSort} from "./functions";

describe('movieSort', () => {
    const testMovies: IMovie[] = [
        { Title: 'Z Movie', imdbID: '1', Type: 'movie', Poster: '', Year: '2000' },
        { Title: 'A Movie', imdbID: '2', Type: 'movie', Poster: '', Year: '2005' },
        { Title: 'C Movie', imdbID: '3', Type: 'movie', Poster: '', Year: '1999' },
        { Title: 'B Movie', imdbID: '4', Type: 'movie', Poster: '', Year: '2010' },
    ];

    it('should sort movies in descending order by title by default', () => {
        const sortedMovies = movieSort(testMovies);
        expect(sortedMovies).toEqual([
            { Title: 'A Movie', imdbID: '2', Type: 'movie', Poster: '', Year: '2005' },
            { Title: 'B Movie', imdbID: '4', Type: 'movie', Poster: '', Year: '2010' },
            { Title: 'C Movie', imdbID: '3', Type: 'movie', Poster: '', Year: '1999' },
            { Title: 'Z Movie', imdbID: '1', Type: 'movie', Poster: '', Year: '2000' },
        ]);
    });

    it('should sort movies in ascending order by title when desc is false', () => {
        const sortedMovies = movieSort(testMovies, false);
        expect(sortedMovies).toEqual([
            { Title: 'Z Movie', imdbID: '1', Type: 'movie', Poster: '', Year: '2000' },
            { Title: 'C Movie', imdbID: '3', Type: 'movie', Poster: '', Year: '1999' },
            { Title: 'B Movie', imdbID: '4', Type: 'movie', Poster: '', Year: '2010' },
            { Title: 'A Movie', imdbID: '2', Type: 'movie', Poster: '', Year: '2005' },
        ]);
    });

    it('should return an empty array when given an empty array', () => {
        const sortedMovies = movieSort([]);
        expect(sortedMovies).toEqual([]);
    });

});

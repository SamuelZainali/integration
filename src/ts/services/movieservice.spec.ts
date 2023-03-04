import { IMovie } from "../models/Movie";
import { getData } from "./movieservice";
import axios from "axios";

jest.mock("axios");

describe("getData", () => {
    const searchText = "test";
    const movies: IMovie[] = [
        {
            Title: "Test Movie",
            Year: "2022",
            imdbID: "123456",
            Type: "movie",
            Poster: "http://test.poster.com",
        },
    ];

    afterEach(() => {
        jest.resetAllMocks();
    });

    it("should return an array of movies if axios call is successful", async () => {
        const axiosResponse = {
            data: {
                Search: movies,
            },
        };
        (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce(
            axiosResponse
        );

        const result = await getData(searchText);

        expect(result).toEqual(movies);
        expect(axios.get).toHaveBeenCalledWith(
            `http://omdbapi.com/?apikey=416ed51a&s=${searchText}`
        );
    });

    it("should return an empty array if axios call fails", async () => {
        (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValueOnce(
            new Error("Network Error")
        );

        const result = await getData(searchText);

        expect(result).toEqual([]);
        expect(axios.get).toHaveBeenCalledWith(
            `http://omdbapi.com/?apikey=416ed51a&s=${searchText}`
        );
    });
});

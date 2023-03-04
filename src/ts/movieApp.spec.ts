import { IMovie } from "./models/Movie";
import { handleSubmit, createHtml, displayNoResult } from "./movieApp";
import { getData } from "./services/movieservice";
import { JSDOM } from "jsdom";

jest.mock("./services/movieservice");

const { window } = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
global.document = window.document;
global.window = window;

describe("handleSubmit", () => {
    let searchText: string;
    let movies: IMovie[];
    let container: HTMLDivElement;

    beforeEach(() => {
        searchText = "Test search text";
        movies = [
            {
                Title: "Test movie",
                imdbID: "tt1234567",
                Type: "movie",
                Poster: "",
                Year: "2021",
            },
        ];
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        document.body.removeChild(container);
    });

    it("should call getData with the search text and display the movies if there are results", async () => {
        (getData as jest.Mock).mockResolvedValueOnce(movies);

        const form = document.createElement("form");
        const input = document.createElement("input");
        form.appendChild(input);
        container.appendChild(form);

        input.value = searchText;

        await handleSubmit();

        expect(getData).toHaveBeenCalledWith(searchText);
        expect(createHtml).toHaveBeenCalledWith(movies, container);
        expect(displayNoResult).not.toHaveBeenCalled();
    });

    it("should display 'No results found' message if there are no movies", async () => {
        (getData as jest.Mock).mockResolvedValueOnce([]);

        const form = document.createElement("form");
        const input = document.createElement("input");
        form.appendChild(input);
        container.appendChild(form);

        input.value = searchText;

        await handleSubmit();

        expect(getData).toHaveBeenCalledWith(searchText);
        expect(createHtml).not.toHaveBeenCalled();
        expect(displayNoResult).toHaveBeenCalledWith(container);
    });

    it("should display 'No results found' message if getData throws an error", async () => {
        (getData as jest.Mock).mockRejectedValueOnce(new Error("Test error"));

        const form = document.createElement("form");
        const input = document.createElement("input");
        form.appendChild(input);
        container.appendChild(form);

        input.value = searchText;

        await handleSubmit();

        expect(getData).toHaveBeenCalledWith(searchText);
        expect(createHtml).not.toHaveBeenCalled();
        expect(displayNoResult).toHaveBeenCalledWith(container);
    });
});

describe("createHtml", () => {
    const movies: IMovie[] = [
        {
            Title: "The Matrix",
            imdbID: "tt0133093",
            Type: "movie",
            Poster: "https://example.com/poster.jpg",
            Year: "1999",
        },
        {
            Title: "Inception",
            imdbID: "tt1375666",
            Type: "movie",
            Poster: "https://example.com/poster2.jpg",
            Year: "2010",
        },
    ];

    it("should create HTML elements for each movie and add them to the container", () => {
        const container = document.createElement("div");
        createHtml(movies, container);

        expect(container.children.length).toBe(movies.length);

        for (let i = 0; i < movies.length; i++) {
            const movie = container.children.item(i) as HTMLDivElement;
            expect(movie.tagName).toBe("DIV");
            expect(movie.classList.contains("movie")).toBe(true);

            const title = movie.querySelector("h3");
            expect(title?.textContent).toBe(movies[i].Title);

            const img = movie.querySelector("img");
            expect(img?.src).toBe(movies[i].Poster);
            expect(img?.alt).toBe(movies[i].Title);
        }
    });
});
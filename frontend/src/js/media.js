import api from "./APIClient.js"

const ROWSTART = '<div class="row">';

let enc = new TextDecoder("utf-8");

// Get all the media in the database
let mediaRequest = await api.fetchAllMedia();
let movies = mediaRequest.data.results;
console.log(movies);

// Get all of the media types in the database
let mediaTypesRequest = await api.fetchMediaTypes();
let mediaTypes = mediaTypesRequest.data.results;
console.log(mediaTypes);

// Get all of the ageratings
let ageRatingsRequest = await api.fetchAgeRatings();
let ageRatings = ageRatingsRequest.data.results;
console.log(ageRatings);

// Get all of the languages
let languagesRequest = await api.fetchLanguages();
let languages = languagesRequest.data.results;
console.log(languages);
console.log(languages[0].Name)

// Get all of the streaming services
let genreRequest = await api.fetchGenres();
let genres = genreRequest.data.results;
console.log(genres);

export function buildMediaCard(movie) {
    return `<div class="card m-5" data-bs-toggle="modal" data-bs-target="#modal${movie.MediaId}" style="width: 18rem;">
                <img src=${movie.Poster} class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${movie.Title}</h5>
                </div>
            </div>`;
}

export async function buildModal(movie, reviews) {
    let ageRating = `${movie.AgeRatingType}\n${movie.AgeRatingDescription}`;
    let averageRating = movie.AverageRating;
    let castCrew = movie.CastCrew.replaceAll(',', '<br>');
    let description = movie.Description;
    let genre = movie.Genre;
    let language = movie.Language;
    let mediaId = movie.MediaId;
    let mediaType = movie.MediaType;
    let poster = movie.Poster;
    let publisherId = movie.Publisher;
    let releaseDate = movie.ReleaseDate.slice(0, -14);
    let runTime = movie.RunTime / 60000;
    let streamingServices = movie.StreamingService.replaceAll(',', '<br>');
    let title =  movie.Title;
    let reviewsText = '';
    for(const [key, value] of Object.entries(reviews)) {
        let userRequest = await api.fetchUserById(value.UserId);
        let user = JSON.parse(userRequest);
        let uint8Array = new Uint8Array(value.Description.data);
        let initialDescription = new TextDecoder("utf-8").decode(uint8Array);
        console.log(initialDescription);
        reviewsText += `<li class="list-group-item review-item">
                            <div class="d-flex align-items-center justify-content-between me-5">
                            <h5>${user.FirstName} ${user.LastName}</h5>
                            <h5><i class="fa-solid fa-star"></i> ${value.Rating}</h5>
                            </div>
                            <p>${initialDescription}</p>
                        </li>`
    }
    // let genres = await api.fetchMediaGenres(mediaId);
    // console.log(genres.data.results)
    return `<div class="modal" id="modal${movie.MediaId}" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered modal-xl">
                <div class="modal-content">
                <div class="modal-body">
                    <div class="d-flex gap-3">
                    <div>
                        <img src=${poster} id="movie-poster" class="card-img-top" alt="...">
                        <table class="table">
                        <tbody>
                            <tr>
                            <th scope="row">Release Date</th>
                            <td>${releaseDate}</td>
                            </tr>
                            <tr>
                            <th scope="row">Runtime</th>
                            <td>${runTime}</td>
                            </tr>
                            <tr>
                            <th scope="row">Media Type</th>
                            <td>${mediaType}</td>
                            </tr>
                            <tr>
                            <th scope="row">Publisher</th>
                            <td>${publisherId}</td>
                            </tr>
                            <tr>
                            <th scope="row">Language</th>
                            <td>${language}</td>
                            </tr>
                            <tr>
                            <th scope="row">Age Rating</th>
                            <td>${ageRating}</td>
                            </tr>
                            <tr>
                            <th scope="row">Streaming Services</th>
                            <td>${streamingServices}</td>
                            </tr>
                            <tr>
                            <th scope="row">Cast & Crew</th>
                            <td>${castCrew}</td>
                            </tr>
                            <tr>
                            <th scope="row">Genres</th>
                            <td>${genre}</td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                    <div class="d-flex flex-column w-100">
                        <div class="d-flex align-items-center justify-content-between me-5">
                        <h1>${title}</h1>
                        <h3><i class="fa-solid fa-star"></i> ${averageRating}</h3>
                        </div>
                        <p>${description}</p>
                        <h3>Reviews</h3>
                        <ul class="list-group reviews h-100">
                        ${reviewsText}
                        </ul>
                    </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Watch Later</button>
                    <button type="button" class="btn btn-primary">Review</button>
                </div>
                </div>
            </div>
            </div>`
}

function clearMedia() { 
    const body = document.getElementById("card-container");

    while(body.hasChildNodes()) {
        body.removeChild(body.childNodes[0]);
    }
}

export async function loadMedia(movies) {
    
    clearMedia();

    // Create a card and modal for each media entry
    let col = 0;
    let mediaCount = 0;
    let body = document.getElementById("card-container");

    for(const [key, value] of Object.entries(movies)) {
        console.log(value)
        let mediaResponse = await api.fetchMedia(value.MediaId);
        let media = mediaResponse.data.results[0];
        let reviewsResponse = await api.fetchReviews(value.MediaId);
        let reviews = reviewsResponse.data.results;
        // console.log(media);
        // console.log(reviews);
        let card = buildMediaCard(media);
        let modal = await buildModal(media, reviews);
        body.innerHTML += card + modal;
        mediaCount++;
        col++;
    }
}

loadMedia(movies)
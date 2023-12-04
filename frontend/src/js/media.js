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

function buildMediaCard(title, i) {
    return `<div class="card m-5" data-bs-toggle="modal" data-bs-target="#modal${i}" style="width: 18rem;">
                <img src="https://picsum.photos/300/200" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                </div>
            </div>`;
}
function buildModal(movie, i) {
    let ageRating = movie.AgeRatingId == 5 ? ageRatings[movie.AgeRatingId - 1] : 'UR';
    let averageRating = movie.AverageRating;
    let description = movie.Description;
    let language = languages[movie.LanguageId - 1].Name;
    let mediaId = movie.MediaId;
    let mediaType = mediaTypes[movie.MediaTypeId - 1].Name;
    let poster = movie.Poster;
    let publisherId = movie.PublisherId;
    let releaseDate = movie.ReleaseDate.slice(0, -14);
    let runTime = movie.RunTime / 60000;
    let title =  movie.Title;
    // let genres = await api.fetchMediaGenres(mediaId);
    // console.log(genres.data.results)
    return `<div class="modal" id="modal${i}" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered modal-xl">
                <div class="modal-content">
                <div class="modal-body">
                    <div class="d-flex gap-3">
                    <div>
                        <img src="https://picsum.photos/300/200" class="card-img-top" alt="...">
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
                            <td></td>
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
                            <td></td>
                            </tr>
                            <tr>
                            <th scope="row">Director</th>
                            <td></td>
                            </tr>
                            <tr>
                            <th scope="row">Genres</th>
                            <td></td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                    <div class="d-flex flex-column w-100">
                        <div class="d-flex align-items-center justify-content-between me-5">
                        <h1>${title}</h1>
                        <h3><i class="fa-solid fa-star"></i> ${averageRating}</h3>
                        </div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque eos illo earum in quam inventore minus amet, laborum adipisci dolores numquam, expedita magnam porro soluta eius. Sed laboriosam non, fugit cum dolorem commodi sunt earum provident dolor dolore at iure eum facere. Tempora nisi sed explicabo officiis alias voluptate amet!</p>
                        <h3>Reviews</h3>
                        <ul class="list-group reviews h-100">
                        <li class="list-group-item review-item">
                            <div class="d-flex align-items-center justify-content-between me-5">
                            <h5>msabrams</h5>
                            <h5><i class="fa-solid fa-star"></i> 9.7</h5>
                            </div>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. At voluptas laboriosam nobis veniam culpa quas facilis quasi recusandae assumenda rerum molestiae et deserunt repellat eum, commodi accusamus quia est harum reiciendis sequi consequuntur quis atque non? Veniam quod aut odio. Quis sequi quia perferendis non qui. Facilis alias nam culpa.</p>
                        </li> 
                        <li class="list-group-item review-item">
                            <div class="d-flex align-items-center justify-content-between me-5">
                            <h5>msabrams</h5>
                            <h5><i class="fa-solid fa-star"></i> 9.7</h5>
                            </div>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. At voluptas laboriosam nobis veniam culpa quas facilis quasi recusandae assumenda rerum molestiae et deserunt repellat eum, commodi accusamus quia est harum reiciendis sequi consequuntur quis atque non? Veniam quod aut odio. Quis sequi quia perferendis non qui. Facilis alias nam culpa.</p>
                        </li> 
                        <li class="list-group-item review-item">
                            <div class="d-flex align-items-center justify-content-between me-5">
                            <h5>msabrams</h5>
                            <h5><i class="fa-solid fa-star"></i> 9.7</h5>
                            </div>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. At voluptas laboriosam nobis veniam culpa quas facilis quasi recusandae assumenda rerum molestiae et deserunt repellat eum, commodi accusamus quia est harum reiciendis sequi consequuntur quis atque non? Veniam quod aut odio. Quis sequi quia perferendis non qui. Facilis alias nam culpa.</p>
                        </li> 
                        <li class="list-group-item review-item">
                            <div class="d-flex align-items-center justify-content-between me-5">
                            <h5>msabrams</h5>
                            <h5><i class="fa-solid fa-star"></i> 9.7</h5>
                            </div>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. At voluptas laboriosam nobis veniam culpa quas facilis quasi recusandae assumenda rerum molestiae et deserunt repellat eum, commodi accusamus quia est harum reiciendis sequi consequuntur quis atque non? Veniam quod aut odio. Quis sequi quia perferendis non qui. Facilis alias nam culpa.</p>
                        </li> 
                        <li class="list-group-item review-item">
                            <div class="d-flex align-items-center justify-content-between me-5">
                            <h5>msabrams</h5>
                            <h5><i class="fa-solid fa-star"></i> 9.7</h5>
                            </div>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. At voluptas laboriosam nobis veniam culpa quas facilis quasi recusandae assumenda rerum molestiae et deserunt repellat eum, commodi accusamus quia est harum reiciendis sequi consequuntur quis atque non? Veniam quod aut odio. Quis sequi quia perferendis non qui. Facilis alias nam culpa.</p>
                        </li> 
                        <li class="list-group-item review-item">
                            <div class="d-flex align-items-center justify-content-between me-5">
                            <h5>msabrams</h5>
                            <h5><i class="fa-solid fa-star"></i> 9.7</h5>
                            </div>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. At voluptas laboriosam nobis veniam culpa quas facilis quasi recusandae assumenda rerum molestiae et deserunt repellat eum, commodi accusamus quia est harum reiciendis sequi consequuntur quis atque non? Veniam quod aut odio. Quis sequi quia perferendis non qui. Facilis alias nam culpa.</p>
                        </li> 
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
// Create a card and modal for each media entry
let col = 0;
let mediaCount = 0;
let body = document.getElementById("card-container");

for(const [key, value] of Object.entries(movies)) {
    console.log(value)
    body.innerHTML += buildMediaCard(value.Title, mediaCount) + buildModal(value, mediaCount);
    mediaCount++;
    col++;
}
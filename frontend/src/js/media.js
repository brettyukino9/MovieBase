import api from "./APIClient.js"

let mediaRequest = await api.fetchAllMedia();
let movies = mediaRequest.data.results;
console.log(movies);

function buildMediaCard(title) {

    return `<div class="container m-5 d-block">
      <div class="row">
        <div class="col">
          <div class="card" data-bs-toggle="modal" data-bs-target="#exampleModal" style="width: 18rem;">
            <img src="https://picsum.photos/300/200" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${title}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>`;
}


for(const [key, value] of Object.entries(movies)) {
    console.log(value)
    let body = document.getElementById("card-container");
    body.innerHTML = body.innerHTML + buildMediaCard(value.Title);
}
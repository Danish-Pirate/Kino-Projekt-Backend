//Sends data from form to endpoint /// Endpoint = /bookings (POST)

$(document).ready(function () {

    $("#modal-film").submit(function (event) {
        let formData = {
            name: $("#name").val(),
            moviePrice: $("#moviePrice").val(),
            movieLength: $("#movieLength").val(),
            movieGenre: $("#movieGenre").val(),
            movieAgeRestriction: $("#movieAgeRestriction").val(),
            posterLink: $("#posterLink").val(),
        };

        $.ajax({
            type: "POST",
            url: "/addMovie",
            data: JSON.stringify(formData),
            dataType: "json",
            encode: true,
            headers: { "Content-Type": "application/json;charset=UTF-8" }
        }).done(function (data) {
            console.log(data);
        });
        event.preventDefault();
    });

});


async function deleteFilm(movieId) {
    await fetch('/deleteFilm/' + movieId, {
        method: 'DELETE'
    })
    refreshPage();

}

async function updateFilm(id) {

    let formDataEdit = {
        name: $("#editfilm-name" + id).val(),
        moviePrice: $("#editfilm-price" + id).val(),
        movieLength: $("#editfilm-length" + id).val(),
        movieGenre: $("#editfilm-genre" + id).val(),
        movieAgeRestriction: $("#editfilm-ageRestriction" + id).val(),
        posterLink: $("#editfilm-posterLink" + id).val(),
        movieId: $("#editfilm-movieId" + id).val(),
    };

    $.ajax({
        type: "PUT",
        url: "/editMovie/" + formDataEdit.movieId,
        data: JSON.stringify(formDataEdit),
        dataType: "json",
        encode: true,
        headers: { "Content-Type": "application/json;charset=UTF-8" }
    }).done(function (data) {
        console.log(data);
    });
    event.preventDefault();

    refreshPage();
}



function refreshPage() {

    setTimeout(() => window.location.reload(), 500)

}

//Pop up
function gallModal(element) {
    document.getElementById("modal-bookning").src = element.src;
}
//Accordion
function showAccordion() {
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        });
    }
}


class FilmRenderer {

    endpointUrlFilms = "/getAllMovie";

    constructor() {
        this.dataFilm = null;
        this.fetchDataFromFilms();
    }

    //Fetch data from Film
    async fetchDataFromFilms() {
        let responseFilms = await fetch(this.endpointUrlFilms);
        this.dataFilm = await responseFilms.json();
        this.updateUI();
    }

    updateUI() {
        //Loops over all Film entries
        for (let dataFilmIndex in this.dataFilm) {

            var entryFilm = this.dataFilm[dataFilmIndex];

            //sets target for JS
            let target = $("#film-cards");

            /***
             *

            KUN TAGET UD IMENS MAN IKKE KAN OPRETTE VISNINGER. MÅ IKKE SLETTES!

            //Array for show dates
            let dateList = new Array();

            //Populates show dates array, discards duplicate dates
            entryFilm.showList.forEach((showList) => {
                if (!dateList.includes(showList.date)) {
                    dateList.push(showList.date);
                }
            });

            //Sorts Array in ascending order by date
            let sortedDateList = dateList.sort((a, b) => {
                return new Date(a) - new Date(b)
            });
             */


            //First part of Film-Card
            var cards = `<div class="container mt-0 pt-0">
                      <div class="row border border-solid bg-light">
                          <div class="col-3 p-0">
                              <img src="${entryFilm.posterLink}" alt="Film poster" class="film-poster-img">
                          </div>
                          <div class="col-9 p-5">
                              <div class="row d-flex justify-content-space">
                                  <div class="col-4">
                                      <h4>Titel: </h4>
                                      <p>${entryFilm.name}</p>
                                  </div>
                                  <div class="col-4">
                                      <h4>Pris: </h4>
                                      <p>${entryFilm.moviePrice} kr.</p>
                                  </div>
                                  <div class="col-4">      
                                  <h4>Aldersgrænse: </h4>
                                  <p>${entryFilm.movieAgeRestriction} år</p>
                                  </div>
                              </div>
                              <div class="row d-flex justify-content-space">
                                <div class="col-4">
                                    <h4>Genre: </h4>
                                    <p>${entryFilm.movieGenre}</p>
                                    </div>
                                <div class="col-4">
                                
                                <!-- ANDET FORSØG -->
                 
                             
                                    <div  data-bs-toggle="modal" data-bs-target="#modal${entryFilm.movieId}">
                                         <button class="btn btn-primary">Opdater</button>
                                        
                                    </div>
                                </div>
                            </div>
                        
                            <div class="modal bg-dark bg-opacity-75 fade" tabindex="-1" role="dialog" id="modal${entryFilm.movieId}">
                                <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                                    <div class="modal-content">
                                        <div class="modal-body">
                        
                                            <form id="modal-film-edit" method="PUT">
                        
                                                <div id="editfilm-name-group" class="form-group">
                                                    <label for="editfilm-name${entryFilm.movieId}">Name</label>
                                                    <input
                                                            type="text"
                                                            class="form-control"
                                                            id="editfilm-name${entryFilm.movieId}"
                                                            name="editfilm-name"
                                                            value="${entryFilm.name}"
                                                    />
                                                </div>
                        
                                                <div id="editfilm-price-group" class="form-group">
                                                    <label for="editfilm-price${entryFilm.movieId}">Price</label>
                                                    <input
                                                            type="number"
                                                            class="form-control"
                                                            id="editfilm-price${entryFilm.movieId}"
                                                            name="editfilm-price"
                                                              value="${entryFilm.moviePrice}"
                                                    />
                                                </div>
                        
                                                <div id="editfilm-length-group" class="form-group">
                                                    <label for="editfilm-length${entryFilm.movieId}">Length</label>
                                                    <input
                                                            type="number"
                                                            class="form-control"
                                                            id="editfilm-length${entryFilm.movieId}"
                                                            name="editfilm-length"
                                                             value="${entryFilm.movieLength}"
                                                    />
                                                </div>
                        
                                                <div id="editfilm-genre-group" class="form-group">
                                                    <label for="editfilm-genre${entryFilm.movieId}">Genre</label>
                                                    <input
                                                            type="text"
                                                            class="form-control"
                                                            id="editfilm-genre${entryFilm.movieId}"
                                                            name="editfilm-genre"
                                                            value="${entryFilm.movieGenre}"
                                                    />
                                                </div>
                        
                                                <div id="editfilm-ageRestriction-group" class="form-group">
                                                    <label for="editfilm-ageRestriction${entryFilm.movieId}">Age Restriction</label>
                                                    <input
                                                            type="text"
                                                            class="form-control"
                                                            id="editfilm-ageRestriction${entryFilm.movieId}"
                                                            name="editfilm-ageRestriction"
                                                              value="${entryFilm.movieAgeRestriction}"
                                                    />
                                                </div>
                        
                                                <div id="editfilm-posterLink-group" class="form-group">
                                                    <label for="editfilm-posterLink${entryFilm.movieId}">Link til film billede</label>
                                                    <input
                                                            type="text"
                                                            class="form-control"
                                                            id="editfilm-posterLink${entryFilm.movieId}"
                                                            name="editfilm-posterLink"
                                                              value="${entryFilm.posterLink}"
                                                    />
                                                </div>
                                                <input
                                                            type="number"
                                                            id="editfilm-movieId${entryFilm.movieId}"
                                                            name="editfilm-movieId"
                                                            value="${entryFilm.movieId}"
                                                            hidden
                                                    />
                                                <button class="btn btn-success mt-2" data-bs-dismiss="modal" onclick="updateFilm(${entryFilm.movieId})">Opdater</button>
                                            </form>
                                        </div>
                                        <div class="modal-footer justify-content-center">
                                            <button type="button" class="btn btn-secondary modal-btn" data-bs-dismiss="modal" onclick="refreshPage()">Luk</button>
                                        </div>
                                    </div>
                               </div>         
                            </div>
                            <div class="col-4">
                                <button id="film-delete-btn" class="btn btn-primary" onclick="deleteFilm( ${entryFilm.movieId} )">Slet</button>
                            </div>
                          </div>
                      </div>
                      </div>
                      <div class="container mt-0 pt-0 mb-3">
                      <div class="row">
                  <button class="accordion fw-bold" onclick="showAccordion()">Visninger</button>
                      <div class="panel">
                          <table class="d-flex justify-content-center">
                              <tr>
                                  <th>Dato</th>
                                  <th>Visninger</th>
                              </tr></div>`;


            /**
             * KUN TAGET UD IMENS MAN IKKE KAN OPRETTE VISNINGER. MÅ IKKE SLETTES!


            //Loop for adding show times to dates for each film
            for (let i = 0; i < sortedDateList.length; i++) {
                //Finds week day from date
                let dateForweekDate = new Date(sortedDateList[i]);
                const options = { weekday: 'long'};
                let weekDayDone = new Intl.DateTimeFormat('dk-DK', options).format(dateForweekDate);
                //Makes first letter upper case
                weekDayDone = weekDayDone.charAt(0).toUpperCase() + weekDayDone.slice(1);

                cards += `<tr><th>${weekDayDone} d. ${sortedDateList[i]}</th>`;

                //Sorts time
                let timeArray = new Array();
                entryFilm.showList.forEach((show) => {
                    if (sortedDateList[i] == show.date) {
                        timeArray.push(show.time);
                    }
                });

                timeArray = timeArray.sort();


                //Adds time under date, if dates are identical
                //x keeps track of timeArray index
                let x = 0;
                entryFilm.showList.forEach((showList) => {
                    if (sortedDateList[i] == showList.date) {
                        cards += `<th class="px-4"><button>${timeArray[x]}</button></th>`;
                        x += 1;
                    }

                });

                cards += "</tr>";

            }
             */

            //Closing HTML
            cards += `</table></div></div></div>`;
            //Adds film-cards to HTML
            target.append(cards);
        }
    }
}

var filmRenderer = new FilmRenderer();



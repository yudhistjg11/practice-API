$('.search-button').on('click', function(){
    $.ajax({

        url : "http://www.omdbapi.com/?apikey=a4717296&s=" + $('.input-keyword').val(),
        success: results => {
            const movies = results.Search;
            let cards ="";
            movies.forEach(m => {
                cards += tampilCards(m);
                
            });
            $('.movie-container').html(cards);
    
            $('.modal-detail-button').on('click', function(){
                $.ajax({
                    url: 'http://www.omdbapi.com/?apikey=a4717296&i=' + $(this).data('imdbid'),
                    success: m => {
                        let movieDetail = tampilCardsDetail(m);
                    $('.modal-body').html(movieDetail);
                    },
                    error : (e) => {
                        console.log(e.responseText);
                    }
                })
            });
        },
        error: (e) => {
            console.log(e.responseText);
        }
    });
});




function tampilCards(m) {
    return `<div class="col-md-4 my-5">
            <div class="card">
                <img class="card-img-top" src="${m.Poster}" >
                <div class="card-body">
                <h5 class="card-title">${m.Title}</h5>
                <p class="card-subtitle mb-2 text-muted">${m.Year}</p>
                <a href="#" class="btn btn-primary modal-detail-button" data-toggle ="modal" data-target = "#movieDetailModal" data-imdbid = "${m.imdbID}">show details</a>
                    </div>
                </div>
            </div>`;
};

function tampilCardsDetail(m){
    return `<div class="container-fluid">
            <div class="row">
            <div class="col-md-3">
                <img src="${m.Poster}" class="img-fluid">
            </div>
            <div class="col-md">
                <ul class="list-group">
                <li class="list-group-item"><h4>${m.Title}(${m.Year})</h4></li>
                <li class="list-group-item"><strong>Director :</strong> ${m.Director}</li>
                <li class="list-group-item"><strong>Actors :</strong> ${m.Actors}</li>
                <li class="list-group-item"><strong>Writer :</strong> ${m.Writer}</li>
                <li class="list-group-item"><Strong>Sinopsis :</Strong><br> ${m.Plot}</li>
                </ul>
            </div>
            </div>
        </div>`;
};
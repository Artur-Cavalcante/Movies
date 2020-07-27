const { FavoriteMovie } = require('../../database/models/FavoriteMovie');

async function index(request, response) {
  //All movies
  FavoriteMovie.findAll()
    .then((movies) => {
      return response.json(movies);
    })
    .catch(err => {
      console.error('Error FavoriteMoviesController.index', err);

      return response.sendStatus(500);
    });
}

async function store(request, response) {
  //Save a movie
  let body = request.body;
  
  let {
   id, 
   title, 
   poster_path, 
   overview,
   release_date,
   name,
   vote_average
  } = body;
  
  if(id){

    let movie = await FavoriteMovie
      .findAll({
        where: {
          id: id
        }
      })
      .then((movieInfo) => {
        return movieInfo;
      })
      .catch((err) => {
        console.log('Error FavoriteMoviesController.store', err)
      });

    //Check if already not exist the movie in db 
    if(!movie[0]){
      FavoriteMovie
        .create({
          id: id, 
          title: title, 
          poster_path: poster_path, 
          overview: overview,
          release_date: release_date,
          name: name,
          vote_average: vote_average
        })
        .then(()=>{
          return response.sendStatus(201);
        })
        .catch((err)=>{
          console.log('Error FavoriteMoviesController.store', err)
        })
    }else{
      return response.sendStatus(409)
    }
  }else{
    return response.sendStatus(400)
  }
}

async function destroy(request, response) {
  //Delete a movie
  let { id } = request.query;

  //Check if exist parameter
  if (id) {
    //Check if exist before destroy
    let movie = await FavoriteMovie
      .findAll({
        where: {
          id: id
        }
      })
      .then((movieInfo) => {
        return movieInfo;
      })
      .catch((err) => {
        console.log('Error FavoriteMoviesController.destroy', err)
      });

    //If exist, destroy
    if (movie[0]) {
      await FavoriteMovie.destroy({
        where: {
          id: id
        }
      })
      return response.sendStatus(200);
    } else {
      return response.sendStatus(404);
    }
  } else {
    return response.sendStatus(400)
  }
}

module.exports = { index, store, destroy }
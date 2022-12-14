package group3.kino.bookingManager.controller;

import group3.kino.bookingManager.model.CinemaShow;
import group3.kino.bookingManager.service.IShowingService;
import group3.kino.bookingManager.service.ShowingService;
import group3.kino.movieAdministration.model.Movie;
import group3.kino.movieAdministration.service.IMovieAdminService;
import group3.kino.movieAdministration.service.MovieAdminService;
import group3.kino.util.TokenAuthenticator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class CinemaShowController {

    private IShowingService showService;
    private IMovieAdminService movieService;

    public CinemaShowController(ShowingService showService, MovieAdminService movieService) {
        this.showService = showService;
        this.movieService = movieService;
    }

    @PostMapping("addShowToMovie/{movieId}")
    public ResponseEntity<String> addShowToMovie(
            @RequestBody CinemaShow cinemaShow,
            @PathVariable("movieId") Long movieId,
            @RequestHeader("token") int key){
        if (!TokenAuthenticator.isTokenAuthenticated(key))
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);

        Movie movie = movieService.findById(movieId).get();
        movie.addCinemaShow(cinemaShow);
        cinemaShow.setMovie(movie);
        showService.save(cinemaShow);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("deleteShowFromMovie/{showId}")
    public ResponseEntity deleteShow(@PathVariable("showId") Long showId, @RequestHeader("token") int key) {
        if (!TokenAuthenticator.isTokenAuthenticated(key))
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);

        showService.deleteById(showId);
        return new ResponseEntity<>("Show with the ID: " + showId + " has been deleted", HttpStatus.OK);
    }
}

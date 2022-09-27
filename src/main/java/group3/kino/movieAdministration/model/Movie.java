package group3.kino.movieAdministration.model;

import group3.kino.bookingManager.model.cinemaShow;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Entity
@Getter
@Setter
public class Movie {

    @OneToMany
    List<cinemaShow> showList = new ArrayList<>();

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long movieId;
    private String name;
    private double movieLength;
    private String movieGenre;
    private int movieAgeRestriction;
    private double moviePrice;

    public Movie(Long movieId, String name, double movieLength, String movieGenre, int movieAgeRestriction, double moviePrice) {
        this.movieId = movieId;
        this.name = name;
        this.movieLength = movieLength;
        this.movieGenre = movieGenre;
        this.movieAgeRestriction = movieAgeRestriction;
        this.moviePrice = moviePrice;
    }

    public Movie() {

    }
}
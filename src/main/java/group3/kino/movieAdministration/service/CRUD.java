package group3.kino.movieAdministration.service;

import group3.kino.movieAdministration.model.Movie;

import java.util.Optional;
import java.util.Set;

public interface CRUD<T, ID> {

    Set<Movie> findAll();
    T save(T object);
    void delete(Optional<Movie> object);
    void deleteById(ID Id);
    Optional<Movie> findById(ID Id);
}

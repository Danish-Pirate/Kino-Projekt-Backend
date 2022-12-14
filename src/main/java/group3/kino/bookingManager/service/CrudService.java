package group3.kino.bookingManager.service;

import java.util.Optional;
import java.util.Set;

public interface CrudService<T, ID> {

    Set<T> findAll();
    T save(T Object);
    void delete(T Object);
    void deleteById(ID id);
    Optional<T> findById(ID id);
}

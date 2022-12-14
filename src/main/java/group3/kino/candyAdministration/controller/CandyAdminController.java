package group3.kino.candyAdministration.controller;


import group3.kino.candyAdministration.model.Candy;
import group3.kino.candyAdministration.service.CandyAdminService;
import group3.kino.util.TokenAuthenticator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Set;

@RestController
public class CandyAdminController {

    private CandyAdminService candyAdminService;

    @Autowired
    public CandyAdminController(CandyAdminService candyAdminService){
        this.candyAdminService = candyAdminService;
    }

    @PostMapping("/addCandy")
    public ResponseEntity<Candy> addCandy(@RequestBody Candy candy, @RequestHeader("token") int key) {
        if (!TokenAuthenticator.isTokenAuthenticated(key))
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        candyAdminService.save(candy);
        return new ResponseEntity<>(candy, HttpStatus.OK);
    }

    @GetMapping("/getAllCandy")
    public ResponseEntity<Set<Candy>> getAllCandy(@RequestHeader("token") int key){
        if (!TokenAuthenticator.isTokenAuthenticated(key))
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        return new ResponseEntity<>(candyAdminService.findAll(), HttpStatus.OK);
    }


    @PostMapping("/deleteCandy")
    public ResponseEntity<Candy> deleteCandy(Long id, @RequestHeader("token") int key){
        if (!TokenAuthenticator.isTokenAuthenticated(key))
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);

        Optional<Candy> candy = candyAdminService.findById(id);
        if (candy.isPresent()){
            Candy candy_ = candy.get();
            candyAdminService.delete(candy);
            return new ResponseEntity<>(candy_,HttpStatus.OK);
        }else {
            return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/deleteCandy/{candyId}")
    public ResponseEntity<HttpStatus> deleteCandyByID(@PathVariable("candyId") Long candyId, @RequestHeader("token") int key){
        if (!TokenAuthenticator.isTokenAuthenticated(key))
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);

        candyAdminService.deleteById(candyId);
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @PutMapping("/editCandy/{candyId}")
    public ResponseEntity<Candy> editCandy(@RequestBody Candy newCandy, @PathVariable() Long candyId, @RequestHeader("token") int key) {
        if (!TokenAuthenticator.isTokenAuthenticated(key))
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);

        System.out.println("Candy: "+newCandy.getCandyName() + " \tId: " + candyId);
        Optional<Candy> oldCandy = candyAdminService.findById(candyId);
        if (oldCandy.isPresent()) {
            candyAdminService.save(newCandy);
            return new ResponseEntity<>(newCandy, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(newCandy, HttpStatus.BAD_REQUEST);
        }
    }


}

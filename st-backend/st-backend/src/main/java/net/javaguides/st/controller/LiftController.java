package net.javaguides.st.controller;

import lombok.AllArgsConstructor;
import net.javaguides.st.dto.LiftDto;
import net.javaguides.st.entity.Lift;
import net.javaguides.st.service.LiftService;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor //Creates constructor for us
@RestController //Can handle HTTP requests by having class turn into spring MVC controller
@RequestMapping("/api/lifts") //define base URL for all rest APIs being built within controller
public class LiftController { //Controller layer depends on service layer

    //inject dependencies
    private LiftService liftService;

    //Build Add Lift REST API
    @PostMapping //Maps incoming HTTP request to method, makes this method as REST API
    public ResponseEntity<LiftDto> createLift(@RequestBody LiftDto liftDto){ //@RequestBody expect JSON from HTTP request and converts JSON into liftDto of Java object
        LiftDto savedLift = liftService.createLift(liftDto);
        return new ResponseEntity<>(savedLift, HttpStatus.CREATED);
    }

    //Build Get Lift REST API
    @GetMapping("{id}") //requiring id to be passed via API as a URI var
    public ResponseEntity<LiftDto> getLiftByID(@PathVariable("id") Long liftID){ //@PathVariable maps template variable to liftID arg
        LiftDto liftDto = liftService.getLiftById(liftID);
        return ResponseEntity.ok(liftDto);
    }

    //Build Get All Lifts REST API
    @GetMapping
    public ResponseEntity<List<LiftDto>> getAllLifts(){
        List<LiftDto> lifts = liftService.getAllLifts();
        return ResponseEntity.ok(lifts);
    }

    //Build Update Lift REST API
    @PutMapping("{id}") //takes uri var in API call
    public ResponseEntity<LiftDto> updateLift(@PathVariable("id") Long liftID,
                                              @RequestBody LiftDto updatedLift){
        LiftDto liftDto = liftService.updateLift(liftID, updatedLift);
        return ResponseEntity.ok(liftDto);
    }

    //Build Delete Lift REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteLift(@PathVariable("id") Long liftID){
        liftService.deleteLift(liftID);
        return ResponseEntity.ok("Lift deleted successfully.");
    }

}

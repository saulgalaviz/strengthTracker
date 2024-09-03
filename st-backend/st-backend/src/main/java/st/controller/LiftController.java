package st.controller;

import lombok.AllArgsConstructor;
import st.dto.LiftDto;
import st.service.LiftService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*") //Clients are able to call Lift related rest APIs. The * makes it so that any client can call.
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

    //Build Get Lift REST API. Using regex to match only Long requests to avoid ambiguity.
    @GetMapping("{id:\\d+}") //requiring id to be passed via API as a URI var
    public ResponseEntity<LiftDto> getLiftByID(@PathVariable("id") Long liftID){ //@PathVariable maps template variable to liftID arg
        LiftDto liftDto = liftService.getLiftById(liftID);
        return ResponseEntity.ok(liftDto);
    }

    //Build Get All Lifts with Matching Lift Name REST API. Using regex to match only String requests to avoid ambiguity.
    @GetMapping("{liftName:.*\\D.*}")
    public ResponseEntity<List<LiftDto>> getLiftsByLiftName(@PathVariable("liftName") String liftName){
        List<LiftDto> lifts = liftService.getLiftsByLiftName(liftName);
        return ResponseEntity.ok(lifts);
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

package net.javaguides.st.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

//Annotate lombok to create our getters, setters, etc.
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

//Use dto class as response for REST api
public class LiftDto {
    private Long id;
    private String liftName;
    private double liftedWeight;
    private String workoutSplit;
    private String muscleGroup;
}

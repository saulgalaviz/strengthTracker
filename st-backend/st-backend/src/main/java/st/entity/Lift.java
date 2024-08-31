package st.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

//Annotate lombok to create our getters, setters, etc.
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity //Specify class into a JP entity
@Table(name = "lifts")
public class Lift {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //uses increment feature to increment primary key
    private Long id;

    @Column(name = "lift_name") //Explicitly map column name instead of having JP default to below var.
    private String liftName;

    @Column(name = "lift_date")
    private String liftDate;
    
    @Column(name = "lifted_weight")
    private int liftedWeight;

    @Column(name = "body_weight")
    private int bodyWeight;

    @Column(name = "workout_split", nullable = true) //Setting nullable as true so value can be set to missing or undefined
    private String workoutSplit;

    @Column(name = "muscle_group")
    private String muscleGroup;
}

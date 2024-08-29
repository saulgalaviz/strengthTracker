package st.mapper;

import st.dto.LiftDto;
import st.entity.Lift;

//Class to transport data between entity and dto
public class LiftMapper {

    public static LiftDto mapToLiftDto(Lift lift){
        return new LiftDto(
                lift.getId(),
                lift.getLiftName(),
                lift.getLiftedWeight(),
                lift.getWorkoutSplit(),
                lift.getMuscleGroup()
        );
    }

    public static Lift mapToLift(LiftDto liftDto){
        return new Lift(
                liftDto.getId(),
                liftDto.getLiftName(),
                liftDto.getLiftedWeight(),
                liftDto.getWorkoutSplit(),
                liftDto.getMuscleGroup()
        );
    }

}
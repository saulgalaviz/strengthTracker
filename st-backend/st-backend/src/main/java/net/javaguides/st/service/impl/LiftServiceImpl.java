package net.javaguides.st.service.impl;

import lombok.AllArgsConstructor;
import net.javaguides.st.dto.LiftDto;
import net.javaguides.st.entity.Lift;
import net.javaguides.st.exception.ResourceNotFoundException;
import net.javaguides.st.mapper.LiftMapper;
import net.javaguides.st.repository.LiftRepository;
import net.javaguides.st.service.LiftService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service //build container to build Spring beans for class
@AllArgsConstructor //Creates constructors for injecting repository as dependency
public class LiftServiceImpl implements LiftService {

    private LiftRepository liftRepository;

    @Override
    public LiftDto createLift(LiftDto liftDto) {

        //first convert liftDTO to entity as we'll be uploading entity into db
        Lift lift = LiftMapper.mapToLift(liftDto);
        //save entity into db
        Lift savedLift = liftRepository.save(lift);
        //return saved lift object back to client
        return LiftMapper.mapToLiftDto(savedLift);
    }

    @Override
    public LiftDto getLiftById(Long liftID) {
        Lift lift = liftRepository.findById(liftID)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Lift ID does not exist " + liftID) //If ID not found, throw exception with message attached
                );

        //Call expects DTO, so we convert using mapper
        return LiftMapper.mapToLiftDto(lift);
    }

    @Override
    public List<LiftDto> getAllLifts() {
        List<Lift> lifts = liftRepository.findAll();

        //stream() takes all values from a list, map() converts one object to another, collect() collects results of prev actions
        return lifts.stream().map((lift) -> LiftMapper.mapToLiftDto(lift))
                .collect(Collectors.toList());
    }

    @Override
    public LiftDto updateLift(Long liftID, LiftDto updatedLift) {
        //get lift via ID
        Lift lift = liftRepository.findById(liftID).orElseThrow(
                () -> new ResourceNotFoundException("Lift ID does not exist " + liftID)
        );

        //update lift object
        lift.setLiftName(updatedLift.getLiftName());
        lift.setLiftedWeight(updatedLift.getLiftedWeight());
        lift.setWorkoutSplit(updatedLift.getWorkoutSplit());
        lift.setMuscleGroup(updatedLift.getMuscleGroup());

        //performs save and update operations. If ID doesn't exist, then save is performed, otherwise insert operation (update) is performed
        Lift updatedLiftObj = liftRepository.save(lift);

        return LiftMapper.mapToLiftDto(updatedLiftObj);
    }

    @Override
    public void deleteLift(Long liftID) {
        //get lift via ID
        Lift lift = liftRepository.findById(liftID).orElseThrow(
                () -> new ResourceNotFoundException("Lift ID does not exist " + liftID)
        );

        liftRepository.delete(lift);
    }
}

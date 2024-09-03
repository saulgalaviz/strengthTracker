package st.service;

import st.dto.LiftDto;

import java.util.List;

public interface LiftService {
    LiftDto createLift(LiftDto liftDto);

    LiftDto getLiftById(Long liftID);

    List<LiftDto>  getLiftsByLiftName(String liftName);

    List<LiftDto> getAllLifts();

    LiftDto updateLift(Long liftID, LiftDto updatedLift);

    void deleteLift(Long liftID);
}

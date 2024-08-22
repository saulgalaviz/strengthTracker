package net.javaguides.st.service;

import net.javaguides.st.dto.LiftDto;

import java.util.List;

public interface LiftService {
    LiftDto createLift(LiftDto liftDto);

    LiftDto getLiftById(Long liftID);

    List<LiftDto> getAllLifts();

    LiftDto updateLift(Long liftID, LiftDto updatedLift);

    void deleteLift(Long liftID);
}

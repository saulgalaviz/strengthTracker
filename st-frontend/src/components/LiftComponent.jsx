import React, { useState } from "react";
import { createLift, getLift, updateLift } from "../services/LiftService";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import moment from "moment";



const LiftComponent = () => {

        const [liftName, setLiftName] = useState('')
        const [liftDate, setLiftDate] = useState('')
        const [liftedWeight, setLiftedWeight] = useState('')
        const [bodyWeight, setBodyWeight] = useState('')
        const [workoutSplit, setWorkoutSplit] = useState('')
        // const [muscleGroup, setMuscleGroup] = useState('')



        const {id} = useParams();
        const [errors, setErrors] = useState({
            liftName: '',
            liftDate: '',
            liftedWeight: '',
            bodyWeight: '',
            workoutSplit: '',
            // muscleGroup: ''
        })

        const navigator = useNavigate();

        useEffect(() => {
            if(id){
                getLift(id).then((response) => {
                    setLiftName(response.data.liftName);
                    setLiftDate(response.data.liftDate);
                    setLiftedWeight(response.data.liftedWeight);
                    setBodyWeight(response.data.bodyWeight);
                    setWorkoutSplit(response.data.workoutSplit);
                    // setMuscleGroup(response.data.muscleGroup);
                }).catch(error => {
                    console.error(error);
                })
            }
        }, [id] )

        const preventMinus = (e) => {
            if (e.code === 'Minus' || e.includ) {
                e.preventDefault();
            }
        };

        function saveOrUpdateLift(e){
            e.preventDefault();

            if(validateForm()){
                const muscleGroup = `${mapMuscleGroup(liftName)}`
                const lift = {liftName, liftDate, liftedWeight, bodyWeight, workoutSplit, muscleGroup}
                console.log(lift)

                if(id){
                    updateLift(id, lift).then((response) => {
                        console.log(response.data);
                        navigator("/lifts");
                    }).catch(error =>{
                        console.error(error);
                    })
                }
                else{
                    createLift(lift).then((response) => {
                        console.log(response.data);
                        navigator("/lifts");
                    }).catch(error =>{
                        console.error(error);
                    })
                }
            }
        }

        function validateForm(){
            let valid = true;

            const errorsCopy = {... errors}

            if(liftName.trim()){
                errorsCopy.liftName = ""
            }else{
                errorsCopy.liftName = "Lift Name is required"
                valid = false;
            }

            if(liftDate.trim()){
                errorsCopy.liftDate = ""
            }else{
                errorsCopy.liftDate = "Lift Date is required"
                valid = false;
            }
            
            if(liftedWeight.toString().trim()){
                errorsCopy.liftedWeight = ""
            }else{
                errorsCopy.liftedWeight = "Lifted Weight is required"
                valid = false;
            }

            if(bodyWeight.toString().trim()){
                errorsCopy.bodyWeight = ""
            }else{
                errorsCopy.bodyWeight = "Body Weight is required"
                valid = false;
            }

            if(workoutSplit.trim()){
                errorsCopy.workoutSplit = ""
            }else{
                errorsCopy.workoutSplit = "Workout Split is required"
                valid = false;
            }
            
            // if(muscleGroup.trim()){
            //     errorsCopy.muscleGroup = ""
            // }else{
            //     errorsCopy.muscleGroup = "Muscle Group is required"
            //     valid = false;
            // }

            setErrors(errorsCopy);

            return valid;
        }

        function pageTitle(){
            if(id){
                return <h1 className="text-center">Update Lift</h1>
            }
            else{
                return <h1 className="text-center">Add Lift</h1>
            }

        }

        function defaultSelection(fieldName){
            if(id){
                if(fieldName == "liftName")
                    return <option value={liftName}>{liftName}</option>
                else if(fieldName == "workoutSplit")
                    return <option value={workoutSplit}>{workoutSplit}</option>
            }
            if(fieldName == "liftName")
                return <option selected disabled>Select Lift</option>
            else if(fieldName == "workoutSplit")
                return <option selected disabled>Select Workout Split</option>
            
        }

        function mapMuscleGroup(liftNameValue){
            let muscleGroup = ""
            if(liftNameValue == "Bench Press" || liftNameValue == "Incline Bench Press")
                muscleGroup = "Chest, Shoulders, Triceps"
            else if(liftNameValue == "Chin-up")
                muscleGroup = "Trapezius, Latissimus Dorsi, Rhomboids, Teres Major, Shoulders, Abdominals, Biceps, Forearms"
            else if(liftNameValue == "Pull-up")
                muscleGroup = "Deltoids, Trapezius, Latissimus Dorsi, Abdominals, Biceps, Forearms"
            else if(liftNameValue == "Deadlift")
                muscleGroup = "Trapezius, Hamstrings, Gluteus Maximus, Abdominals, Biceps, Forearms"
            else if(liftNameValue == "Dumbbell One-Arm Bicep Curl")
                muscleGroup = "Biceps, Forearms"
            else if(liftNameValue == "Dumbbell One-Arm Row")
                muscleGroup = "Laterals, Trapezius, Rhomboids, Read Deltoids, Biceps, Abdominals"
            else if(liftNameValue == "Hip Thrust")
                muscleGroup = "Gluteus Maximus, Quadriceps, Abductors, Hamstrings"
            else if(liftNameValue == "Lateral Pulldown")
                muscleGroup = "Latissimus Dorsi, Rhomboid, Trapezius, Brachioradialis, Deltoid, Biceps, Forearms"
            else if(liftNameValue == "Lateral Raise")
                muscleGroup = "Lateral Deltoids"
            else if(liftNameValue == "Overhead Press")
                muscleGroup = "Deltoids, Trapezius, Triceps"
            else if(liftNameValue == "Romanian Deadlift")
                muscleGroup = "Hamstrings, Trapezius, Gluteus Maximus, Hip Abductors, Forearms"
            else if(liftNameValue == "Squat")
                muscleGroup = "Quadriceps, Gluteus Maximus, Hamstrings, Abductors, Hip Flexors, Calves"
            else if(liftNameValue == "Tricep Rope Pushdown")
                muscleGroup = "Triceps"

            return muscleGroup
        }

    return (
        
        <div className="background-color ">
            <br/><br/><br/>
            <div className="container ">
                <div className="row ">
                    <div className="card  col-md-6 offset-md-3 offset-md-3 bg-light">
                        <br/>
                        {
                            pageTitle()
                        }
                        <div className="card-body ">
                            <form>
                                {/* <div className="form-group mb-2">
                                    <label className="form-label">Lift Name:</label>
                                    <input 
                                        type="text"
                                        placeholder="Enter Lift Name"
                                        name="liftName"
                                        value={liftName}
                                        // backtick symbol below
                                        className={`form-control ${ errors.liftName ? "is-invalid":""}`}
                                        onChange={(e) => setLiftName(e.target.value)}
                                    >
                                    </input>
                                    { errors.liftName && <div className="invalid-feedback"> {errors.liftName} </div>}
                                </div> */}

                                <div className="input-group mb-4">
                                    <label className="col-form-label" style={{marginRight: "70px"}}>Lift Name:</label>
                                    {/* backtick symbol below */}
                                    {/* (e) => setLiftName(e.target.value) */}
                                    <select className={`form-select ${ errors.liftName ? "is-invalid":""}`} onChange={(e) => setLiftName(e.target.value)}>
                                        {defaultSelection("liftName")}
                                        <option value="Bench Press">Bench Press</option>
                                        <option value="Chin-up">Chin-up</option>
                                        <option value="Deadlift">Deadlift</option>
                                        <option value="Dumbbell One-Arm Bicep Curl">Dumbbell One-Arm Bicep Curl</option>
                                        <option value="Dumbbell One-Arm Row">Dumbbell One-Arm Row</option>
                                        <option value="Hip Thrust">Hip Thrust</option>
                                        <option value="Incline Bench Press">Incline Bench Press</option>
                                        <option value="Lateral Pulldown">Lateral Pulldown</option>
                                        <option value="Lateral Raise">Lateral Raise</option>
                                        <option value="Overhead Press">Overhead Press</option>
                                        <option value="Pull-up">Pull-up</option>
                                        <option value="Romanian Deadlift">Romanian Deadlift</option>
                                        <option value="Squat">Squat</option>
                                        <option value="Tricep Rope Pushdown">Tricep Rope Pushdown</option>                                                              
                                    </select>
                                    { errors.liftName && <div className="invalid-feedback"> {errors.liftName} </div>}
                                </div>

                                

                                <div className="input-group mb-4">
                                    <label className="col-form-label" style={{marginRight: "78px"}}>Lift Date:</label>
                                    <input 
                                        type="date"
                                        placeholder="Enter Lift Date"
                                        name="liftDate"
                                        value={liftDate}
                                        // backtick symbol below
                                        className={`form-control ${ errors.liftDate ? "is-invalid":""}`}
                                        onChange={(e) => setLiftDate(e.target.value)}
                                        max={moment().format("YYYY-MM-DD")}                                        
                                    >
                                    </input>
                                    { errors.liftDate && <div className="invalid-feedback"> {errors.liftDate} </div>}
                                </div>

                                <div className="input-group mb-4">
                                    <label className="form-label col-form-label" style={{marginRight: "43px"}}>Lifted Weight:</label>
                                    <input 
                                        type="number" 
                                        placeholder="Enter Lifted Weight"
                                        name="liftedWeight"
                                        value={liftedWeight}
                                        // backtick symbol below
                                        className={`form-control ${ errors.liftedWeight ? "is-invalid":""}`}
                                        onChange={(e) => setLiftedWeight(e.target.value)}
                                        onKeyDown={(e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}
                                        min="0"
                                        max="999"
                                    >
                                    </input>
                                    { errors.liftedWeight && <div className="invalid-feedback"> {errors.liftedWeight} </div>}
                                </div>

                                <div className="input-group mb-4">
                                    <label className="form-label col-form-label" style={{marginRight: "47px"}}>Body Weight:</label>
                                    <input 
                                        type="number"
                                        placeholder="Enter Body Weight"
                                        name="bodyWeight"
                                        value={bodyWeight}
                                        oninput="validity.valid||(value='');"
                                        // backtick symbol below
                                        className={`form-control ${ errors.bodyWeight ? "is-invalid":""}`}
                                        onChange={(e) => setBodyWeight(e.target.value)}
                                        onKeyDown={(e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}
                                        min="0"
                                        max="999"
                                    >
                                    </input>
                                    { errors.bodyWeight && <div className="invalid-feedback"> {errors.bodyWeight} </div>}
                                </div>

                                {/* <div className="form-group mb-2">
                                    <label className="form-label">Workout Split:</label>
                                    <input 
                                        type="text"
                                        placeholder="Enter Workout Split"
                                        name="workoutSplit"
                                        value={workoutSplit}
                                        // backtick symbol below
                                        className={`form-control ${ errors.workoutSplit ? "is-invalid":""}`}
                                        onChange={(e) => setWorkoutSplit(e.target.value)}
                                    >
                                    </input>
                                    { errors.workoutSplit && <div className="invalid-feedback"> {errors.workoutSplit} </div>}
                                </div> */}

                                <div className="input-group mb-4">
                                    <label className="col-form-label " style={{marginRight: "42px"}}>Workout Split:</label>
                                    {/* backtick symbol below */}
                                    <select className={`form-select ${ errors.workoutSplit ? "is-invalid":""}`} onChange={(e) => setWorkoutSplit(e.target.value)}>
                                        {defaultSelection("workoutSplit")}
                                        <option value="Push, Pull, Legs">Push, Pull, Legs</option>
                                        <option value="Full Body">Full Body</option>
                                        <option value="Upper, Lower">Upper, Lower</option>
                                        <option value="Bro Split">Bro Split</option>
                                    </select>
                                    { errors.workoutSplit && <div className="invalid-feedback"> {errors.workoutSplit} </div>}
                                </div>

                                {/* <div className="form-group mb-2">
                                    <label className="form-label">Muscle Group:</label>
                                    <input 
                                        type="text"
                                        placeholder="Enter Muscle Group"
                                        name="muscleGroup"
                                        value={muscleGroup}
                                        // backtick symbol below
                                        className={`form-control ${ errors.muscleGroup ? "is-invalid":""}`}
                                        onChange={(e) => setMuscleGroup(e.target.value)}
                                    >
                                    </input>
                                    { errors.muscleGroup && <div className="invalid-feedback"> {errors.muscleGroup} </div>}
                                </div> */}

                                {/* <div className="input-group mb-4" >
                                    <label className="col-form-label " style={{marginRight: "40px"}}>Muscle Group:</label>
                                    
                                    <select className={`form-select ${ errors.muscleGroup ? "is-invalid":""}`} onChange={(e) => setMuscleGroup(e.target.value)}>
                                    <option selected>Select Muscle Group</option>
                                    <option value="Abdominals">Abdominals</option>
                                    <option value="Arms">Arms</option>
                                    <option value="Back">Back</option>
                                    <option value="Chest">Chest</option>
                                    <option value="Legs">Legs</option>
                                    <option value="Shoulders">Shoulders</option>
                                </select>
                                { errors.muscleGroup && <div className="invalid-feedback"> {errors.muscleGroup} </div>}
                                </div> */}

                                

                                <button className="btn btn-success " onClick={saveOrUpdateLift} style={{marginLeft: "525px"}}>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>        
    )
}

export default LiftComponent

                        
import React, {useEffect, useState} from 'react' 
{/* Below uses state hook by including {useState} and we also imported effect hook {useEffect} */}
import { listLifts, deleteLift } from '../services/LiftService'
// Import below functions from react-router-dom in order to add routing
import { useNavigate } from 'react-router-dom'


const ListLiftComponent = () => {
    
    {/* Use state hook allows the use of state variables in functional components. First parameter passed is state variable and second is function that updates state var */}
    const [lifts, setLifts] = useState([])

    const navigator = useNavigate();

    {/* In order to make REST API call (AXIOS) in react function component, effect hook needs to be used*/}
    useEffect(() => {
        getAllLifts();
    }, [])

    function getAllLifts(){
        listLifts().then((response) => {
            setLifts(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function addNewLift(){
        navigator("/add-lift")
    }

    function updateLift(id){
        // Uses backtick symbol
        navigator(`/edit-lift/${id}`)
    }

    function removeLift(id){
        console.log(id);

        deleteLift(id).then((response) => {
            getAllLifts();
        }).catch(error => {
            console.error(error);
        })
    }

    return(
        <div className="background-color">
            <div className ="container white-color">
                <br/>
                <h1 className = "text-center">List of Lifts</h1>
                <button className = "btn btn-primary blue-color mb-2"  onClick={addNewLift}>Add Lift</button>
                <div className="set-table-scroll">
                    <table className = "table table-striped table-bordered table-responsive">
                        <thead>
                            <tr>
                                <th>Lift ID</th>
                                <th>Lift Name</th>
                                <th>Lift Date</th>
                                <th>Lifted Weight</th>
                                <th>Body Weight</th>
                                <th>Workout Split</th>
                                <th>Muscle Group</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                lifts.map(lift => 
                                    <tr key={lift.id}>
                                        <td>{lift.id}</td>
                                        <td>{lift.liftName}</td>
                                        <td>{lift.liftDate}</td>
                                        <td>{lift.liftedWeight}</td>
                                        <td>{lift.bodyWeight}</td>
                                        <td>{lift.workoutSplit}</td>
                                        <td>{lift.muscleGroup}</td>
                                        <td>
                                            <button className="btn btn-info" onClick={() => updateLift(lift.id)}>Update</button>
                                            <button className="btn btn-danger" onClick={() => removeLift(lift.id)} style={{marginLeft: "10px"}}>Delete</button>
                                        </td>
                                    </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ListLiftComponent
import React, {useEffect, useState} from 'react' 
{/* Below uses state hook by including {useState} and we also imported effect hook {useEffect} */}
import { listLifts } from '../services/LiftService'
// Import below functions from react-router-dom in order to add routing
import { useNavigate } from 'react-router-dom'


const ListLiftComponent = () => {
    
    {/* Use state hook allows the use of state variables in functional components. First parameter passed is state variable and second is function that updates state var */}
    const [lifts, setLifts] = useState([])

    const navigator = useNavigate();

    {/* In order to make REST API call (AXIOS) in react function component, effect hook needs to be used*/}
    useEffect(() => {
        listLifts().then((response) => {
            setLifts(response.data);
        }).catch(error => {
            console.error(error);
        })
    }, [])

    function addNewLift(){
        navigator("/add-lift")
    }


    return(
        <div className ="container">
            <h2 className = "text-center">List of Lifts</h2>
            <button className = "btn btn-primary mb-2"  onClick={addNewLift}>Add Lift</button>
            <table className = "table table-stripped table-bordered">
                <thead>
                    <tr>
                        <th>Lift ID</th>
                        <th>Lift Name</th>
                        <th>Lifted Weight</th>
                        <th>Workout Split</th>
                        <th>Muscle Group</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        lifts.map(lift => 
                            <tr key={lift.id}>
                                <td>{lift.id}</td>
                                <td>{lift.liftName}</td>
                                <td>{lift.liftedWeight}</td>
                                <td>{lift.workoutSplit}</td>
                                <td>{lift.muscleGroup}</td>
                            </tr>)
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListLiftComponent
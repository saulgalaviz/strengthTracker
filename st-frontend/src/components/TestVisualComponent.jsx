import React, {useEffect, useState} from 'react' 
{/* Below uses state hook by including {useState} and we also imported effect hook {useEffect} */}
import { listMatchingLifts } from "../services/LiftService";


const ListLiftComponent = () => {
    
const [matchingLifts, setMatchingLifts] = useState([])
const [liftName, setLiftName] = useState('')

    useEffect(() => {
        if(liftName)
            {
            listMatchingLifts(liftName).then((response) => {
                setMatchingLifts(response.data);
            }).catch(error => {
            console.error(error);
            })
        }
        else
            setLiftName("Bench Press");
        }, [liftName])
    
    

    return(
        <div className="background-color">
            <div className ="container white-color">
                <br/>
                <h1 className = "text-center">List of Lifts</h1>
                <div className="input-group " >
                      <select className="mt-3 blue-color" onChange={(e) => setLiftName(e.target.value)}>
                          <option value="Bench Press">Bench Press</option>
                          <option value="Chin-up">Chin-up</option>
                          <option value="Full Body">Full Body</option>
                          <option value="Upper, Lower">Upper, Lower</option>
                          <option value="Bro Split">Bro Split</option>
                      </select>
                    </div>
                    <div className="set-table-scroll">
                    <table className = "table table-striped table-bordered table-responsive">
                        <thead>
                            <tr>
                                <th>Lift ID</th>
                                <th>Lift Name</th>
                                <th>Lift Date</th>
                                <th>Lifted Weight (lbs)</th>
                                <th>Body Weight (lbs)</th>
                                <th>Workout Split</th>
                                <th>Muscle Group</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            // <tr key={liftName}>
                            //     <td>{liftName}</td>
                            //     <td>{liftDate}</td>
                            //     <td>{liftedWeight}</td>
                            //     <td>{bodyWeight}</td>
                            //     <td>{workoutSplit}</td>
                            //     <td>{muscleGroup}</td>
                            // </tr>

                            matchingLifts.map(lift => 
                                <tr key={lift.id}>
                                    <td>{lift.id}</td>
                                    <td>{lift.liftName}</td>
                                    <td>{lift.liftDate}</td>
                                    <td>{lift.liftedWeight}</td>
                                    <td>{lift.bodyWeight}</td>
                                    <td>{lift.workoutSplit}</td>
                                    <td>{lift.muscleGroup}</td>
                                    
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
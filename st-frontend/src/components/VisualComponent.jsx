import React, {useEffect, useState} from 'react' 
import { listMatchingLifts } from "../services/LiftService";
// import Highcharts from 'highcharts';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

const VisualComponent = () => {

  const [matchingLifts, setMatchingLifts] = useState([])
  const [liftName, setLiftName] = useState('')
  const defaultItem = "Bench Press"
  
    const options = {
    chart: {
      type: "line"
    },
    xAxis: {
      title: {text: "Date"},
      // categories: ["Dev", "Feb"]
      categories: matchingLifts.map(lift => {lift.liftDate})
    },
    yAxis: {
      title: {text: "Weight"},
      // categories: ["Fat", "Feb", "Fat", "Feb"]
      categories: [matchingLifts.map(lift => {lift.liftWeight})]
    },
    title: {
      text: "Bench Press"
    },
    series: [
      {
        // data: getBodyWeights(),
        name: liftName
      },
      {
        // data: //getBodyWeights(),
        
        name: "Body Weight"
      }
    ]
  };

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
        setLiftName(defaultItem);
    }, [liftName])

  function getBodyWeights()
  {
    // const result = Object.fromEntries(matchingLifts.map(lift => [lift.bodyWeight].concat(",")))
    const bodyWeights = matchingLifts.map(lift => lift.bodyWeight);
    const joinedBodyWeights = bodyWeights.join(",");
    var arr = joinedBodyWeights.split(",")
    console.log(arr)
    
    return joinedBodyWeights;
  }

  function getLiftWeights()
  {

  }

  return (
    <div className="background-color">
      <br/><br/><br/><br/><br/>
      <div className ="container white-color"></div>
      <div className="row ">
                <div className="card  col-md-10 offset-md-1 offset-md-1">
                <div className="input-group ">
                      <select className="mt-3 blue-color" onChange={(e) => setLiftName(e.target.value)}>
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
                    </div>
              
                  <div>
                    <HighchartsReact
                    highcharts={Highcharts} 
                    // constructorType={'stockChart'}
                    options={options} 
                    />
                  </div>
            </div>
        </div>
      </div>
  )
}

export default VisualComponent
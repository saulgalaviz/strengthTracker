import React, {useEffect, useState} from 'react' 
import { listMatchingLifts } from "../services/LiftService";
// import Highcharts from 'highcharts';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

const VisualComponent = () => {

  const [matchingLifts, setMatchingLifts] = useState([])
  const [liftName, setLiftName] = useState('')

  const defaultItem = "Bench Press"
  // const bodyWeights = matchingLifts.map(lift => lift.bodyWeight);
  // const liftWeights = matchingLifts.map(lift => lift.liftedWeight);

  const options = {
    chart: {
      type: "line"
    },
    xAxis: {
      
      title: {text: "Date"},
      type: 'datetime',
      //different way to plot date directly using categories. Would require functions to manipulate data before plotting such as sorting.
      // categories: matchingLifts.map(lift => {
      //   return Highcharts.dateFormat('%m-%d-%Y', new Date(lift.liftDate).getTime());
      // })
      labels:{
        format: '{value:%m-%d-%Y}'
      }
    },
    yAxis: {
      title: {text: "Weight (lbs)"}
    },

    title: {
      text: liftName + " Trend"
    },
    
    series: [
      {
        data: getLiftWeights(),
        name: liftName,
        dataLabels: {
          enabled: true
      }
      },
      {
        data: getBodyWeights(),
        name: "Body Weight",
        dataLabels: {
          enabled: true
      }
      },
      {
        data: getBodyWeightRatio(),
        name: "Bodyweight Ratio (x100)",
        dataLabels: {
          enabled: true
      }
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

    function getLiftWeights()
    {
      var processedData = matchingLifts.map((lift, i) => {
        return [new Date(lift.liftDate).getTime(), lift.liftedWeight]
      });
      
      processedData = processedData.sort((a, b) => a[0] - b[0]);
      console.log(processedData)
      return processedData;
    }

    function getBodyWeights()
    {
      var processedData = matchingLifts.map((lift, i) => {
        return [new Date(lift.liftDate).getTime(), lift.bodyWeight]
      });
      
      processedData = processedData.sort((a, b) => a[0] - b[0]);
      console.log(processedData)
      return processedData;
    }

    function getBodyWeightRatio()
    {
      var processedData = matchingLifts.map((lift, i) => {
        return [new Date(lift.liftDate).getTime(), Number(((lift.liftedWeight/lift.bodyWeight)).toFixed(2))]
      });
      //Number(((lift.liftedWeight/lift.bodyWeight)*100).toFixed(2))
      
      processedData = processedData.sort((a, b) => a[0] - b[0]);
      console.log(processedData)
      return processedData;
    }

  // function getBodyWeights()
  // {
  //   let bodyWeights = matchingLifts.map(lift => lift.bodyWeight);
  //   return bodyWeights;
  // }

  // function getLiftWeights()
  // {
  //   let liftWeights = matchingLifts.map(lift => lift.liftedWeight);
  //   return liftWeights;
  // }

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
                    options={options} 
                    />
                  </div>
            </div>
        </div>
      </div>
  )
}

export default VisualComponent
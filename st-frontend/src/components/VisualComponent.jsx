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
  const liftRatioStandards = getLiftRatioStandards();

  const options = {
    chart: {
      type: "line",
      height: 325,
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
      itemMarginTop: 10,
      itemMarginBottom: 10
    },
    xAxis: {
      
      title: {text: ""},
      type: 'datetime',
      //different way to plot date directly using categories. Would require functions to manipulate data before plotting such as sorting.
      // categories: matchingLifts.map(lift => {
      //   return Highcharts.dateFormat('%m-%d-%Y', new Date(lift.liftDate).getTime());
      // })
      labels:{
        format: '{value:%m-%d-%Y}'
      },
    },
    yAxis: {
      title: {text: "Weight (lbs)"},
      tickAmount: 8
    },

    title: {
      text: liftName + " Trend"
    },
    
    series: [
      {
        data: getLiftWeights(),
        name: "Lift Weight",
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
      // {
      //   data: getBodyWeightRatio(),
      //   name: "Bodyweight Ratio (x100)",
      //   dataLabels: {
      //     enabled: true
      // }
      // }
    ]
  };

  const options2 = {
    chart: {
      type: "line",
      height: 200,
    },
    // xAxis: {
    //   crosshair: false,
		// 	tickLength:0,
    //   labels: {
    //     enabled: false
    //   }
    // },
    xAxis: {
      
      title: {text: ""},
      type: 'datetime',
      //different way to plot date directly using categories. Would require functions to manipulate data before plotting such as sorting.
      // categories: matchingLifts.map(lift => {
      //   return Highcharts.dateFormat('%m-%d-%Y', new Date(lift.liftDate).getTime());
      // })
      crosshair: false,
      tickLength:0,
      labels:{
        format: '{value:%m-%d-%Y}',
        enabled: false
      }
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
      itemMarginTop: 10,
      itemMarginBottom: 10
    },
    
    yAxis: {
      title: {text: liftName + " / BodyWeight Ratio"},
      tickAmount: 5
    },

    title: {
      text: ""
    },
    
    series: [
      {
        data: getBodyWeightRatio(),
        name: "Lift Ratio",
        color: '#FF0000',
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
    var processedData = matchingLifts.map((lift) => {
      return [new Date(lift.liftDate).getTime(), lift.liftedWeight]
    });
    
    processedData = processedData.sort((a, b) => a[0] - b[0]);
    return processedData;
  }

  function getBodyWeights()
  {
    var processedData = matchingLifts.map((lift) => {
      return [new Date(lift.liftDate).getTime(), lift.bodyWeight]
    });
    
    processedData = processedData.sort((a, b) => a[0] - b[0]);
    return processedData;
  }

  function getBodyWeightRatio()
  {
    var processedData = matchingLifts.map((lift) => {
      return [new Date(lift.liftDate).getTime(), Number(((lift.liftedWeight/lift.bodyWeight)).toFixed(2))]
    });
    //Number(((lift.liftedWeight/lift.bodyWeight)*100).toFixed(2))
    
    processedData = processedData.sort((a, b) => a[0] - b[0]);
    return processedData;
  }
  function getLiftRatioStandards()
  {
    let liftRatioStandards = []
    if(liftName == "Bench Press")
      liftRatioStandards = [
        { level: "Beginner", maleRatio: '0.50x', femaleRatio: '0.25x' },
        { level: "Novice", maleRatio: '0.75x', femaleRatio: '0.50x' },
        { level: "Intermediate", maleRatio: '1.25x', femaleRatio: '0.75x' },
        { level: "Advanced", maleRatio: '1.75x', femaleRatio: '1.00x' },
        { level: "Elite", maleRatio: '2.00x', femaleRatio: '1.50x' }
      ];
    else if(liftName == "Incline Bench Press")
      liftRatioStandards = [
        { level: "Beginner", maleRatio: '0.50x', femaleRatio: '0.20x' },
        { level: "Novice", maleRatio: '0.75x', femaleRatio: '0.40x' },
        { level: "Intermediate", maleRatio: '1.00x', femaleRatio: '0.65x' },
        { level: "Advanced", maleRatio: '1.20x', femaleRatio: '1.00x' },
        { level: "Elite", maleRatio: '1.75x', femaleRatio: '1.40x' }
      ];
    else if(liftName == "Chin-up")
      liftRatioStandards = [
        { level: "Beginner", maleRatio: '<1 reps', femaleRatio: '<1 reps' },
        { level: "Novice", maleRatio: '6 reps', femaleRatio: '<1 reps' },
        { level: "Intermediate", maleRatio: '14 reps', femaleRatio: '6 reps' },
        { level: "Advanced", maleRatio: '24 reps', femaleRatio: '13 reps' },
        { level: "Elite", maleRatio: '35 reps', femaleRatio: '22 reps' }
      ];
    else if(liftName == "Pull-up")
      liftRatioStandards = [
        { level: "Beginner", maleRatio: '<1 reps', femaleRatio: '<1 reps' },
        { level: "Novice", maleRatio: '5 reps', femaleRatio: '<1 reps' },
        { level: "Intermediate", maleRatio: '14 reps', femaleRatio: '6 reps' },
        { level: "Advanced", maleRatio: '24 reps', femaleRatio: '15 reps' },
        { level: "Elite", maleRatio: '37 reps', femaleRatio: '26 reps' }
      ];
    else if(liftName == "Deadlift")
      liftRatioStandards = [
        { level: "Beginner", maleRatio: '1.00x', femaleRatio: '0.50x' },
        { level: "Novice", maleRatio: '1.50x', femaleRatio: '1.00x' },
        { level: "Intermediate", maleRatio: '2.00x', femaleRatio: '1.25x' },
        { level: "Advanced", maleRatio: '2.50x', femaleRatio: '1.75x' },
        { level: "Elite", maleRatio: '3.00x', femaleRatio: '2.50x' }
      ];
    else if(liftName == "Dumbbell One-Arm Bicep Curl")
      liftRatioStandards = [
        { level: "Beginner", maleRatio: '0.10x', femaleRatio: '0.05x' },
        { level: "Novice", maleRatio: '0.15x', femaleRatio: '0.10x' },
        { level: "Intermediate", maleRatio: '0.30x', femaleRatio: '0.20x' },
        { level: "Advanced", maleRatio: '0.45x', femaleRatio: '0.30x' },
        { level: "Elite", maleRatio: '0.60x', femaleRatio: '0.45x' }
      ];
    else if(liftName == "Dumbbell One-Arm Row")
      liftRatioStandards = [
        { level: "Beginner", maleRatio: '0.20x', femaleRatio: '0.10x' },
        { level: "Novice", maleRatio: '0.35x', femaleRatio: '0.20x' },
        { level: "Intermediate", maleRatio: '0.55x', femaleRatio: '0.35x' },
        { level: "Advanced", maleRatio: '0.80x', femaleRatio: '0.50x' },
        { level: "Elite", maleRatio: '1.05x', femaleRatio: '0.65x' }
      ];
    else if(liftName == "Hip Thrust")
      liftRatioStandards = [
        { level: "Beginner", maleRatio: '0.50x', femaleRatio: '0.50x' },
        { level: "Novice", maleRatio: '1.00x', femaleRatio: '1.00x' },
        { level: "Intermediate", maleRatio: '1.75x', femaleRatio: '1.50x' },
        { level: "Advanced", maleRatio: '2.50x', femaleRatio: '2.25x' },
        { level: "Elite", maleRatio: '3.50x', femaleRatio: '3.00x' }
      ];
    else if(liftName == "Lateral Pulldown")
      liftRatioStandards = [
        { level: "Beginner", maleRatio: '0.50x', femaleRatio: '0.30x' },
        { level: "Novice", maleRatio: '0.75x', femaleRatio: '0.45x' },
        { level: "Intermediate", maleRatio: '1.00x', femaleRatio: '0.70x' },
        { level: "Advanced", maleRatio: '1.50x', femaleRatio: '0.95x' },
        { level: "Elite", maleRatio: '1.75x', femaleRatio: '1.30x' }
      ];
    else if(liftName == "Lateral Raise")
      liftRatioStandards = [
        { level: "Beginner", maleRatio: '0.05x', femaleRatio: '0.05x' },
        { level: "Novice", maleRatio: '0.10x', femaleRatio: '0.10x' },
        { level: "Intermediate", maleRatio: '0.20x', femaleRatio: '0.15x' },
        { level: "Advanced", maleRatio: '0.30x', femaleRatio: '0.20x' },
        { level: "Elite", maleRatio: '0.45x', femaleRatio: '0.30x' }
      ];
    else if(liftName == "Overhead Press")
      liftRatioStandards = [
        { level: "Beginner", maleRatio: '0.35x', femaleRatio: '0.20x' },
        { level: "Novice", maleRatio: '0.55x', femaleRatio: '0.35x' },
        { level: "Intermediate", maleRatio: '0.80x', femaleRatio: '0.50x' },
        { level: "Advanced", maleRatio: '1.10x', femaleRatio: '0.75x' },
        { level: "Elite", maleRatio: '1.40x', femaleRatio: '1.00x' }
      ];
    else if(liftName == "Romanian Deadlift")
      liftRatioStandards = [
        { level: "Beginner", maleRatio: '0.75x', femaleRatio: '0.50x' },
        { level: "Novice", maleRatio: '1.00x', femaleRatio: '0.75x' },
        { level: "Intermediate", maleRatio: '1.50x', femaleRatio: '1.00x' },
        { level: "Advanced", maleRatio: '2.00x', femaleRatio: '1.50x' },
        { level: "Elite", maleRatio: '2.75x', femaleRatio: '1.75x' }
      ];
    else if(liftName == "Squat")
      liftRatioStandards = [
        { level: "Beginner", maleRatio: '0.75x', femaleRatio: '0.50x' },
        { level: "Novice", maleRatio: '1.25x', femaleRatio: '0.75x' },
        { level: "Intermediate", maleRatio: '1.50x', femaleRatio: '1.25x' },
        { level: "Advanced", maleRatio: '2.25x', femaleRatio: '1.50x' },
        { level: "Elite", maleRatio: '2.75x', femaleRatio: '2.00x' }
      ];
    else if(liftName == "Tricep Rope Pushdown")
      liftRatioStandards = [
        { level: "Beginner", maleRatio: '0.25x', femaleRatio: '0.15x' },
        { level: "Novice", maleRatio: '0.50x', femaleRatio: '0.25x' },
        { level: "Intermediate", maleRatio: '0.75x', femaleRatio: '0.50x' },
        { level: "Advanced", maleRatio: '1.00x', femaleRatio: '0.75x' },
        { level: "Elite", maleRatio: '1.50x', femaleRatio: '1.05x' }
      ];

    return liftRatioStandards
  }

  return (
    <div className="background-color body-visual">
      <br/><br/><br/>
      <div className ="card-group white-color offset-md-1 offset-md-1 ">
          <div className="row">
            <div className="col-md-9">
              <div className="row">
                <div className=" card   ">
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
                    <div>
                      <HighchartsReact
                      highcharts={Highcharts} 
                      options={options2} 
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-2">
                <div className=" card">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Strength level for {liftName}:</th>
                        <th>Male Lift to Weight Ratio:</th>
                        <th>Female Lift to Weight Ratio:</th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                      liftRatioStandards.map(standard => 
                      <tr key ={standard.level}>
                        <td>{standard.level}</td>
                        <td>{standard.maleRatio}</td>
                        <td>{standard.femaleRatio}</td>
                      </tr>)
                    }
                    </tbody>
                  </table>
                </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default VisualComponent
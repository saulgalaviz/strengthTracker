import React from 'react';
// import Highcharts from 'highcharts';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

const VisualComponent = () => {
  const options = {
    chart: {
      type: "line"
    },
    xAxis: {
      title: {text: "Date"},
      categories: ["Dev", "Feb"]
    },
    yAxis: {
      title: {text: "Weight"},
      categories: ["Fat", "Feb", "Fat", "Feb"]
    },
    title: {
      text: "Bench Press"
    },
    series: [
      {
        data: [1, 2, 1, 4, 3, 6],
        name: "Bench Press"
      },
      {
        data: [0, 1, 1, 3, 5, 7],
        name: "Body Weight"
      }
    ]
  };

  return (
    <div>
      <HighchartsReact
      highcharts={Highcharts} 
      // constructorType={'stockChart'}
      options={options} 
      
      />
    </div>
  )
}

export default VisualComponent
import React, { useState, useEffect } from "react";
import { fetchDailyData } from '../../api'
import { Line, Bar } from "react-chartjs-2";

import styles from "./Chart.module.css";

const Chart = ( { data : { confirmed, recovered, deaths }, country } ) => {
  const [ dailyData,setDailyData ] = useState([]);
    useEffect(() => {
        const fetchAPI = async () => {
            // await fetchDailyData();
            setDailyData(await fetchDailyData())
          };

          fetchAPI()
    },[])

    const lineChart = (
      dailyData.length  
      ? ( 
      <Line
        data={{
          labels: dailyData.map(({date}) => {return date} ),
          datasets:[{
            data: dailyData.map(({confirmed}) => {return confirmed}),
            label: 'Infected',
            borderColor: "#3333ff",
            fill: true,
          }, {
            data: dailyData.map(({deaths}) => {return deaths}),
            label: 'Deaths',
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            fill: true,
          }],
        }} 
      /> ) : null
    );

    const barChart = (
      confirmed 
      ? (
      <Bar 
        data={{
          labels: ['Infected', 'recovered', 'Deaths'],
          datasets:[{
            label: 'People',
            backgroundColor: [
              'rgba(0, 0, 255, 0.5)',
              'rgba(0, 255, 0, 0.5)',
              'rgba(255, 0, 0, 0.5)',
            ],
            data: [confirmed.value,recovered.value, deaths.value]
          }]
        }}
        option={{
          legend: {display: false},
          title: {display: true, text: `Current state in ${country}` },
        }}
      /> ) : null
    )
  
  return (
      <div className={styles.container}>
        {country ? barChart : lineChart}
      </div>
  );
};

export default Chart;

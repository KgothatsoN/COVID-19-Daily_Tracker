import React, {useState, useEffect} from 'react';
import { fetchDailyData, fetchCustomData, fetchCountries } from '../../api';
import {Line, Bar} from 'react-chartjs-2';
import CSS from './Chart.module.css';

import { FormControl, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import Table from './Table/Table.jsx';

const Chart = ({ data: {confirmed, recovered, deaths}, country }) => {
    const [dailyData, setDailyData] = useState({});
    const [tableData, setTableData] = useState([]);
    const [chartName, setChartName] = useState('pieChart');

    useEffect(() => {
        const apiDataFetch = async () =>    {
            setDailyData(await fetchDailyData());
        };
        apiDataFetch();
    }, []);

    const lineGraph = (
        dailyData[0]
            ? (
                <Line 
                    data={{
                        labels: dailyData.map(({date}) => new Date(date).toLocaleDateString()), 
                        datasets:[{
                            data: dailyData.map(data => data.confirmed), 
                            label: 'Total Cases', 
                            borderColor: '#33ff', 
                            fill:true
                            },
                            {
                            data: dailyData.map(data => data.deaths), 
                            label: 'Total Deaths', 
                            borderColor: 'red',
                            backgroundColor: 'rgba(255, 0, 0, .5', 
                            fill:true
                            }]
                        }} 
                />) : null
    );

    const barGraph = (
        confirmed?(
        <Bar 
            data={{labels: ['Total Cases', 'Recovered','Total Deaths'], 
            datasets: [{label: 'Infected', backgroundColor: ['rgb(0, 0, 255)', 'rgb(0, 255, 0)', 'rgb(255, 0, 0)'],
            data: [confirmed.value, recovered.value, deaths.value]}]
            }}
            options={{legend: {display: false}, title: {display: true, text: `Current Covid Rates in ${country}`}}}
        />
        ) : null
    )

    const handleChartChange = async (name) => {
        if (name.localeCompare("table")) {
            setChartName(name);
        } else {
            const countries = await fetchCountries();
            fetchCustomData(countries)
                .then((result) => {
                    setTableData(result);
                })
                .catch(() => {
                    console.log("error");
                });
            setChartName(name);
        }
    };

    return (
        <div className={CSS.container}>
            <div className={CSS.radio}>
                <FormControl>
                    <RadioGroup aria-label="radioButton" name="radioBtn" row>
                        <FormControlLabel disabled={country ? true : false} value="table" control={<Radio />} label="Table" onChange={(e) => handleChartChange(e.target.value)} />
                        <FormControlLabel disabled={country ? true : false} value="lineGraph" control={<Radio />} label="Line Graph" onChange={(e) => handleChartChange(e.target.value)} />
                        <FormControlLabel value="barGraph" control={<Radio />} label="Bar Graph" onChange={(e) => handleChartChange(e.target.value)} />
                    </RadioGroup>
                </FormControl>
            </div>
            { chartName.localeCompare("table") ? null : <Table data={tableData}/>}
            { chartName.localeCompare("lineGraph") ? null : (country ? null : lineGraph)}
            { chartName.localeCompare("barGraph") ? null : barGraph}
        </div>
    );
}

export default Chart;
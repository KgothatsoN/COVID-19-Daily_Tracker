import React from 'react';
import Cards from './components/Cards/Cards';
import Chart from './components/Chart/Chart';
import CountryPicker from './components/CountryPicker/CountryPicker';
import CSS from './App.module.css';
import {fetchData} from './api'
import Header from './components/Header/Header';

class App extends React.Component   {
    state = {
        data: {},
        country: '',
    };

    handleChange = async (country) =>   {
        const fetchedData = await fetchData(country);
        this.setState({ data: fetchedData });
        this.setState({ country: country });
    }

    async componentDidMount() {
        const data = await fetchData();
        this.setState({data});
    }
    
    render()    {
        const {data, country} = this.state
        return  (
            <div className={CSS.container}>
                <Header title={"COVID-19 DAILY TRACKER"}/>
                <Cards data={data}/>
                <CountryPicker handleChange={this.handleChange}/> 
                <Chart data={data} country={country}/>   
            </div>
        )
    }
}

export default App;
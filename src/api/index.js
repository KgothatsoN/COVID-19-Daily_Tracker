import axios from 'axios';

const URL = 'https://covid19.mathdro.id/api'

export const fetchData = async (country) => {
    try {

        let dynamicURL = URL;

        if (country) {
            dynamicURL = `${URL}/countries/${country}`;
        }

        const {data: {confirmed, recovered, deaths, lastUpdate}} = await axios.get(dynamicURL);
        
        const objData = {
            confirmed,
            recovered,
            deaths,
            lastUpdate 
        }
        
        return objData;
    } catch (error) {
        return error;
    }
}

export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${URL}/daily`);
        const objData = data.map((dailyData) =>
            ({
                confirmed: dailyData.confirmed.total,
                deaths: dailyData.deaths.total,
                date: dailyData.reportDate,
            })
        );
        return objData;
        
    } catch (error) {
        return error;
    }
};

export const fetchCountries = async () =>    {
    try {
        const {data: {countries}} = await axios.get(`${URL}/countries`);
        return countries.map(country => country.name)
    } catch (error) {
        return error;
    }
}

export const fetchCustomData = async (countries) => {

    const filteredCountries = countries.filter(country => country !== "Gambia");

    return new Promise((resolve, reject) => {//start promise

        const myPromises = filteredCountries.map(async country => {
            const req = await axios.get(`${URL}/countries/${country}`);
            const { data: { confirmed, deaths, recovered } } = req;
            return {
                countryName: country,
                confirmed: confirmed.value,
                recovered: deaths.value,
                deaths: recovered.value,
            };
        });

        const result = Promise.all(myPromises);
        resolve(result);

    });//end promise
};
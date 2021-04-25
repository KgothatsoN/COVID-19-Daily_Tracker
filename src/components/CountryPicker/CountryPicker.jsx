import React, {useState, useEffect} from 'react';
import {NativeSelect, FormControl} from '@material-ui/core';
import CSS from './CountryPicker.module.css';

import {fetchCountries} from '../../api';

const CountryPicker = ({handleChange}) => {
    const [fetchedCountries, setFetchedCountries] = useState([]);
    useEffect(() => {
        const fetchCountriesAPI = async () =>  {
            setFetchedCountries(await fetchCountries());
        }
        fetchCountriesAPI();
    }, [setFetchedCountries])

    
    return (
        <FormControl className={CSS.formControl}>
        <NativeSelect default="" onChange={(e) => handleChange(e.target.value)}>
            <option value="">Global</option>
            {fetchedCountries.map((country,i) => <option key={i} value={country}>{country}</option>)}
        </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker;
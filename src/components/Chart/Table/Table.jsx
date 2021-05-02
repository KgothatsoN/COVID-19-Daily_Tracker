import React, { useState, useEffect, useRef } from 'react';
import Populate from './Row/Populate';
import CSS from './Table.module.css';


function Table({ data }) {

    const [rows, setRows] = useState([]);
    let flagConfirmed = useRef(true);
    let flagRecovered = useRef(true);
    let flagDeaths = useRef(true);

    useEffect(() => {
        setRows(data);
    }, [data]);

    const sortConfirmed = () => {
        if (flagConfirmed.current) {
            const mirrorRows = [...rows];
            mirrorRows.sort((a, b) => {
                return b.confirmed - a.confirmed;
            });
            flagConfirmed.current = false;
            setRows(mirrorRows);
        } else {
            const mirrorRows = [...rows];
            mirrorRows.sort((a, b) => {
                return a.confirmed - b.confirmed;
            });
            flagConfirmed.current = true;
            setRows(mirrorRows);
        }
    };

    const sortRecovered = () => {
        if (flagRecovered.current) {
            const mirrorRows = [...rows];
            mirrorRows.sort((a, b) => {
                return b.recovered - a.recovered;
            });
            flagRecovered.current = false;
            setRows(mirrorRows);
        } else {
            const mirrorRows = [...rows];
            mirrorRows.sort((a, b) => {
                return a.recovered - b.recovered;
            });
            flagRecovered.current = true;
            setRows(mirrorRows);
        }
    };

    const sortDeaths = () => {
        if (flagDeaths.current) {
            const mirrorRows = [...rows];
            mirrorRows.sort((a, b) => {
                return b.deaths - a.deaths;
            });
            flagDeaths.current = false;
            setRows(mirrorRows);
        } else {
            const mirrorRows = [...rows];
            mirrorRows.sort((a, b) => {
                return a.deaths - b.deaths;
            });
            flagDeaths.current = true;
            setRows(mirrorRows);
        }
    };

    return (
        <div className={CSS.table}>
            <tr>
                <th className={CSS.country}>Country</th>
                <th className={CSS.infected} onClick={sortConfirmed}>Total Cases</th>
                <th className={CSS.recovered} onClick={sortRecovered}>Recovered</th>
                <th className={CSS.deaths} onClick={sortDeaths}>Total Deaths</th>
            </tr>
            <Populate rows={rows} />
        </div >
    );
}

export default Table;
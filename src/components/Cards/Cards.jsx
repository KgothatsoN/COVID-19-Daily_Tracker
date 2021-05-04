import React from 'react';
import CSS from './Cards.module.css';
import cx from 'classnames';
import {Card, CardContent, Grid, Typography} from '@material-ui/core';
import CountUp from 'react-countup';

const Cards = ({ data: {confirmed, recovered, deaths, lastUpdate}}) => {
    if(!confirmed)  {
        return 'Loading...';
    }
    
    return (
        <div className={CSS.container}>
            <Grid container spacing={3} justify="center">
                <Grid item component={Card} xs={12} md={3} className={cx(CSS.card, CSS.cases)} style={{padding: '0px'}}>
                    <CardContent>
                        <Typography color="textPrimary" gutterBottom>
                            Total Cases
                        </Typography>
                        <Typography variant="h5">
                            <CountUp start={0} end={confirmed.value} duration={2.5} separator=',' />
                        </Typography>
                        <Typography color="textSecondary">
                            {new Date(lastUpdate).toLocaleDateString()} @ {new Date(lastUpdate).toLocaleTimeString()}
                        </Typography>
                    </CardContent>
                    <div className={CSS.slash}>
                        <div className={CSS.casesTop}></div>
                    </div>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(CSS.card, CSS.recovered)} style={{padding: '0px'}} >
                    <CardContent>
                        <Typography color="textPrimary" gutterBottom>
                            Recovered
                        </Typography>
                        <Typography variant="h5">
                            <CountUp start={0} end={recovered.value} duration={2.5} separator=',' />
                        </Typography>
                        <Typography color="textSecondary">
                            {new Date(lastUpdate).toLocaleDateString()} @ {new Date(lastUpdate).toLocaleTimeString()}
                        </Typography>
                    </CardContent>
                    <div className={CSS.slash}>
                        <div className={CSS.recoveredTop}></div>
                    </div>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(CSS.card, CSS.deaths)} style={{padding: '0px'}}>
                    <CardContent>
                        <Typography color="textPrimary" gutterBottom>
                            Total Deaths
                        </Typography>
                        <Typography variant="h5">
                            <CountUp start={0} end={deaths.value} duration={2.5} separator=',' />
                        </Typography>
                        <Typography color="textSecondary">
                            {new Date(lastUpdate).toLocaleDateString()} @ {new Date(lastUpdate).toLocaleTimeString()}
                        </Typography>
                    </CardContent>
                    <div className={CSS.slash}>
                        <div className={CSS.deathsTop}></div>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default Cards;
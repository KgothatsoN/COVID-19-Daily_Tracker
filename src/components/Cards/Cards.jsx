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
                <Grid item component={Card} xs={12} md={3} className={cx(CSS.card, CSS.infected)}>
                    <CardContent>
                        <Typography color="textPrimary" gutterBottom>
                            Infected
                        </Typography>
                        <Typography variant="h5">
                            <CountUp start={0} end={confirmed.value} duration={2.5} separator=',' />
                        </Typography>
                        <Typography color="textSecondary">
                            {new Date(lastUpdate).toLocaleDateString()} @ {new Date(lastUpdate).toLocaleTimeString()}
                        </Typography>
                        <Typography variant="body2">
                            No. of Infections
                        </Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(CSS.card, CSS.recovered)}>
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
                        <Typography variant="body2">
                            No. of Recoveries
                        </Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(CSS.card, CSS.deaths)}>
                    <CardContent>
                        <Typography color="textPrimary" gutterBottom>
                            Deaths
                        </Typography>
                        <Typography variant="h5">
                            <CountUp start={0} end={deaths.value} duration={2.5} separator=',' />
                        </Typography>
                        <Typography color="textSecondary">
                            {new Date(lastUpdate).toLocaleDateString()} @ {new Date(lastUpdate).toLocaleTimeString()}
                        </Typography>
                        <Typography variant="body2">
                            No. of Deaths
                        </Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    )
}

export default Cards;
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Link } from '@material-ui/core';

const useStyles = makeStyles({
    card: {
      marginTop: 10,
      marginLeft: 3,
      marginRight: 3,
      marginBottom:5,
    },

  });

export default function Results() {
    let classes = useStyles(),
        items = [
        {
            label:'First result',
            index:1,
            id:'first'
        },
        {
            label:'Second',
            index:2,
            id:'second'
        },
        {
            label:'Third result',
            index:3,
            id:'third'
        },
        {
            label:'Fourth result',
            index:4,
            id:'fourth'
        },
        {
            label:'Fifth result',
            index:5,
            id:'fifth'
        }

    ].map(r=>Object.assign(r,{result_url:'/station/' + r.id}))
    return (
        <React.Fragment>
            {items.map(result => (
                <Card key={result.index} className={classes.card}>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            <Link href={result.result_url}>{result.label}</Link>
                        </Typography>
                    </CardContent>
                </Card>
            ))}

        </React.Fragment>


    )
}
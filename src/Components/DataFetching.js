import React, { useEffect, useState } from 'react';
import Axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';



function DataFetching() {
    const [posts, setPosts] = useState([]);
    const [buy, setBuy] = useState(0);
    const [number, setNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvc, setCvc] = useState("");
    const [focus, setFocus] = useState("");
    const [name, setName] = useState("");
    const [money, setMoney] = useState("");
    const classes = useStyles();

    useEffect(async () => {
        const api1 = `http://starlord.hackerearth.com/recipe`;
        const recipe = [];
        const getFirstPage = await Axios.get(api1);
        var data = getFirstPage.data;
        data.forEach(d => {
            recipe.push(d);
        });
        setPosts(recipe);
    }, []);

    const processMoney = () => {
        if (name && number && cvc && expiry) {
            alert(`Please wait while payment is processing Press OK`)
            setTimeout(() => {
                alert(`Your payment worth ${money} $ is paid`)
                setBuy(0)
            }, 1000)
        }
        else {
            alert("Please Fill all card details")
        }

    }

    const datapass = (d) => {
        setMoney(d)
        setBuy(1)
    }

    return (
        <div>{
            buy === 1 ? <Popup trigger={
                <div style={{ color: 'white', fontSize: 20 }}>
                    <div style={{ paddingBottom: 30 }}>
                        Please Enter Your Card Detail
                    </div>
                    <div>
                        <Cards
                            number={number}
                            name={name}
                            xpiry={expiry}
                            cvc={cvc}
                            focused={focus}
                        />
                        <form
                            style={{ paddingTop: 30, paddingBottom: 30 }}
                        >
                            <input type="tel"
                                name="number"
                                placeholder="Card Number"
                                value={number}
                                maxLength={16}
                                onChange={e => setNumber(e.target.value)}
                                onFocus={e => setFocus(e.target.name)}
                            />
                            <input type="text"
                                name="name"
                                placeholder="Name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                onFocus={e => setFocus(e.target.name)}
                            />
                            <input type="text"
                                name="expiry"
                                placeholder="MM/YY Expiry"
                                value={expiry}
                                onChange={e => setExpiry(e.target.value)}
                                onFocus={e => setFocus(e.target.name)}
                            />
                            <input type="tel"
                                name="cvc"
                                placeholder="CVC"
                                value={cvc}
                                maxLength={4}
                                onChange={e => setCvc(e.target.value)}
                                onFocus={e => setFocus(e.target.name)}
                            />
                        </form>

                        <Button onClick={() => { processMoney() }} variant="contained" color="primary" disableElevation>
                            Make Paymet
                        </Button>
                        <div style={{paddingTop: 20}}>
                            <Button onClick={() => { setBuy(0) }} variant="contained" color="primary" disableElevation>
                                Go Back
                        </Button>
                        </div>

                    </div>
                </div>
            } position="right center">
            </Popup> :
                <div class="container" style={{ alignContent: "center", justifyContent: 'center', justifyItems: 'center' }}>
                    <Grid container spacing={3}>
                        {posts.map(d => (
                            <Grid item xs={6} sm={3}>
                                <Card className={classes.root}>
                                    <CardActionArea>
                                        <CardMedia
                                            className={classes.media}
                                            image={`${d.image}`}
                                            title="Contemplative Reptile"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {d.name}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                {d.description}
                                            </Typography>
                                        </CardContent>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                Price: ${d.price}
                                            </Typography>
                                        </CardContent>
                                        <CardContent>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                {d.category}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Button value={`${d.price}`} onClick={() => { datapass(d.price) }} style={{ paddingLeft: 100 }} size="large" color="primary">
                                            Buy
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </div>
        }
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        flexGrow: 1,
    },
    media: {
        height: 140,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default DataFetching;
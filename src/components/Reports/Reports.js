import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// material ui imports
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';


const styles = theme => ({
    card: {
        textAlign: 'center'
    },
    input: {
        marginTop: 10,
        marginBottom: 10
    },
    heading:{
        marginTop: 15,
    }
})


class Reports extends Component {
    state = {
    staff:{
        id: '',
        start: '',
        end: '',}
    
    }
    componentDidMount(){
        this.props.dispatch({ type: 'GET_USERS'});
    }

    onChange = (event) => {
        this.setState({
            ...this.state,
            staff: {...this.state.staff, [event.target.name]: event.target.value}
        });
        console.log('in onChange');
    }

    submit = (event) => {
        event.preventDefault()
        this.setState({
            ...this.state,

        })
        this.props.dispatch({ type: 'FETCH_REPORTS', payload: this.state.staff});
    }


    render() {
        const { classes } = this.props
        console.log(this.state);
        return (
            <>
                <Grid container justify='center'>
                    <Grid item xs={12} md={4}>
                        <Card className={classes.card}>
                            <Grid container justify='center'>
                                <Grid item xs ={12}>
                                    <Typography variant='h4' className={classes.heading}>
                                        Completed Work Orders Report
                                    </Typography>
                                </Grid>
                                <Grid item xs={10} md={4}>
                                    <form onSubmit={this.submit}>
                                    {this.props.allUsers[0] && <TextField name='id' onChange={this.onChange} value={this.state.staff.id} required label='Maintenance Staff' fullWidth select className={classes.input} >
                                        <MenuItem value={''}></MenuItem>
                                    {this.props.allUsers.filter(user => user.role === 2).map(user => 
                                    <MenuItem key={user.id} value={user.id}>{user.first_name} {user.last_name}   </MenuItem>)}
                                    </TextField>}
                                    <TextField name='start' onChange={this.onChange} value={this.state.staff.start} required className={classes.input} type='date' label='start'
                                        InputLabelProps={{
                                            shrink: true,
                                        }} />
                                    <TextField name='end' onChange={this.onChange} value={this.state.staff.end} required className={classes.input} type='date' label='end'
                                        InputLabelProps={{
                                            shrink: true,
                                        }} />
                                    <Button className={classes.input} type="submit" color="primary" variant="contained">Create Report</Button>
                                    
                                    </form>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant='h5'> Number of Completed Work Orders: {this.props.reports[0]&& this.props.reports[0].count}</Typography>
                                </Grid> 
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
            </>
        );
    }
}
const mapStoreToProps = (store) => ({ allUsers: store.allUsers, reports: store.reports });

export default connect(mapStoreToProps)(withStyles(styles, { withTheme: true })(withRouter(Reports)));
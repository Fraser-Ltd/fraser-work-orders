import React, { Component } from 'react';

//material ui imports
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
    root: {
        marginTop: 25,
        Maxheight: 400,
        marginBottom: 40,
    },
    heading: {
        padding: 15,
        marginTop: 60,
    },
    tableHeading: {
        textAlign: 'center',
    },
    row: {
        '&:hover': { cursor: 'pointer' }
    },
    newOrder: {
        margin: 20,
        backgroundColor: 'yellow',
        '&:hover': { backgroundColor: 'green', color: 'white' }
    },
    cells: {
        textAlign: 'center',
    },
});

class PropertyTableItem extends Component {

    clicked = ()=>{
        let property = this.props.property
        this.props.editProperty(property.property_name, property.property_address, property.resident_coordinator, property.id)
    }
    
    render() {
        const { classes } = this.props;
        const property = this.props.property;
        return (
            <>
               <TableRow className={classes.row} hover={true} onClick={this.clicked}>
                    <TableCell className={classes.cells}>{property.property_name}</TableCell>
                    <TableCell className={classes.cells}>{property.property_address}</TableCell>
                    <TableCell className={classes.cells}>{property.rc_name}</TableCell>
                </TableRow>
            </>
        );
    }
}

export default withStyles(styles, {withTheme:true})(PropertyTableItem);
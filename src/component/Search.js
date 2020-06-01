import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { InputBase, Button, Paper, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
const styles = (theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 300,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 5,
    },
});
class Search extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Paper component="form" className={classes.root}>
                    <InputBase color="primary" className={classes.input} placeholder="검색어를 입력해주세요" name="search" />
                    <IconButton size="small" type="submit" className={classes.iconButton} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(Search);

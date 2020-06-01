import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Tab, Tabs } from '@material-ui/core';

const MyTabs = withStyles((theme) => ({
    root: { width: '100%' },
    indicator: {
        display: 'none',
    },
}))((props) => <Tabs centered variant="fullWidth" {...props} />);

const MyTab = withStyles((theme) => ({
    root: {
        minWidth: 80,
        [theme.breakpoints.up('md')]: {
            minWidth: 120,
        },
        padding: theme.spacing(0, 2),
        borderTopLeftRadius: theme.spacing(0.8),
        borderTopRightRadius: theme.spacing(0.8),
        borderBottom: '1px solid #c1bfcb',
        color: '#6d6c71',
        opacity: 1,
        fontSize: '16px',
        '&:hover': {
            //  backgroundColor: 'rgba(255,245,69,0.16)',
            border: '1px solid #c1bfcb',
        },
        '&$selected': {
            color: '#6d6c71',
            borderBottomWidth: 0,
            fontWeight: '600',
            border: '1px solid #c1bfcb',
        },
    },

    selected: {},
}))((props) => <Tab disableRipple {...props} />);

const styles = (theme) => ({
    root: {
        marginTop: theme.spacing(10),
    },
    logo: {
        textAlign: 'center',
        marginBottom: theme.spacing(8),
    },
});
class Collage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
        };
    }
    _changeTab = (e, n_value) => {
        this.setState({ value: n_value });
    };

    render() {
        console.log('render');
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.logo}>
                    <img src="logo/1.jpg" style={{ width: '400px', height: '120px' }} alt="대전대로고" title="대전대로고" />
                </div>

                <MyTabs value={this.state.value} onChange={this._changeTab}>
                    <MyTab label="체육분과" value={0} />
                    <MyTab label="봉사분과" value={1} />
                    <MyTab value={2} label="학술분과" />
                    <MyTab value={3} label="교양분과" />
                    <MyTab value={4} label="문화분과" />
                    <MyTab value={5} label="종교분과" />
                    <MyTab value={6} label="문예분과" />
                </MyTabs>
            </div>
        );
    }
}

export default withStyles(styles)(Collage);

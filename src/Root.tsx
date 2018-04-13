import * as React from 'react';
import BottomNavigation, { BottomNavigationAction, BottomNavigationActionProps } from 'material-ui/BottomNavigation';
import PersonIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';
import SearchIcon from '@material-ui/icons/Search';
import CheckIcon from '@material-ui/icons/CheckCircle';
import Classes from './components/pages/Classes';
import Missing from './components/pages/Missing';
import Search from './components/pages/Search';
import Checklist from './components/pages/Checklist';
import { withStyles } from 'material-ui';

const styles = {
    root: {
        color: 'rgba(0, 0, 0, 0.3)'
    },
    selected: {
        color: '#37474F'
    }
};
const StyledBottomNavigationAction = withStyles(styles)(bottomNavigationAction);

function bottomNavigationAction(props: BottomNavigationActionProps) {
    return <BottomNavigationAction {...props}>{props.children}</BottomNavigationAction>;
}

interface RootState {
    index: number;
}

interface RootProps {}

export class Root extends React.Component<RootProps, RootState> {
    constructor(props: RootProps) {
        super(props);
        this.state = {
            index: 0
        };
    }

    handleChange = (event: any, index: any) => {
        this.setState({ index });
    };

    public render() {
        return (
            <div>
                <Classes isVisible={this.state.index === 0} />
                <Missing isVisible={this.state.index === 1} />
                <Search isVisible={this.state.index === 2} />
                <Checklist isVisible={this.state.index === 3} />
                <BottomNavigation
                    value={this.state.index}
                    onChange={this.handleChange}
                    showLabels={true}
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        boxShadow: '1px 1px 10px 1px rgba(0, 0, 0, 0.15)'
                    }}
                >
                    <StyledBottomNavigationAction label="Classes" icon={<PeopleIcon />} />
                    <StyledBottomNavigationAction label="Missing" icon={<PersonIcon />} />
                    <StyledBottomNavigationAction label="Search" icon={<SearchIcon />} />
                    <StyledBottomNavigationAction label="Checklist" icon={<CheckIcon />} />
                </BottomNavigation>
            </div>
        );
    }
}

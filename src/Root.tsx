import CheckIcon from '@material-ui/icons/CheckCircle';
import PeopleIcon from '@material-ui/icons/People';
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';
import BottomNavigation from 'material-ui/BottomNavigation';
import * as React from 'react';
import Checklist from './components/pages/Checklist';
import Classes from './components/pages/Classes';
import Missing from './components/pages/Missing';
import Search from './components/pages/Search';
import StyledBottomNavigationAction from './components/shared/StyledBottomNavigation';

interface State {
    index: number;
}

interface Props {}

export class Root extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            index: 0
        };
    }

    public handleChange = (event: any, index: any) => {
        this.setState({ index });
    };

    public render(): JSX.Element {
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

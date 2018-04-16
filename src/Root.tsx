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
import { Route, RouteComponentProps } from 'react-router-dom';
import { withRouter } from 'react-router';

interface RootProps {}

let currentTab: number = 0;

const Root: React.SFC<RootProps> = (props: RootProps & RouteComponentProps<RootProps>) => {
    const { history } = props;

    const handleChange = (event: any, index: any) => {
        console.log(currentTab);
        console.log('index: ', index);
        switch (index) {
            case 0:
                currentTab = index;
                history.push('/classes');
                break;
            case 1:
                currentTab = index;
                history.push('/missing');
                break;
            case 2:
                currentTab = index;
                history.push('/search');
                break;
            case 3:
                currentTab = index;
                history.push('/checklist');
                break;

            default:
                currentTab = 0;
                history.push('/classes');
                break;
        }
    };

    return (
        <div>
            <Route
                exact={false}
                path="/classes"
                children={({ match }) => <Classes isVisible={match ? true : false} />}
            />
            <Route
                exact={true}
                path="/missing"
                children={({ match }) => <Missing isVisible={match ? true : false} />}
            />
            <Route exact={true} path="/search" children={({ match }) => <Search isVisible={match ? true : false} />} />
            <Route
                exact={true}
                path="/checklist"
                children={({ match }) => <Checklist isVisible={match ? true : false} />}
            />

            <BottomNavigation
                value={currentTab}
                onChange={handleChange}
                showLabels={true}
                style={{
                    position: 'fixed',
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
};

const RootWithRouter = withRouter(Root);

export default RootWithRouter;

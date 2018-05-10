import CheckIcon from '@material-ui/icons/CheckCircle';
import blueGrey from 'material-ui/colors/blueGrey';
import { inject } from 'mobx-react';
import * as React from 'react';
import { NavigationTabScreenOptions, StackNavigator } from 'react-navigation';
import { Colors } from '../../config/materialUiTheme';
import { Routes } from '../../config/routes';
import { Stores } from '../../stores';
import Checklist from '../pages/Checklist';
import ChecklistDetail from '../pages/ChecklistDetail';

namespace styles {
    export const iconStyle = {
        height: 20,
        width: 20
    };
}

interface Props {
    checklists: string[];
}

/**
 * This is the navigator that controls the two states of the checklist tab
 * A. Checklist titles
 * B. Checklist details
 */
class ChecklistNavigator extends React.Component<Props> {
    static navigationOptions: NavigationTabScreenOptions = {
        tabBarIcon: ({ focused, tintColor }) => {
            const iconStyle = {
                ...styles.iconStyle,
                color: focused ? blueGrey[800] : Colors.DISABLED_TAB_ICON
            };

            return <CheckIcon style={iconStyle} />;
        }
    };

    private navigator = this.buildNavigator(this.props);

    public componentWillReceiveProps(nextProps: Props): void {
        this.navigator = this.buildNavigator(nextProps);
    }

    public render(): JSX.Element {
        const Navigator = this.navigator;
        return <Navigator />;
    }

    private buildNavigator(props: Props) {
        return StackNavigator(
            props.checklists.reduce((routes, checklist) => ({ ...routes, [checklist]: ChecklistDetail }), {
                [Routes.Checklist]: Checklist
            }),
            {
                headerMode: 'none'
            }
        );
    }
}

function mapStoresToProps({ checklistStore }: Stores): Props {
    return { checklists: Object.keys(checklistStore.checklists) };
}

export default inject(mapStoresToProps)(ChecklistNavigator);

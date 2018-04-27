import CheckIcon from '@material-ui/icons/CheckCircle';
import blueGrey from 'material-ui/colors/blueGrey';
import * as React from 'react';
import { NavigationTabScreenOptions, StackNavigator } from 'react-navigation';
import { Colors } from '../../config/materialUiTheme';
import { Stores } from '../../stores';
import ChecklistDetail from '../pages/ChecklistDetail';
import { inject } from 'mobx-react';
import { Routes } from '../../config/routes';
import Checklist from '../pages/Checklist';

namespace styles {
    export const iconStyle = {
        height: 20,
        width: 20
    };
}

interface Props {
    checklists: string[];
}

class ChecklistNavigator extends React.Component<Props> {
    static navigationOptions: NavigationTabScreenOptions = {
        tabBarIcon: ({ focused, tintColor }) => {
            const iconStyle = (isFocused: boolean) => {
                return {
                    ...styles.iconStyle,
                    color: focused ? blueGrey[800] : Colors.DISABLED_TAB_ICON
                };
            };

            return <CheckIcon style={iconStyle(focused)} />;
        }
    };

    private navigator = StackNavigator(
        this.props.checklists.reduce((routes, checklist) => ({ ...routes, [checklist]: ChecklistDetail }), {
            [Routes.Checklist]: Checklist
        }),
        {
            headerMode: 'none'
        }
    );

    componentWillReceiveProps(nextProps: Props) {
        this.navigator = StackNavigator(
            nextProps.checklists.reduce((routes, checklist) => ({ ...routes, [checklist]: ChecklistDetail }), {}),
            {
                headerMode: 'none'
            }
        );
    }

    public render(): JSX.Element {
        const Navigator = this.navigator;
        return <Navigator />;
    }
}

function mapStoresToProps({ checklistStore }: Stores): Props {
    return { checklists: Object.keys(checklistStore.checklists) };
}

export default inject(mapStoresToProps)(ChecklistNavigator);

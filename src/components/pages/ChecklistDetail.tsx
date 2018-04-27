import BackIcon from '@material-ui/icons/ArrowBack';
import { Button, IconButton, Toolbar } from 'material-ui';
import AppBar from 'material-ui/AppBar';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { CSSProperties } from 'react';
import { View, ViewStyle } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { Stores } from '../../stores';
import { StatefulChecklistItem } from '../../stores/ChecklistStore';
import { ContentView } from '../shared';

interface StoreProps {
    checklistItems: StatefulChecklistItem[];
    setChecklistItemStatus(listName: string, key: string, completed: boolean): void;
}

interface Props extends StoreProps, NavigationScreenProps {}

namespace styles {
    export const viewStyle: ViewStyle = {
        backgroundColor: 'white',
        display: 'flex',
        flexGrow: 1,
        height: '100%'
    };
    export const hideBoxShadow = { boxShadow: 'none' };
    export const iconButton: CSSProperties = { alignSelf: 'center', marginLeft: -10 };
}

@observer
class ChecklistDetail extends React.Component<Props> {
    public render(): JSX.Element {
        return (
            <ContentView>
                <AppBar position={'fixed'} style={styles.hideBoxShadow}>
                    <Toolbar style={{ alignItems: 'stretch' }}>
                        <IconButton
                            color="inherit"
                            aria-label="Menu"
                            style={styles.iconButton}
                            onClick={() => this.props.navigation.goBack()}
                        >
                            <BackIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <View>
                    {this.props.checklistItems.map(item => (
                        <Button
                            onClick={() =>
                                this.props.setChecklistItemStatus(
                                    this.props.navigation.state.routeName,
                                    item.key,
                                    !item.completed
                                )
                            }
                            key={item.key}
                        >
                            {item.value + ' ' + item.completed}
                        </Button>
                    ))}
                </View>
            </ContentView>
        );
    }
}

function mapStoresToProps({ checklistStore }: Stores, props: Props): StoreProps {
    return {
        checklistItems: checklistStore.checklists[props.navigation.state.routeName],
        setChecklistItemStatus: (listName, key, completed) =>
            checklistStore.setChecklistItemStatus(listName, key, completed)
    };
}

export default inject(mapStoresToProps)(ChecklistDetail);

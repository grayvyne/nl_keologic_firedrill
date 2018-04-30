import BackIcon from '@material-ui/icons/ArrowBack';
import { Button, IconButton, Typography, Checkbox } from 'material-ui';
import AppBar from 'material-ui/AppBar';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { CSSProperties } from 'react';
import { View, ViewStyle, Text } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { Stores } from '../../stores';
import { StatefulChecklistItem } from '../../stores/ChecklistStore';
import { ContentView, TableCell, Toolbar } from '../shared';

interface StoreProps {
    checklistItems: StatefulChecklistItem[];
    setChecklistItemStatus(key: string, completed: boolean): void;
    clearChecklistStatus(): void;
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
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="Menu"
                            style={styles.iconButton}
                            onClick={() => this.props.navigation.goBack()}
                        >
                            <BackIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit" style={{ flex: 1 }}>
                            {this.props.navigation.state.routeName}
                        </Typography>
                        <Button color="inherit" onClick={this.props.clearChecklistStatus}>
                            Clear
                        </Button>
                    </Toolbar>
                </AppBar>
                <View>
                    {this.props.checklistItems.map(item => (
                        <TableCell onClick={this.handleChecklistItemPress(item)} key={item.key}>
                            <View style={{ flex: 1 }}>
                                <Text
                                    style={{
                                        textDecorationLine: item.completed ? 'line-through' : 'none'
                                    }}
                                >
                                    {item.value}
                                </Text>
                            </View>
                            <Checkbox checked={item.completed} />
                        </TableCell>
                    ))}
                </View>
            </ContentView>
        );
    }

    private handleChecklistItemPress(item: StatefulChecklistItem): () => void {
        return () => this.props.setChecklistItemStatus(item.key, false === item.completed);
    }
}

function mapStoresToProps({ checklistStore }: Stores, props: Props): StoreProps {
    const { routeName } = props.navigation.state;
    return {
        checklistItems: checklistStore.checklists[routeName],
        setChecklistItemStatus: (key, completed) => checklistStore.setChecklistItemStatus(routeName, key, completed),
        clearChecklistStatus: () => checklistStore.clearChecklistStatus(routeName)
    };
}

export default inject(mapStoresToProps)(ChecklistDetail);

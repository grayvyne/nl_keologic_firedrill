import AppsIcon from '@material-ui/icons/Apps';
import { IconButton, Typography } from 'material-ui';
import AppBar from 'material-ui/AppBar';
import { inject } from 'mobx-react';
import * as React from 'react';
import { ViewStyle, Text } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { Stores } from '../../stores';
import { TableCell, TableView, Toolbar } from '../shared';
import ContentView from '../shared/ContentView';
import { ChecklistStrings } from '../../config/uiConstants';

interface State {
    index: number;
}

interface StoreProps {
    checklists: string[];
}

interface Props extends StoreProps, NavigationScreenProps {}

namespace styles {
    export const iconButton: React.CSSProperties = { alignSelf: 'center', marginLeft: -10 };
    export const viewStyle: ViewStyle = {
        backgroundColor: 'white',
        display: 'flex',
        flexGrow: 1,
        height: '100%'
    };
    export const hideBoxShadow = { boxShadow: 'none' };
}

class Checklist extends React.Component<Props, State> {
    public constructor(props: Props) {
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
            <ContentView>
                <AppBar position={'fixed'} style={styles.hideBoxShadow}>
                        <IconButton color="inherit" aria-label="Menu" style={styles.iconButton}>
                    <Toolbar>
                            <AppsIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit" style={{ flex: 1 }}>
                            {ChecklistStrings.TITLE}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <TableView>
                    {this.props.checklists.map(checklistName => (
                        <TableCell onClick={() => this.props.navigation.navigate(checklistName)} key={checklistName}>
                            <Text>{checklistName}</Text>
                        </TableCell>
                    ))}
                </TableView>
            </ContentView>
        );
    }
}

function mapStoresToProps({ checklistStore }: Stores, props: Props): StoreProps {
    return { checklists: Object.keys(checklistStore.checklists) };
}

export default inject(mapStoresToProps)(Checklist);

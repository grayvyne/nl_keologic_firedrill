import AppsIcon from '@material-ui/icons/Apps';
import { IconButton, Typography } from 'material-ui';
import { inject } from 'mobx-react';
import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { Stores } from '../../stores';
import { TableCell, TableView, AppBar } from '../shared';
import ContentView from '../shared/ContentView';
import { ApplicationServices } from '../../services/ApplicationServices';
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
    export const expand = { flex: 1 };
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
            <View>
                <AppBar>
                    <IconButton
                        color="inherit"
                        aria-label="Menu"
                        style={styles.iconButton}
                        onClick={ApplicationServices.togglePluginMenu}
                    >
                        <AppsIcon />
                    </IconButton>
                    <Typography variant="title" color="inherit" style={styles.expand}>
                        {ChecklistStrings.TITLE}
                    </Typography>
                </AppBar>
                <ContentView>
                    <TableView>
                        {this.props.checklists.map(checklistName => (
                            <TableCell
                                onClick={() => this.props.navigation.navigate(checklistName)}
                                key={checklistName}
                            >
                                <Text>{checklistName}</Text>
                            </TableCell>
                        ))}
                    </TableView>
                </ContentView>
            </View>
        );
    }
}

function mapStoresToProps({ checklistStore }: Stores, props: Props): StoreProps {
    return { checklists: Object.keys(checklistStore.checklists) };
}

export default inject(mapStoresToProps)(Checklist);

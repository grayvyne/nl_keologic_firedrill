import AppsIcon from '@material-ui/icons/Apps';
import { IconButton, Typography } from 'material-ui';
import { inject } from 'mobx-react';
import * as React from 'react';
import { View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { ChecklistStrings } from '../../config/uiConstants';
import { ApplicationServices } from '../../services/ApplicationServices';
import { Stores } from '../../stores';
import { AppBar, TableCell, TableView } from '../shared';
import ContentView from '../shared/ContentView';
import PlayArrow from '@material-ui/icons/PlayArrow';
import { Colors } from '../../config/materialUiTheme';

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
    export const playArrow: React.CSSProperties = {
        height: 15,
        width: 15,
        position: 'absolute',
        top: 25,
        right: 15,
        fill: Colors.ICON_GREY
    };
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
                <AppBar position={'fixed'}>
                    <IconButton
                        onClick={ApplicationServices.togglePluginMenu}
                        color="inherit"
                        aria-label="Menu"
                        style={styles.iconButton}
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
                                style={{ flexDirection: 'row' }}
                            >
                                <Typography variant="body1">{checklistName}</Typography>
                                <PlayArrow style={styles.playArrow} />
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

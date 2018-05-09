import AppsIcon from '@material-ui/icons/Apps';
import PlayArrow from '@material-ui/icons/PlayArrow';
import { IconButton, Typography } from 'material-ui';
import { inject } from 'mobx-react';
import * as React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { Colors } from '../../config/materialUiTheme';
import { ChecklistStrings } from '../../config/uiConstants';
import { ApplicationServices } from '../../platform';
import { Stores } from '../../stores';
import { AppBar, ContentView, TableCell, TableView } from '../shared';

interface StoreProps {
    checklists: string[];
}

interface Props extends StoreProps, NavigationScreenProps {}

namespace styles {
    export const expand = { flex: 1 };
    export const playArrow: React.CSSProperties = {
        height: 15,
        width: 15,
        fill: Colors.ICON_GREY
    };
    export const cell: React.CSSProperties = { flexDirection: 'row', justifyContent: 'space-between' };
}

/**
 * Page that contains the list of checklists, clicking on a checklist goes into ChecklistDetail
 */
class Checklist extends React.Component<Props> {
    public render(): JSX.Element {
        return (
            <div>
                <AppBar>
                    <IconButton onClick={ApplicationServices.togglePluginMenu} color="inherit" aria-label="Menu">
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
                                style={styles.cell}
                            >
                                <Typography variant="body1">{checklistName}</Typography>
                                <PlayArrow style={styles.playArrow} />
                            </TableCell>
                        ))}
                    </TableView>
                </ContentView>
            </div>
        );
    }
}

function mapStoresToProps({ checklistStore }: Stores, props: Props): StoreProps {
    return { checklists: Object.keys(checklistStore.checklists) };
}

export default inject(mapStoresToProps)(Checklist);

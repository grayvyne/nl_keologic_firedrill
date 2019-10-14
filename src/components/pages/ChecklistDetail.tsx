import BackIcon from '@material-ui/icons/ArrowBack';
import { Button, Checkbox, IconButton, Typography, withStyles } from 'material-ui';
import { red } from 'material-ui/colors';
import { TypographyProps } from 'material-ui/Typography';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { Stores } from '../../stores';
import { StatefulChecklistItem } from '../../stores/ChecklistStore';
import { AppBar, ContentView, TableCell, TableView } from '../shared';

interface StoreProps {
    checklistItems: StatefulChecklistItem[];
    setChecklistItemStatus(key: string, completed: boolean): void;
    clearChecklistStatus(): void;
}

interface Props extends StoreProps, NavigationScreenProps {}

namespace styles {
    export const expand = { flex: 1 };
    export const checklistItemContainer: React.CSSProperties = {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    };
    export const checkbox: React.CSSProperties = { height: 24, width: 24, marginLeft: 24 };
    export const strikethrough: React.CSSProperties = { textDecorationLine: 'line-through' };
    export const container: React.CSSProperties = { display: 'flex', flex: 1 };
}

const StrikeThroughText = withStyles({ body1: styles.strikethrough })((props: TypographyProps) => (
    <Typography classes={{ body1: props.classes!.body1 }} {...props} />
));

/**
 * The page that renders the list of checklist items within a certain checklist
 */
@observer
class ChecklistDetail extends React.Component<Props> {
    public render(): JSX.Element {
        return (
            <div style={styles.container}>
                <AppBar>
                    <IconButton color="inherit" aria-label="Menu" onClick={() => this.props.navigation.goBack()}>
                        <BackIcon />
                    </IconButton>
                    <Typography variant="title" color="inherit" style={styles.expand}>
                        {this.props.navigation.state.routeName}
                    </Typography>
                    <Button color="inherit" onClick={this.props.clearChecklistStatus}>
                        Clear
                    </Button>
                </AppBar>
                <ContentView>
                    <TableView>
                        {this.props.checklistItems.map(item => (
                            <TableCell onClick={this.handleChecklistItemPress(item)} key={item.key}>
                                <div style={styles.checklistItemContainer}>
                                    <div style={styles.expand}>
                                        {item.completed ? (
                                            <StrikeThroughText variant="body1">{item.value}</StrikeThroughText>
                                        ) : (
                                            <Typography variant="body1">{item.value}</Typography>
                                        )}
                                    </div>
                                    <Checkbox
                                        checked={item.completed}
                                        style={{
                                            color: item.completed ? red[400] : undefined,
                                            ...styles.checkbox
                                        }}
                                    />
                                </div>
                            </TableCell>
                        ))}
                    </TableView>
                </ContentView>
            </div>
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

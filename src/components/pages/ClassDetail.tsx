import BackIcon from '@material-ui/icons/ArrowBack';
import { IconButton, Toolbar } from 'material-ui';
import AppBar from 'material-ui/AppBar';
import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import ContentView from '../shared/ContentView';
import TableView from '../shared/TableView';
import { FiredrillClass } from '../../models/FiredrillClass';
import { Stores } from '../../stores';
import { inject, observer } from 'mobx-react';
import { ActionTableCell } from '../shared';
import { Student, Status } from '../../models/Student';

interface StoreProps {
    class: FiredrillClass | undefined;
}

interface Props extends NavigationScreenProps<{ classID: number }>, StoreProps {}

@observer
class ClassDetail extends React.Component<Props> {
    public render(): JSX.Element {
        return (
            <View>
                <AppBar position={'fixed'} style={{ boxShadow: 'none' }}>
                    <Toolbar style={{ alignItems: 'stretch' }}>
                        <IconButton
                            color="inherit"
                            aria-label="Menu"
                            style={{ alignSelf: 'center', marginLeft: -10 }}
                            onClick={() => this.props.navigation.goBack()}
                        >
                            <BackIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <ContentView>
                    <ScrollView>
                        <TableView>{this.props.class!.students.map(this.renderTableCell)}</TableView>
                    </ScrollView>
                </ContentView>
            </View>
        );
    }

    private renderTableCell = (student: Student): JSX.Element => {
        let cellProps = this.buildTableCellProps(student.status);

        return (
            <ActionTableCell
                key={student.userID}
                cellData={{ id: student.userID, label: student.firstName + ' ' + student.lastName }}
                buttonTextColor="white"
                {...cellProps}
            />
        );
    };

    private buildTableCellProps(status: Status): {} {
        switch (status) {
            case Status.Missing:
                return { buttonLabel: 'Missing', buttonColor: 'red' };
            default:
                return { buttonLabel: 'Found', buttonColor: 'blue' };
        }
    }
}

function mapStoresToProps({ firedrillStore }: Stores, props: Props): StoreProps {
    return { class: firedrillStore.classes.get(props.navigation.state.params!.classID) };
}

export default inject(mapStoresToProps)(ClassDetail);

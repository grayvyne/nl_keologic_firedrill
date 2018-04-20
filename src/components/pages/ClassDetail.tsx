import BackIcon from '@material-ui/icons/ArrowBack';
import { IconButton, Toolbar } from 'material-ui';
import AppBar from 'material-ui/AppBar';
import * as React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import ContentView from '../shared/ContentView';
import { SingleClass } from './Classes';
import ActionTableCell from '../shared/ActionTableCell';
import TableView from '../shared/TableView';
import { View, ScrollView } from 'react-native';

export default class ClassDetail extends React.Component<NavigationScreenProps> {
    data: SingleClass[] = [
        {
            id: 1,
            name: 'Mrs. Smithson',
            grade: '3',
            found: 12,
            total: 24
        },
        {
            id: 2,
            name: 'Mrs. Smithson',
            grade: '3',
            found: 12,
            total: 24
        },
        {
            id: 3,
            name: 'Mrs. Smithson',
            grade: '3',
            found: 12,
            total: 24
        },
        {
            id: 4,
            name: 'Mrs. Smithson',
            grade: '3',
            found: 12,
            total: 24
        },
        {
            id: 5,
            name: 'Mrs. Smithson',
            grade: '3',
            found: 12,
            total: 24
        },
        {
            id: 6,
            name: 'Mrs. Smithson',
            grade: '3',
            found: 12,
            total: 24
        },
        {
            id: 7,
            name: 'Mrs. Smithson',
            grade: '3',
            found: 12,
            total: 24
        },
        {
            id: 8,
            name: 'Mrs. Smithson',
            grade: '3',
            found: 12,
            total: 24
        },
        {
            id: 9,
            name: 'Mrs. Smithson',
            grade: '3',
            found: 12,
            total: 24
        },
        {
            id: 10,
            name: 'Mrs. Smithson',
            grade: '3',
            found: 12,
            total: 24
        },
        {
            id: 11,
            name: 'Mrs. Smithson',
            grade: '3',
            found: 12,
            total: 24
        },
        {
            id: 12,
            name: 'Mrs. Smithson',
            grade: '3',
            found: 12,
            total: 24
        },
        {
            id: 13,
            name: 'Mrs. Smithson',
            grade: '3',
            found: 12,
            total: 24
        }
    ];
    render() {
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
                        <TableView>
                            {this.data.map(singleClass => {
                                return (
                                    <ActionTableCell
                                        cellData={{
                                            id: singleClass.id,
                                            label: singleClass.name,
                                            subLabel: singleClass.grade
                                        }}
                                        key={singleClass.id}
                                        buttonLabel={'Claim'}
                                        buttonColor={'red'}
                                        buttonTextColor={'white'}
                                    />
                                );
                            })}
                        </TableView>
                    </ScrollView>
                </ContentView>
            </View>
        );
    }
}

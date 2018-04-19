import AppsIcon from '@material-ui/icons/Apps';
import CheckIcon from '@material-ui/icons/CheckCircle';
import { Badge, IconButton, Toolbar } from 'material-ui';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import TabStyles from '../../config/TabStyles';
import ClassesTableCell from '../navigators/ClassesTableCell';
import ActionTableCell from '../shared/ActionTableCell';
import ContentView from '../shared/ContentView';
import ScrollView from '../shared/ScrollView';
import TableView from '../shared/TableView';
import { ApplicationServices } from '../../services/ApplicationServices';

export type SingleClass = {
    id: number;
    name: string;
    grade: string;
    found: number;
    total: number;
};

interface ClassesState {
    index: number;
}

interface ClassesProps {
    isVisible: boolean;
}

export class Classes extends React.Component<ClassesProps, ClassesState> {
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
        },
        {
            id: 30,
            name: 'Mrs. Smithson',
            grade: '3',
            found: 12,
            total: 24
        },
        {
            id: 14,
            name: 'Mrs. Smithson',
            grade: '3',
            found: 12,
            total: 24
        },
        {
            id: 15,
            name: 'Mrs. Smithson',
            grade: '3',
            found: 12,
            total: 24
        },
        {
            id: 16,
            name: 'Mrs. Smithson',
            grade: '3',
            found: 12,
            total: 24
        },
        {
            id: 17,
            name: 'Mrs. Smithson',
            grade: '3',
            found: 12,
            total: 24
        },
        {
            id: 18,
            name: 'Mrs. Smithson',
            grade: '3',
            found: 12,
            total: 24
        },
        {
            id: 19,
            name: 'Mrs. Smithson',
            grade: '3',
            found: 12,
            total: 24
        },
        {
            id: 21,
            name: 'Mrs. Smithson',
            grade: '3',
            found: 12,
            total: 24
        },
        {
            id: 22,
            name: 'Mrs. Smithson',
            grade: '3',
            found: 12,
            total: 24
        },
        {
            id: 23,
            name: 'Mrs. Smithson',
            grade: '3',
            found: 12,
            total: 24
        },
        {
            id: 24,
            name: 'Mrs. Smithson',
            grade: '3',
            found: 12,
            total: 24
        },
        {
            id: 25,
            name: 'Mrs. Smithson',
            grade: '3',
            found: 12,
            total: 24
        }
    ];

    constructor(props: ClassesProps) {
        super(props);
        this.state = {
            index: 0
        };
    }

    handleTabChange = (event: any, index: any) => {
        this.setState({ index });
    };

    handleChange = (index: any) => {
        this.setState({ index });
    };

    render() {
        return true ? (
            <div>
                <ContentView>
                    <AppBar position={'fixed'} style={{ boxShadow: 'none' }}>
                        <Toolbar style={{ alignItems: 'stretch' }}>
                            <IconButton
                                color="inherit"
                                aria-label="Menu"
                                style={{ alignSelf: 'center', marginLeft: -10 }}
                                onClick={ApplicationServices.togglePluginMenu}
                            >
                                <AppsIcon />
                            </IconButton>
                            <Tabs
                                value={this.state.index}
                                onChange={this.handleTabChange}
                                indicatorColor="white"
                                textColor="inherit"
                                fullWidth={true}
                                style={{ height: '100%' }}
                            >
                                <Tab label={<span style={{ fontSize: 10 }}>Your Classes</span>} style={TabStyles} />
                                <Tab label={<span style={{ fontSize: 10 }}>Find Classes</span>} style={TabStyles} />
                                <Tab
                                    label={
                                        <span>
                                            <span style={{ fontSize: 10, marginRight: 40 }}>Unclaimed</span>
                                            <Badge
                                                color="secondary"
                                                badgeContent={999}
                                                children={<span />}
                                                style={{ marginLeft: -20, fontSize: 8 }}
                                            />
                                        </span>
                                        // tslint:disable-next-line:jsx-curly-spacing
                                    }
                                    style={TabStyles}
                                >
                                    <CheckIcon />
                                </Tab>
                            </Tabs>
                        </Toolbar>
                    </AppBar>
                    <SwipeableViews index={this.state.index} onChangeIndex={this.handleChange}>
                        <ScrollView>
                            <TableView>
                                {this.data.map(singleClass => {
                                    return (
                                        <ClassesTableCell
                                            onClick={() => (this.props as any).navigation.navigate('ClassDetail')}
                                            key={singleClass.id}
                                            singleClass={singleClass}
                                        />
                                    );
                                })}
                            </TableView>
                        </ScrollView>
                        <ScrollView>
                            <TableView>
                                {this.data.map(singleClass => {
                                    return (
                                        <ActionTableCell
                                            onClick={() => (this.props as any).navigation.navigate('ClassDetail')}
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
                        <div>Test Three</div>
                    </SwipeableViews>
                </ContentView>
            </div>
        ) : null;
    }
}

export default Classes;

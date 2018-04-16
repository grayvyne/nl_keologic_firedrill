import AppsIcon from '@material-ui/icons/Apps';
import CheckIcon from '@material-ui/icons/CheckCircle';
import { Badge, IconButton, Toolbar, Table, TableBody } from 'material-ui';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import TabStyles from '../../config/TabStyles';
import ClassesTableCell from '../navigators/ClassesTableCell';

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

    handleChange = (event: any, index: any) => {
        this.setState({ index });
    };

    render() {
        return this.props.isVisible ? (
            <div>
                <AppBar position={'fixed'} style={{ boxShadow: 'none' }}>
                    <Toolbar style={{ alignItems: 'stretch' }}>
                        <IconButton color="inherit" aria-label="Menu" style={{ alignSelf: 'center', marginLeft: -10 }}>
                            <AppsIcon />
                        </IconButton>
                        <Tabs
                            value={this.state.index}
                            onChange={this.handleChange}
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
                <SwipeableViews
                    index={this.state.index}
                    onChangeIndex={this.handleChange}
                    style={{ position: 'absolute', top: 55, bottom: 55, left: 0, right: 0 }}
                >
                    <div>
                        <Table>
                            <TableBody>
                                {this.data.map(singleClass => {
                                    return <ClassesTableCell key={singleClass.id} singleClass={singleClass} />;
                                })}
                            </TableBody>
                        </Table>
                    </div>
                    <div>Test Two</div>
                    <div>Test Three</div>
                </SwipeableViews>
            </div>
        ) : null;
    }
}

export default Classes;

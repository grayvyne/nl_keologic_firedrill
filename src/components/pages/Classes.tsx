import AppsIcon from '@material-ui/icons/Apps';
import CheckIcon from '@material-ui/icons/CheckCircle';
import { Badge, IconButton, Toolbar } from 'material-ui';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import TabStyles from '../../config/TabStyles';
import ClassesTableCell from '../shared/ClassesTableCell';
import ActionTableCell from '../shared/ActionTableCell';
import ContentView from '../shared/ContentView';
import { ScrollView, View, Text, ViewStyle } from 'react-native';
import TableView from '../shared/TableView';
import { NavigationScreenProps } from 'react-navigation';
import SearchBar from '../shared/SearchBar';
import TableHeader from '../shared/TableHeader';
import { ApplicationServices } from '../../services/ApplicationServices';
import { FiredrillClass } from '../../models/FiredrillClass';
import { Stores } from '../../stores';
import { inject, observer } from 'mobx-react';

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

interface StoreProps {
    myClasses: FiredrillClass[];
    classes: FiredrillClass[];
    unclaimedClasses: FiredrillClass[];
}

interface ClassesProps extends StoreProps {
interface ClassesProps extends NavigationScreenProps {
    isVisible: boolean;
}

namespace style {
    export const appBarStyle: React.CSSProperties = { boxShadow: 'none' };
    export const toolBarStyle: React.CSSProperties = { alignItems: 'stretch' };
    export const iconButtonStyle: React.CSSProperties = { alignSelf: 'center', marginLeft: -10 };
    export const tabsStyle: React.CSSProperties = { height: '100%' };
    export const unclaimedTabStyle: React.CSSProperties = { fontSize: 10, marginRight: 40 };
    export const unclaimedTabBadgeStyle: React.CSSProperties = { marginLeft: -20, fontSize: 8 };
    export const swipeableViewStyle: React.CSSProperties = { backgroundColor: 'white', height: '100%' };
    export const headerLeft: ViewStyle = { display: 'flex', flexGrow: 1 };
    export const headerRight: ViewStyle = { marginRight: 25 };
}

export class Classes extends React.Component<ClassesProps & NavigationScreenProps, ClassesState> {
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
        return (
            <ContentView>
                <AppBar position={'fixed'} style={style.appBarStyle}>
                    <Toolbar style={style.toolBarStyle}>
                        <IconButton color="inherit" aria-label="Menu" style={style.iconButtonStyle}>
                            <AppsIcon />
                        </IconButton>
                        <Tabs
                            value={this.state.index}
                            onChange={this.handleTabChange}
                            indicatorColor="white"
                            textColor="inherit"
                            fullWidth={true}
                            style={style.tabsStyle}
                        >
                            <Tab label={<span style={{ fontSize: 10 }}>Your Classes</span>} style={TabStyles} />
                            <Tab label={<span style={{ fontSize: 10 }}>Find Classes</span>} style={TabStyles} />
                            <Tab
                                label={
                                    <span>
                                        <span style={style.unclaimedTabStyle}>Unclaimed</span>
                                        <Badge
                                            color="secondary"
                                            badgeContent={999}
                                            children={<span />}
                                            style={style.unclaimedTabBadgeStyle}
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
                    style={style.swipeableViewStyle}
                >
                    <ScrollView>
                        <TableView>
                            {this.data.map(singleClass => {
                                return (
                                    <ClassesTableCell
                                        onClick={() => this.props.navigation.navigate('ClassDetail')}
                                        key={singleClass.id}
                                        singleClass={singleClass}
                                    />
                                );
                            })}
                        </TableView>
                    </ScrollView>
                    <ScrollView>
                        <SearchBar />
                        <TableView>
                            {this.data.map(singleClass => {
                                return (
                                    <ActionTableCell
                                        onClick={() => this.props.navigation.navigate('ClassDetail')}
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
                    <ScrollView>
                        <TableView>
                            <TableHeader>
                                <View style={style.headerLeft}>
                                    <Text>Class</Text>
                                </View>
                                <View style={style.headerRight}>
                                    <Text>Status</Text>
                                </View>
                            </TableHeader>
                            {this.data.map(singleClass => {
                                return (
                                    <ActionTableCell
                                        onClick={() => this.props.navigation.navigate('ClassDetail')}
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
                </SwipeableViews>
            </ContentView>
        );
    }
}

function mapStoresToClasses({ firedrillStore }: Stores, props: ClassesProps): StoreProps {
    return {
        myClasses: firedrillStore.myClasses,
        classes: firedrillStore.allClasses,
        unclaimedClasses: firedrillStore.unclaimedClasses
    };
}

export default inject(mapStoresToClasses)(Classes);

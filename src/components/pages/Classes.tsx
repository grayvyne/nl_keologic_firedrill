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
    classes: FiredrillClass[];
}

interface ClassesProps extends StoreProps {
    isVisible: boolean;
}

@observer
export class Classes extends React.Component<ClassesProps, ClassesState> {
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
                                {this.props.classes.map(singleClass => {
                                    return (
                                        <ClassesTableCell
                                            onClick={() => (this.props as any).navigation.navigate('ClassDetail')}
                                            key={singleClass.classID}
                                            singleClass={singleClass}
                                        />
                                    );
                                })}
                            </TableView>
                        </ScrollView>
                        <ScrollView>
                            <TableView>
                                {this.props.classes.map(singleClass => {
                                    return (
                                        <ActionTableCell
                                            onClick={() => (this.props as any).navigation.navigate('ClassDetail')}
                                            cellData={{
                                                id: singleClass.classID,
                                                label: singleClass.name,
                                                subLabel: singleClass.gradeLevel.toString()
                                            }}
                                            key={singleClass.classID}
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

function mapStoresToClasses({ firedrillStore }: Stores, props: ClassesProps): StoreProps {
    return { classes: firedrillStore.allClasses };
}

export default inject(mapStoresToClasses)(Classes);

import { Typography } from 'material-ui';
import * as React from 'react';
import { ClassesStrings } from '../../../config/uiConstants';
import { FiredrillClass } from '../../../models/FiredrillClass';
import { orderClassesByGrade, orderClassesByName } from '../../../utils/class';
import { ContentView, TableHeader, TableView } from '../../shared';
import ClaimableClassTableCell from '../../shared/ClaimableClassTableCell';
import { AbstractClaimableClassesPageProps } from './AbstractClaimableClassesPage';

interface Props extends AbstractClaimableClassesPageProps {}

interface State {
    displayedClasses: { [classID: number]: { class: FiredrillClass; isVisible: boolean } };
}

/**
 * This page renders a list of unclaimed classes
 */
class UnclaimedClasses extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            displayedClasses: this.props.classes.reduce(
                (displayed, aClass) => ({ ...displayed, [aClass.classID]: { class: aClass, isVisible: true } }),
                {}
            )
        };
    }

    public componentWillReceiveProps(nextProps: Props) {
        const nextLength = nextProps.classes.length;
        const displayedLength = Object.keys(this.state.displayedClasses).length;
        if (nextLength > displayedLength) {
            this.updateWithNewClasses(nextProps);
        } else if (nextLength < displayedLength) {
            this.removeClassesWithDelay(nextProps);
        }
    }

    public render(): JSX.Element {
        return (
            <ContentView>
                <TableHeader>
                    <Typography variant="display1">{ClassesStrings.UNCLAIMED_HEADING_NAME}</Typography>
                    <Typography variant="display1">{ClassesStrings.UNCLAIMED_HEADING_STATUS}</Typography>
                </TableHeader>
                <TableView>{this.classRows}</TableView>
            </ContentView>
        );
    }

    private renderTableCell = (singleClass: FiredrillClass, isVisible: boolean): JSX.Element => {
        return (
            <ClaimableClassTableCell
                key={singleClass.classID}
                singleClass={singleClass}
                claimedByName={this.props.getClaimedByNameForClass(singleClass)}
                onClick={this.handlePressClaim(singleClass.classID)}
                isVisible={isVisible}
            />
        );
    };

    private get classRows(): JSX.Element[] {
        const classes = Object.keys(this.state.displayedClasses).map(classID => this.state.displayedClasses[classID]);
        const sortedClasses = classes
            .sort((a, b) => orderClassesByName(a.class, b.class))
            .sort((a, b) => orderClassesByGrade(a.class, b.class));
        return sortedClasses.map(aClass => this.renderTableCell(aClass.class, aClass.isVisible));
    }

    private handlePressClaim(classID: number): () => void {
        return () => this.props.onPressClaim(classID);
    }

    private removeClassesWithDelay(nextProps: Props) {
        const { displayedClasses } = this.state;
        Object.keys(this.state.displayedClasses).forEach(classID => {
            if (false === nextProps.classes.some(aClass => aClass.classID.toString() === classID)) {
                displayedClasses[classID].isVisible = false;
                this.setState({ displayedClasses });
                setTimeout(() => {
                    delete displayedClasses[classID];
                    this.setState({ displayedClasses });
                }, 1000);
            }
        });
    }

    private updateWithNewClasses(nextProps: Props) {
        const { displayedClasses } = this.state;
        nextProps.classes.forEach(aClass => {
            if (null == displayedClasses[aClass.classID]) {
                displayedClasses[aClass.classID] = { class: aClass, isVisible: true };
            }
        });
        this.setState({ displayedClasses });
    }
}

export default UnclaimedClasses;

import CheckCircle from '@material-ui/icons/CheckCircle';
import PlayArrow from '@material-ui/icons/PlayArrow';
import { Typography } from 'material-ui';
import teal from 'material-ui/colors/teal';
import { observer } from 'mobx-react';
import * as React from 'react';
import { Colors } from '../../config/materialUiTheme';
import { getGradeTitleFromGradeLevel } from '../../models/Class';
import { FiredrillClass } from '../../models/FiredrillClass';
import TableCell from '../shared/TableCell';

namespace style {
    export const labelContainer: React.CSSProperties = {
        flex: 1,
        flexDirection: 'column'
    };
    export const labelText: React.CSSProperties = {
        fontWeight: 400,
        fontSize: 16,
        marginBottom: 3
    };
    export const subLabelText: React.CSSProperties = {
        fontWeight: 300,
        color: 'grey'
    };
    export const classCountText: React.CSSProperties = {
        paddingLeft: 50,
        paddingRight: 20,
        color: teal[400],
        fontSize: 24,
        fontWeight: 300
    };
    export const rightArrowContainer: React.CSSProperties = {
        height: 10,
        width: 6,
        marginRight: 0,
        marginTop: -4
    };
    export const playArrow: React.CSSProperties = {
        height: 15,
        width: 15,
        marginRight: 10,
        fill: Colors.ICON_GREY
    };
    export const claimCheck: React.CSSProperties = {
        height: 35,
        width: 35,
        marginLeft: -10,
        fill: Colors.FOUND_BUTTON
    };
    export const tableCell: React.CSSProperties = { paddingRight: 10 };
}

interface Props {
    singleClass: FiredrillClass;
    onClick: () => void;
}

/**
 * This renders a table cell that includes label and sub label.
 * It also includes a rendered counter for found count vs all students in class count.
 */
@observer
export default class ClassesTableCell extends React.Component<Props> {
    public render(): JSX.Element {
        const { singleClass } = this.props;
        return (
            <TableCell style={style.tableCell} onClick={this.props.onClick}>
                <div style={style.labelContainer}>
                    <Typography variant="body1" style={style.labelText}>
                        {singleClass.name}
                    </Typography>
                    <Typography variant="body2" style={style.subLabelText}>
                        {getGradeTitleFromGradeLevel(singleClass.gradeLevel)}
                    </Typography>
                </div>

                <Typography style={style.classCountText}>
                    {singleClass.foundStudents}/{singleClass.totalStudents}
                </Typography>

                {singleClass.isSubmitted ? (
                    <CheckCircle style={style.claimCheck} />
                ) : (
                    <PlayArrow style={style.playArrow} />
                )}
            </TableCell>
        );
    }
}

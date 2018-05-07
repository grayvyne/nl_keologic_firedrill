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
        // position: 'absolute',
        // top: -3,
        marginRight: -5,
        fill: Colors.ICON_GREY
    };
}

interface Props {
    singleClass: FiredrillClass;
    onClick: () => void;
}

@observer
export default class ClassesTableCell extends React.Component<Props> {
    public render(): JSX.Element {
        const { singleClass } = this.props;
        return (
            <TableCell onClick={this.props.onClick}>
                <div style={style.labelContainer}>
                    <Typography variant="body2" style={style.labelText}>
                        {singleClass.name}
                    </Typography>
                    <Typography style={style.subLabelText}>
                        {getGradeTitleFromGradeLevel(singleClass.gradeLevel)}
                    </Typography>
                </div>

                <Typography style={style.classCountText}>
                    {singleClass.foundStudents}/{singleClass.totalStudents}
                </Typography>

                <PlayArrow style={style.playArrow} />
            </TableCell>
        );
    }
}

import * as React from 'react';
import { TableRow, TableCell, Button } from 'material-ui';
import RightArrow from '../../assets/RightArrow';
import { SingleClass } from '../pages/Classes';
import teal from 'material-ui/colors/teal';

interface ClassesTableCellProps {
    singleClass: SingleClass;
    onClick: () => void;
}

export default class ClassesTableCell extends React.Component<ClassesTableCellProps> {
    singleClass = this.props.singleClass;

    render() {
        return (
            <TableRow key={this.singleClass.id} style={{ border: 'none', padding: 0, height: 'unset' }}>
                <TableCell
                    style={{
                        width: '100%',
                        height: '100%',
                        padding: 0,
                        border: 'unset'
                    }}
                >
                    <Button onClick={this.props.onClick} style={{ width: '100%', height: '100%', padding: 0 }}>
                        <div
                            style={{
                                display: 'flex',
                                flexGrow: 1,
                                flexDirection: 'column',
                                padding: 20
                            }}
                        >
                            <div
                                style={{
                                    textAlign: 'left',
                                    fontWeight: 400,
                                    textTransform: 'capitalize',
                                    fontSize: 16,
                                    marginBottom: '3px'
                                }}
                            >
                                {this.singleClass.name}
                            </div>
                            <div
                                style={{
                                    textAlign: 'left',
                                    fontWeight: 300,
                                    textTransform: 'capitalize',
                                    color: 'grey'
                                }}
                            >
                                Grade {this.singleClass.grade}
                            </div>
                        </div>
                        <div
                            style={{
                                paddingLeft: 50,
                                paddingRight: 20,
                                color: teal[400],
                                fontSize: 24,
                                fontWeight: 300
                            }}
                        >
                            {this.singleClass.found}/{this.singleClass.total}
                        </div>
                        <div style={{ height: 10, width: 6, marginRight: 20, marginTop: -4 }}>
                            <RightArrow height={10} width={6} />
                        </div>
                    </Button>
                </TableCell>
            </TableRow>
        );
    }
}

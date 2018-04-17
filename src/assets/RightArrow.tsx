import * as React from 'react';
import { SvgIcon } from 'material-ui';

interface SvgProps {
    height: number;
    width: number;
}

export default class RightArrow extends React.Component<SvgProps> {
    render() {
        return (
            <SvgIcon width={this.props.width} height={this.props.height}>
                <g
                    id="checklist"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                    transform="translate(-339.000000, -183.000000)"
                    opacity="0.539999962"
                >
                    <g id="Row" transform="translate(0.000000, 152.000000)" fill="#000000">
                        <g id="status-button" transform="translate(339.000000, 31.000000)">
                            <polygon
                                id="Shape"
                                // tslint:disable-next-line:max-line-length
                                transform="translate(3.000000, 5.500000) rotate(-90.000000) translate(-3.000000, -5.500000) "
                                points="-2 3 3 8 8 3"
                            />
                        </g>
                    </g>
                </g>
            </SvgIcon>
        );
    }
}

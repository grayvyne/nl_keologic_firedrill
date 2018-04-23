import AppsIcon from '@material-ui/icons/Apps';
import { Card, IconButton, Input, Toolbar } from 'material-ui';
import AppBar from 'material-ui/AppBar';
import * as React from 'react';

interface State {
    index: number;
}

interface Props {
    isVisible: boolean;
}

namespace styles {
    export const alignStretch = { alignItems: 'stretch' };
    export const iconButton: React.CSSProperties = { alignSelf: 'center', marginLeft: -10 };
    export const fullWidth = { width: '100%' };
    export const card = { margin: 10, padding: 10 };
}

export class Search extends React.Component<Props, State> {
    public constructor(props: Props) {
        super(props);
        this.state = {
            index: 0
        };
    }

    public handleChange = (event: any, index: any) => {
        this.setState({ index });
    };

    public render(): JSX.Element | null {
        if (this.props.isVisible === false) {
            return null;
        }

        return (
            <div>
                <AppBar position={'static'}>
                    <Toolbar style={styles.alignStretch}>
                        <IconButton color="inherit" aria-label="Menu" style={styles.iconButton}>
                            <AppsIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Card style={styles.card}>
                    <Input placeholder={'Search'} type={'search'} style={styles.fullWidth} disableUnderline={true} />
                </Card>
            </div>
        );
    }
}

export default Search;

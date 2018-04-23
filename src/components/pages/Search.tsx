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

export class Search extends React.Component<Props, State> {
    constructor(props: Props) {
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
                    <Toolbar style={{ alignItems: 'stretch' }}>
                        <IconButton color="inherit" aria-label="Menu" style={{ alignSelf: 'center', marginLeft: -10 }}>
                            <AppsIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Card style={{ margin: 10, padding: 10 }}>
                    <Input placeholder={'Search'} type={'search'} style={{ width: '100%' }} disableUnderline={true} />
                </Card>
            </div>
        );
    }
}

export default Search;

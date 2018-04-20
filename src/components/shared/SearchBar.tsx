import * as React from 'react';
import Card from 'material-ui/Card';
import Input from 'material-ui/Input';

namespace style {
    export const cardStyle: React.CSSProperties = { margin: 10, padding: 10 };
    export const searchInputStyle: React.CSSProperties = { width: '100%' };
}

export default class SearchBar extends React.Component {
    render() {
        return (
            <Card style={style.cardStyle}>
                <Input placeholder={'Search'} type={'search'} style={style.searchInputStyle} disableUnderline={true} />
            </Card>
        );
    }
}

import * as React from 'react';
import Card from 'material-ui/Card';
import Input from 'material-ui/Input';

namespace style {
    export const cardStyle: React.CSSProperties = { margin: 10, padding: 10 };
    export const searchInputStyle: React.CSSProperties = { width: '100%' };
}

interface Props {
    text: string;
    onChangeText(text: string): void;
}

export default class SearchBar extends React.Component<Props> {
    public render(): JSX.Element {
        return (
            <Card style={style.cardStyle}>
                <Input
                    value={this.props.text}
                    onChange={this.handleChangeText}
                    placeholder={'Search'}
                    type={'search'}
                    style={style.searchInputStyle}
                    disableUnderline={true}
                />
            </Card>
        );
    }

    private handleChangeText = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        this.props.onChangeText(event.target.value);
    };
}

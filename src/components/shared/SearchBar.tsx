import * as React from 'react';
import Card from 'material-ui/Card';
import Input from 'material-ui/Input';
import SearchIcon from '../../assets/SearchIcon';
import CancelIcon from '../../assets/CancelIcon';

namespace style {
    export const cardStyle: React.CSSProperties = {
        margin: 10,
        padding: 5,
        display: 'flex',
        flexDirection: 'row',
        height: 40,
        alignItems: 'center'
    };
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
                <div style={{ marginLeft: 10, marginRight: 20, marginTop: 3 }}>
                    <SearchIcon width={30} height={30} />
                </div>
                <Input
                    value={this.props.text}
                    onChange={this.handleChangeText}
                    placeholder={'Search'}
                    type={'search'}
                    style={style.searchInputStyle}
                    disableUnderline={true}
                />

                {this.props.text !== '' && (
                    <div onClick={() => this.props.onChangeText('')} style={{ marginRight: 10, marginTop: 3 }}>
                        <CancelIcon width={20} height={20} />
                    </div>
                )}
            </Card>
        );
    }

    private handleChangeText = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        this.props.onChangeText(event.target.value);
    };
}

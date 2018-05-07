import * as React from 'react';
import Card from 'material-ui/Card';
import Input from 'material-ui/Input';
import CancelIcon from '@material-ui/icons/Cancel';
import SearchIcon from '@material-ui/icons/Search';
import { IconButton } from 'material-ui';
import { Colors } from '../../config/materialUiTheme';

namespace styles {
    export const cardStyle: React.CSSProperties = {
        margin: 10,
        padding: 5,
        display: 'flex',
        flexDirection: 'row',
        height: 40,
        alignItems: 'center'
    };
    export const searchInputStyle: React.CSSProperties = {
        width: '100%'
    };
    export const cancelIcon = {
        fill: Colors.SEARCH_CANCEL_BUTTON,
        width: 20,
        height: 20
    };
    export const searchIcon = {
        fill: Colors.ICON_GREY,
        width: 30,
        height: 30,
        marginLeft: 10,
        marginRight: 20
    };
}

interface Props {
    text: string;
    placeholder: string;
    onChangeText(text: string): void;
}

export default class SearchBar extends React.Component<Props> {
    public render(): JSX.Element {
        return (
            <Card style={styles.cardStyle}>
                <SearchIcon style={styles.searchIcon} />
                <Input
                    value={this.props.text}
                    onChange={this.handleChangeText}
                    placeholder={this.props.placeholder}
                    type={'search'}
                    style={styles.searchInputStyle}
                    disableUnderline={true}
                />

                {this.props.text !== '' && (
                    <IconButton onClick={() => this.props.onChangeText('')}>
                        <CancelIcon style={styles.cancelIcon} />
                    </IconButton>
                )}
            </Card>
        );
    }

    private handleChangeText = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        this.props.onChangeText(event.target.value);
    };
}

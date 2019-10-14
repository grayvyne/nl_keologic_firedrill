import { CSSProperties } from 'react';

export namespace styles {
    export const modalHeader: CSSProperties = {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'black',
        marginBottom: 20,
        marginTop: 20,
        marginLeft: 20,
        paddingTop: 20
    };

    export const radioButton = {
        marginLeft: 20,
        marginRight: 20
    };

    export const divider = {
        marginTop: 20
    };

    export const dialogContainer: CSSProperties = {
        alignSelf: 'stretch'
    };

    export const marginRight = {
        marginRight: 15
    };

    export const column: React.CSSProperties = { flexDirection: 'column' };

    export const alignToEnd: React.CSSProperties = { justifyContent: 'flex-end' };
}

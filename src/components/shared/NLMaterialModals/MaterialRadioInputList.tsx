import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from 'material-ui';
import * as React from 'react';
import { ChangeEvent } from 'react';
import { CancelOrAffirmDialogFooter } from './CancelOrAffirmDialogFooter';
import { SharedDialogContainer } from './SharedDialogContainer';
import { styles } from './sharedStyles';

interface Props {
    onPressRadioOption: (e: ChangeEvent<{}>) => void;
    open: boolean;
    modalHeader: string;
    onPressAffirm: () => void;
    onPressCancel: () => void;
    affirmButtonLabel: string;
    cancelButtonLabel: string;
    currentlySelectedRadioOptionValue: string;
    radioOptions: { value: string; color: string }[];
}

export class MaterialRadioInputList extends React.Component<Props> {
    public render(): JSX.Element {
        return (
            <SharedDialogContainer open={this.props.open}>
                <FormControl component="fieldset">
                    <FormLabel component="legend" style={styles.modalHeader}>
                        {this.props.modalHeader}
                    </FormLabel>

                    <RadioGroup
                        value={this.props.currentlySelectedRadioOptionValue}
                        onChange={this.props.onPressRadioOption}
                    >
                        {this.props.radioOptions.map((radioOption, index) => {
                            return (
                                <FormControlLabel
                                    key={index}
                                    value={radioOption.value}
                                    control={<Radio style={{ ...styles.radioButton, color: radioOption.color }} />}
                                    label={radioOption.value}
                                />
                            );
                        })}
                    </RadioGroup>

                    <CancelOrAffirmDialogFooter
                        onPressAffirm={this.props.onPressAffirm}
                        onPressCancel={this.props.onPressCancel}
                        affirmButtonLabel={this.props.affirmButtonLabel}
                        cancelButtonLabel={this.props.cancelButtonLabel}
                    />
                </FormControl>
            </SharedDialogContainer>
        );
    }
}

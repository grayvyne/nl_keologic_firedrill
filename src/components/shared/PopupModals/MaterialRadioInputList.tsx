import { RadioGroup, Radio, FormControlLabel, FormControl, FormLabel } from 'material-ui';
import * as React from 'react';
import { SharedDialogContainer } from './SharedDialogContainer';
import { styles } from './sharedStyles';
import { ChangeEvent } from 'react';
import { CancelOrAffirmDialogFooter } from './CancelOrAffirmDialogFooter';

interface Props {
    onPressRadioOption: (e: ChangeEvent<{}>) => void;
    open: boolean;
    modalHeader: string;
    onPressAffirm: () => void;
    onPressCancel: () => void;
    affirmButtonLabel: string;
    cancelButtonLabel: string;
    currentlySelectedRadioOptionValue: string;
    radioOptions: string[];
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
                                    value={radioOption}
                                    control={<Radio style={styles.radioButton} />}
                                    label={radioOption}
                                />
                            );
                        })}
                    </RadioGroup>

                    <CancelOrAffirmDialogFooter {...this.props} />
                </FormControl>
            </SharedDialogContainer>
        );
    }
}

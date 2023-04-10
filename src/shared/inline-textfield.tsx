import React, {Fragment, useState} from 'react';

import {ErrorMessage, Field} from '@atlaskit/form';

import TextArea from '@atlaskit/textarea';
import TextField from "@atlaskit/textfield";
import Select, {ValueType as Value} from "@atlaskit/select";

interface InlineEditProps {
    label: string;
    defaultValue?: string | undefined;
    isRequired?: boolean | undefined;
    isDisabled?: boolean | undefined;
    name?: string;
    autoCompleteIsDisabled?: boolean;
}

const InlineEditDefault = (props: InlineEditProps) => {
    function validate(value: string | undefined) {
        if (value !== null && value !== undefined) {
            if (value.length < 1 && props.isRequired) {
                return "is required and cannot be empty";
            }
        }
        return;
    }

    return (
        <Field
            aria-required={true}
            name={props.name ?? props.label}
            label={props.label}
            defaultValue={props.defaultValue}
            isDisabled={props.isDisabled}
            isRequired={props.isRequired}
            validate={(value) => validate(value)}
        >
            {({fieldProps, error, valid, meta}) => {
                return (
                    <>
                        <TextField type="text" autoComplete={props.autoCompleteIsDisabled?'off':'on'} {...fieldProps} />
                        {error && (
                            <ErrorMessage>
                                {props.label} {error}
                            </ErrorMessage>
                        )}
                    </>
                );
            }}
        </Field>
    );
};

export const InlineDatePicker = (props: InlineEditProps) => {

    return (
        <Field
            aria-required={true}
            name={props.name ?? props.label}
            label={props.label}
            defaultValue={props.defaultValue}
            isDisabled={props.isDisabled}

            isRequired={props.isRequired}
            validate={(value) => console.log('value', value)}
        >
            {({fieldProps, error, valid, meta}) => {
                return (
                    <>
                        <TextField type="date" {...fieldProps}  />
                    </>
                );
            }}
        </Field>
    );
};

export interface Options {
    label: string;
    value: string;
}

interface InlineSelectProps {
    label: string;
    defaultValue?: Options;
    isRequired?: boolean | undefined;
    name?: string;
    options: Options[];
    isDisabled?: boolean;
    onChange?: () => void | undefined;
}

export const InlineSelect = (props: InlineSelectProps) => {
    const [selectedOptionState, setSelectedOption] = useState<Options | undefined>(props.defaultValue)

    function changeValue(e: Options | null) {
        if (e !== null) {
            setSelectedOption(e);
        }
        console.log(e);
    }

    return (
        <Field<Value<Options>>
            name={props.name ?? props.label}
            label={"Select a " + props.label}
            isRequired={props.isRequired}
            defaultValue={selectedOptionState}
            isDisabled={props.isDisabled}
        >
            {({fieldProps: {id, ...rest}, error}) => (
                <Fragment>
                    <Select<Options>
                        validationState={error ? 'error' : 'default'}
                        inputId={id}
                        {...rest}
                        options={props.options}
                        onChange={(e) => changeValue(e)}
                    />
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                </Fragment>
            )}
        </Field>
    );
};
export const InlineEditTextArea = (props: InlineEditProps) => {
    return (
        <Field label={props.label} isRequired={props?.isRequired ?? false} defaultValue={props.defaultValue}
               name={props.name ?? props.label}>
            {({fieldProps}: any) => (
                <>
                    <TextArea
                        resize="auto"
                        maxHeight="20vh"
                        name="area"
                        {...fieldProps}
                    />
                </>
            )}
        </Field>

    );
};

export default InlineEditDefault;

import React, {Fragment, useEffect, useState} from 'react';
import LoadingButton from '@atlaskit/button/loading-button';
import Button from '@atlaskit/button/standard-button';
import TextField from '@atlaskit/textfield';

import Form, {
    CheckboxField,
    ErrorMessage,
    Field,
    FormFooter,
    FormHeader,
    FormSection,
    HelperMessage,
    ValidMessage,
} from '@atlaskit/form';
import {useNavigate} from "react-router-dom"

import {useLocalStorage} from "usehooks-ts";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {authenticationLoggedIn, AuthenticationPayload} from "./authentication-slice";
import {RootState} from "../../app/store";
import {AuthPagesWrapper} from "./authentication-pages-wrapper";


interface LoginFormProp {
    emailAddress: string;
    password: string;
    remember: boolean
}

export function Login() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [AuthToken, setUserToken] = useLocalStorage<AuthenticationPayload | null>('AuthToken', null);
    const {loginLoading, loginError, loginData} =  useAppSelector((state: RootState )=>state.authentication)

/*    useEffect(() => {
        console.log(loading, error, data);
        if (!loading && data !== undefined && error === undefined) {

            if (data?.login.token !== null) {
                setUserToken({...data?.login as AuthenticationPayload})
                dispatch(authenticationLoggedIn({authData: data?.login}))
                /!* navigate('/');*!/
            }

        }

    }, [data])*/


    const submitLoginForm = (formProp: LoginFormProp) => {
      /*  return logInUser({
            variables: {
                LoginModelInput: {
                    email: formProp.emailAddress,
                    password: formProp.password
                }
            }
        });*/
    }
    return <AuthPagesWrapper>
        <Form<LoginFormProp>
            onSubmit={(data: LoginFormProp) => submitLoginForm(data)}>
            {({formProps, submitting}) => (
                <form {...formProps}>
                    <FormHeader
                        title="Sign in"
                        description="* indicates a required field"
                    />
                {/*    {loginError && (
                        <ErrorMessage>
                            {loginError.message}
                        </ErrorMessage>
                    )}{loginData?.login.status === "Error" && (
                    <ErrorMessage>
                        {loginData?.login.message}
                    </ErrorMessage>)}*/}

                    <FormSection>
                        <Field
                            aria-required={true}
                            name="emailAddress"
                            label="Email address"
                            isRequired
                        >
                            {({fieldProps, error}) => (
                                <Fragment>
                                    <TextField autoComplete="off" type={'email'} {...fieldProps} />
                                    {!error && (
                                        <HelperMessage>
                                            You can use letters, numbers and periods.
                                        </HelperMessage>
                                    )}
                                    {error && (
                                        <ErrorMessage>
                                            This email is already in use, try another one.
                                        </ErrorMessage>
                                    )}
                                </Fragment>
                            )}
                        </Field>
                        <Field
                            aria-required={true}
                            name="password"
                            label="Password"
                            isRequired
                        >
                            {({fieldProps, error, valid, meta}) => {
                                return (
                                    <Fragment>
                                        <TextField type="password" {...fieldProps} />
                                    </Fragment>
                                );
                            }}
                        </Field>
                        <div className='flex flex-row-reverse pt-2'>
                            <a className='cursor-pointer ' onClick={() => navigate('/forgot-password')}>Forgot
                                password</a>
                        </div>
                        {/*  <CheckboxField name="remember" label="Remember me" defaultIsChecked>
                            {({fieldProps}) => (
                                <Checkbox
                                    {...fieldProps}
                                    label="Always sign in on this device"
                                />
                            )}
                        </CheckboxField>*/}
                    </FormSection>


                    <div className='flex flex-col justify-center gap-4 py-8'>

                        <LoadingButton
                            type="submit"
                            appearance="primary"
                            isLoading={submitting}

                        >
                            Login
                        </LoadingButton>
                        <div className='flex flex-row justify-center'>
                            <label>Or if you don't have an account</label>
                        </div>

                        <Button onClick={() => navigate('/register')}>Contact administrator</Button>

                    </div>

                </form>
            )}
        </Form>
    </AuthPagesWrapper>
    ;
}


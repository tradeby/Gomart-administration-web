import React, {Fragment, useEffect} from 'react';

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
import {AuthPagesWrapper} from "../authentication-pages-wrapper";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {useLocalStorage} from "usehooks-ts";


import {authenticationLoggedIn, AuthenticationState} from "../authentication-slice";
import {RootState} from "../../../app/store";
import {attemptLogin, LoginState} from "./login.slice";
import {AppUser} from "./app-user.model";
import ForgotPasswordModal from "../forgot-password.modal";


interface LoginFormProp {
    email: string;
    password: string;
}

export function Login() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [AuthToken, setUserToken] = useLocalStorage<any | null>('AuthToken', null);
    const {loginInProgress, user, error,} = useAppSelector<LoginState>((state: RootState) => state.login)

        useEffect(() => {
            console.log('login success',loginInProgress, user?.email, error);
            if (!loginInProgress && user && user.uid) {

                if (user && user.uid && user.uid.length > 0) {
                    console.log('I am here, where I am supposed to be');
                    setUserToken({...user})
                    dispatch(authenticationLoggedIn({authData: user as AppUser}))
                    /* navigate('/');*/
                }

            }

        }, [user])


    const submitLoginForm = (formProp: LoginFormProp) => {
        if(formProp.email && formProp.password){
            dispatch( attemptLogin({email:formProp.email, password:formProp.password}));
            console.log('login',formProp);
        }
        }


    function contactAdministrator() {
        window.open('mailto:tradebyy@gmail.com', '_blank')
    }

    return <AuthPagesWrapper>
        <Form<LoginFormProp>
            onSubmit={(data: LoginFormProp) => submitLoginForm(data)}>
            {({formProps, submitting, reset}) => (
                <form name={'login'} {...formProps}>
                    <FormHeader
                        title="Sign in"
                        description="* indicates a required field"
                    />
                        {error && (
                        <ErrorMessage>
                            {error.message}
                        </ErrorMessage>
                    )}

                    {/*loginData?.login.status === "Error" && (
                    <ErrorMessage>
                        {loginData?.login.message}
                    </ErrorMessage>)
*/}
                    <FormSection>
                        <Field
                            aria-required={true}
                            name="email"
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
                        <div  className='flex flex-row-reverse pt-2'>
                            <ForgotPasswordModal onHandleClick={reset}/>
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
                            id={'forgot-password-submit'}
                            type="submit"
                            appearance="primary"
                            isDisabled={loginInProgress}
                            isLoading={loginInProgress}

                        >
                            Login
                        </LoadingButton>
                        <div className='flex flex-row justify-center'>
                            <label>Or if you don't have an account</label>
                        </div>

                        <Button onClick={() => contactAdministrator()}>Contact administrator</Button>

                    </div>

                </form>
            )}
        </Form>
    </AuthPagesWrapper>
        ;
}


import React, {Fragment, useCallback, useState} from 'react';

import Button from '@atlaskit/button/standard-button';

import Modal, {
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalTitle,
    ModalTransition,
} from '@atlaskit/modal-dialog';
import Lozenge from "@atlaskit/lozenge";
import Form, {ErrorMessage, Field, FormHeader, FormSection, HelperMessage} from "@atlaskit/form";
import TextField from "@atlaskit/textfield";
import LoadingButton from "@atlaskit/button/loading-button";
import {attemptLogin} from "./login/login.slice";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import {auth} from "../../shared/firebase/firestore";

interface LoginFormProp {
    email: string;
    forgotPassword: string;
}

export default function ForgotPasswordModal(props:{onHandleClick:any}) {

    const [emailSent , setEmailSent ] = useState(false);

    const [isOpen, setIsOpen] = useState(false);
    const [width, setWidth] = useState('medium');

    const closeModal = useCallback(() => setIsOpen(false), [setIsOpen]);
    const openModal = useCallback(
        (newWidth: string) => {
            setWidth(newWidth);
            requestAnimationFrame(() => setIsOpen(true));
        },
        [setWidth, setIsOpen],
    );

    const sendPasswordReset = async (email:string) => {
        try {
            // Send password reset email
            await sendPasswordResetEmail(auth, email);

            // Password reset email sent successfully
            console.log("Password reset email sent to: ", email);
        } catch (error) {
            // Handle error
            console.error("Error sending password reset email: ", error);
        }
    };

    const submitLoginForm = async (formProp: LoginFormProp, isForgotPassword: boolean) => {
        if (isForgotPassword) {
            await sendPasswordReset(formProp.email);
            setEmailSent(true);
            console.log('forgot-password', formProp);
        }

    }

    function contactAdministrator() {
        window.open('mailto:tradebyy@gmail.com', '_blank')
    }

    return (
        <>
            <a className='cursor-pointer ' onClick={() => {props.onHandleClick(); openModal('large');}}>Forgot
                password</a>
            <ModalTransition>
                {isOpen && (
                    <Modal onClose={closeModal} width={width}>
                        <ModalBody>
                            <div className='w-full h-4/5 flex justify-center'>
                                <div className='w-96 py-8'>
                                    {emailSent?
                                        <p className='text-green-800'>Email has been sent to your email account to reset your password!</p>
                                        :

                                        <Form<LoginFormProp>
                                            onSubmit={(data: LoginFormProp) => submitLoginForm(data,true)}>
                                            {({formProps, submitting}) => (
                                                <form name={'forgot-password'} {...formProps}>
                                                    <FormHeader
                                                        title="Forgot password"
                                                        description="* indicates a required field"
                                                    />
                                                    <FormSection>
                                                        <Field
                                                            aria-required={true}
                                                            name="email"
                                                            label="Email address"
                                                            isRequired
                                                        >
                                                            {({fieldProps, error}) => (
                                                                <Fragment>
                                                                    <TextField autoComplete="off"
                                                                               type={'email'} {...fieldProps} />
                                                                </Fragment>
                                                            )}
                                                        </Field>
                                                    </FormSection>
                                                    <div className='flex flex-col justify-center gap-4 py-8'>

                                                        <LoadingButton
                                                            id={'forgot-password-submit'}
                                                            type="submit"
                                                            appearance="primary"
                                                            /* isDisabled={loginInProgress}
                                                             isLoading={loginInProgress}*/

                                                        >
                                                            Reset password
                                                        </LoadingButton>
                                                        <div className='flex flex-row justify-center'>
                                                            <label>Or if you don't remember your email</label>
                                                        </div>

                                                        <Button onClick={() => contactAdministrator()}>Contact
                                                            administrator</Button>

                                                    </div>

                                                </form>
                                            )}
                                        </Form>}
                                </div>
                            </div>

                        </ModalBody>
                        {/* <ModalFooter>
                            <Button appearance="subtle"  onClick={closeModal} >Cancel</Button>
                            <Button appearance="primary" onClick={closeModal} autoFocus>
                                Save
                            </Button>
                        </ModalFooter>*/}
                    </Modal>
                )}
            </ModalTransition>
        </>
    );
}



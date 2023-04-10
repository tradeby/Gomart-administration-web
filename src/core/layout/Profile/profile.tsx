import React, {useState} from 'react';

import Avatar from '@atlaskit/avatar';

import {AtlassianNavigation, Help, Profile} from '@atlaskit/atlassian-navigation';
import Popup from "@atlaskit/popup";
import {ButtonItem, MenuGroup, Section} from "@atlaskit/menu";
import {useLocalStorage} from "usehooks-ts";

const avatarUrl = '/avater-musa.jpg';

export const DefaultProfile = () => {
    const [isOpen, setIsOpen] = useState(false);

    const onClick = () => {
        setIsOpen(!isOpen);
    };

    const onClose = () => {
        setIsOpen(false);
    };
    return <Popup
        placement="bottom-start"
        content={ProfilePopUp}
        isOpen={isOpen}
        onClose={onClose}
        trigger={(triggerProps) => (
            <Profile
                {...triggerProps}
                icon={<Avatar size="small"/>}
                onClick={onClick}
                tooltip="Your profile and settings"
            />
        )}
    />

};

const ProfilePopUp = () => {
    //const dispatch = useAppDispatch();
    const [authToken, setAuthToken] = useLocalStorage('AuthToken', null);


    const handleLogout = () => {
        setAuthToken(null);
       // dispatch(authenticationLoggedOut());
    }

    return <MenuGroup>
        <Section >
          {/*  <ButtonItem>Notification</ButtonItem>*/}
            <ButtonItem onClick={() => handleLogout()}>Logout</ButtonItem>
        </Section>
    </MenuGroup>
}

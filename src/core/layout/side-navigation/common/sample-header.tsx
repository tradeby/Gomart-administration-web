
import React from 'react';


import Icon from '@atlaskit/icon';
import { CustomItemComponentProps } from '@atlaskit/menu';

import { Header } from '@atlaskit/side-navigation';

import SampleIcon from './sample-logo';
import SideNavIcon from './.././../../../assets/AvatarSideNav.png';

const Container: React.FC<CustomItemComponentProps> = (props) => {
    return <div {...props} />;
};

const ExampleHeader = () => {
    return (
        <Header
            component={Container}
            description="Area"
            iconBefore={<img alt="" src={SideNavIcon}  />}
        >
            Administration
        </Header>
    );
};

export default ExampleHeader;

import React, {ReactElement, useEffect} from "react";
import {useFlags} from "@atlaskit/flag";
import ErrorIcon from "@atlaskit/icon/glyph/error";
import {token} from "@atlaskit/tokens";
import {G300, R400} from "@atlaskit/theme/colors";
import SuccessIcon from "@atlaskit/icon/glyph/check-circle";
import {useAppSelector} from "../../app/hooks";


function GlobalFlag() {
    const {showFlag} = useFlags();
    const {flagContent} = useAppSelector(s => s.flagNotification)

    useEffect(() => {
        if(flagContent){
            if (flagContent.flagType === 'ERROR') {
              showFlag({
                  description: flagContent.description?? "We're having trouble connecting, we're unable to update student. Check your network connection",
                  icon: (
                      <ErrorIcon label="Error"
                                 primaryColor={token('color.icon.danger', R400)}/>
                  ),
                  title: flagContent.title,
                  isAutoDismiss: true,
              });
          }
            else{
                showFlag({
                    description: flagContent.description,
                    icon: (
                        <SuccessIcon
                            primaryColor={token('color.icon.success', G300)}
                            label="Success"
                        />
                    ),
                    title: flagContent.title,
                    isAutoDismiss: true,
                });
            }

        }


    }, [flagContent])
    return <></>;
}

export default GlobalFlag;

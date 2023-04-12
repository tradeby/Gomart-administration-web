import React, { useCallback, useState } from 'react';

import ButtonGroup from '@atlaskit/button/button-group';
import Button from '@atlaskit/button/standard-button';

import Modal, {
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalTitle,
    ModalTransition,
} from '@atlaskit/modal-dialog';
import Lozenge from "@atlaskit/lozenge";
import DynamicTable from "@atlaskit/dynamic-table";
import {AdPricing, AdsTypeSettingsModel, sampleDataAdType} from "../sold-ads-model";
import {HeadCellType} from "@atlaskit/dynamic-table/types";
import {NavigateFunction} from "react-router-dom";
import {AppDispatch} from "../../../app/store";
import {createKey} from "../../../shared/table-helper";
import {timeAgo} from "../../../shared/time-ago/time-ago";
import Toggle from "@atlaskit/toggle";

export default function AdSettingsModal(props:{adsSettingItem:AdsTypeSettingsModel }) {
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

    return (
        <>
            <Button onClick={() => openModal('x-large')}>Edit</Button>
            <ModalTransition>
                {isOpen && (
                    <Modal onClose={closeModal} width={width}>
                        <ModalHeader>
                            <ModalTitle>Edit Ad Type <Lozenge appearance={'success' }>Premium Ad</Lozenge></ModalTitle>
                        </ModalHeader>
                        <ModalBody>
                            <div className='py-4'>
                                <DynamicTable
                                    head={tableHead({withWidth: true})}
                                    rows={rows(props.adsSettingItem)}
                                    rowsPerPage={20}
                                    defaultPage={1}
                                    isFixedSize={false}
                                    loadingSpinnerSize="large"
                                    isRankable={false}
                                />
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button appearance="subtle"  onClick={closeModal} >Cancel</Button>
                            <Button appearance="primary" onClick={closeModal} autoFocus>
                                Save
                            </Button>
                        </ModalFooter>
                    </Modal>
                )}
            </ModalTransition>
        </>
    );
}

const tableHead = (props: {
    withWidth: boolean,
}) => {

    return {
        cells: [

            {
                key: 'duration',
                content: 'Duration',
                width: props.withWidth ? 20 : undefined,
            },

            {
                key: 'pricing',
                content: 'Price',
                width: props.withWidth ? 20 : undefined,
            },

            {
                key: 'toggleOnOff',
                content: 'Toggle On/Off',
                width: props.withWidth ? 15 : undefined,
            },
            {
                key: 'status',
                content: 'Status',
                width: props.withWidth ? 15 : undefined,
            }, {
                key: 'lastUpdatedOn',
                content: 'Last updated on',
                width: props.withWidth ? 10 : undefined,
            },

        ],
    } as { cells: HeadCellType[] };
};

const rows = (adSetting:  AdsTypeSettingsModel | undefined) =>
    adSetting?.pricing?.map((p:  AdPricing, index: number) => ({
        key: `row-${index}-${p.duration}`,
        cells: [ {
            key: createKey('duration' + p.duration),
            content: <label>
                {p.duration}
            </label> ,
        },
            {
                key: createKey('pricing' + p.duration),
                content: <label>
                    {p.price}
                </label> ,
            },

            {
                key: createKey('role'  + p.duration),
                content: (
                    <Toggle id="toggle-large" size="large" isChecked={p.active} />
                ),
            },  {
                key: createKey('stat' +p.duration ),
                content: (
                    p.active?<Lozenge appearance='inprogress'> Active</Lozenge>:
                        <Lozenge>Disabled</Lozenge>
                ),
            }, {
                key: createKey(p.lastUpdated + p.duration),
                content: <p>{timeAgo(p.lastUpdated)}</p>,
            },
        ],
    }));



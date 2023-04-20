import React, {Fragment, useCallback, useState} from 'react';
import ButtonGroup from '@atlaskit/button/button-group';
import Button from '@atlaskit/button/standard-button';
import noop from '@atlaskit/ds-lib/noop';
import Modal, {
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalTitle,
    ModalTransition,
} from '@atlaskit/modal-dialog';
import Form, {Field, Label} from "@atlaskit/form";
import InlineEditDefault from "../../../../../../shared/inline-textfield";
import {MapSection} from "../../business-information/google-map-section";
import SettingsIcon from "@atlaskit/icon/glyph/settings";
import Toggle from "@atlaskit/toggle";
import DebugIcon from "@atlaskit/icon/glyph/lightbulb";
import {IconButton} from "@atlaskit/atlassian-navigation";
import Avatar from "@atlaskit/avatar";
import Textfield from '@atlaskit/textfield';
import PriceBeforeNaira from '../../../../../../assets/price-naira-before-icon.svg';
import Icon from "@atlaskit/icon";
import {CustomAddIcon, CustomRemoveIcon} from "./add-remove-icons";
import Lozenge from "@atlaskit/lozenge";
import {Radio} from "@atlaskit/radio";
import SelectClearIcon from '@atlaskit/icon/glyph/select-clear';
import AddCircleIcon from '@atlaskit/icon/glyph/add-circle';

export default function CreateProductDialog() {
    const [isOpen, setIsOpen] = useState(false);
    const [width, setWidth] = useState('medium');
    const [isDragging, setIsDragging] = useState(false); // State to track if dragging is in progress

    const closeModal = useCallback(() => setIsOpen(false), [setIsOpen]);
    const setWidthAndOpen = useCallback(
        (newWidth: string) => {
            setWidth(newWidth);
            requestAnimationFrame(() => setIsOpen(true));
        },
        [setWidth, setIsOpen],
    );

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const files = Array.from(event.dataTransfer.files);
        console.log('something was dropped here', files);
        //  dispatch(addImage(files[0])); // You can customize this to handle multiple images if needed
        setIsDragging(false); // Set isDragging state to false when drag ends
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {

        event.preventDefault(); console.log('dragover');
    };

    const handleDragStart = () => {
        console.log('dragging started');
        setIsDragging(true); // Set isDragging state to true when drag starts
    };

    const handleDragEnd = () => {
        console.log('dragging ended');
        setIsDragging(false); // Set isDragging state to false when drag ends
    };

    return (
        <>

            <ButtonGroup>
                <Button onClick={() => setWidthAndOpen('x-large')} appearance='primary'>Create new product</Button>
            </ButtonGroup>
            {/*       <ButtonGroup appearance="primary">
                <Button onClick={() => setWidthAndOpen('small')}>small</Button>
                <Button onClick={() => setWidthAndOpen('medium')}>medium</Button>
                <Button >large</Button>
                <Button onClick={() => setWidthAndOpen('x-large')}>x-large</Button>
            </ButtonGroup>*/}

            <ModalTransition>
                {isOpen && (
                    <Modal onClose={closeModal} width={width}>
                        <ModalHeader>
                            <ModalTitle>Create new product/service</ModalTitle>
                            <div>
                                <Button appearance="primary" onClick={closeModal} autoFocus>
                                    Save
                                </Button>
                                {" "}
                                <Button appearance="subtle">Cancel</Button>

                            </div>
                        </ModalHeader>
                        <ModalBody>

                            <div
                                onDragEnter={handleDragStart}
                                onDragLeave={handleDragEnd}
                                onDragOver={handleDragOver}
                                className='grid grid-cols-12 justify-center pb-20 gap-x-4 w-full'>

                                <div className='col-span-6 ml-8 '>
                                    <div onDrop={handleDrop}
                                         onDragOver={handleDragOver}

                                         className={ isDragging?"border border-dashed border-black w-full text-center h-56 bg-slate-100 rounded-md ":"w-full text-center h-56 bg-slate-100 rounded-md"}>

                                        {isDragging && <p className='py-20 my-4'>Drop Here!!</p>}
                                    </div>

                                    <div className="flex mt-4 ">
                                        <div
                                            className="w-16 h-16 bg-slate-100 rounded-md mx-1 py-5 hover:shadow-md cursor-pointer text-center">
                                            <Icon glyph={CustomAddIcon} label=""/>
                                        </div>
                                        <div className="w-16 h-16 bg-slate-100 rounded-md mx-1"></div>
                                        <div className="w-16 h-16 bg-slate-100 rounded-md mx-1"></div>
                                        <div className="w-16 h-16 bg-slate-100 rounded-md mx-1"></div>
                                        <div className="w-16 h-16 bg-slate-100 rounded-md mx-1"></div>
                                        <div className="w-16 h-16 bg-slate-100 rounded-md mx-1"></div>
                                    </div>

                                    <div className='col-span-2 pt-4 py-0'>
                                        <Label htmlFor="toggle-default">Promote your product/Service</Label>
                                    </div>

                                    <div>
                                        <div
                                            className='grid grid-cols-12 mt-2 bg-slate-50 gap-x-2 w-full border rounded-md p-2'>
                                            <div className='col-span-1 py-0'>
                                                <Radio
                                                    value="default radio"
                                                    name="radio-default"
                                                    testId="radio-default"
                                                    isChecked
                                                    onChange={noop}
                                                />
                                            </div>
                                            <div className='col-span-3 py-0'>
                                                <div
                                                    className="flex items-center  rounded-md  py-1  mr-1"
                                                    style={{backgroundColor: '#EDEDED'}}>
                                                    <p className="text-gray-700 mx-auto font-medium">Standard</p>

                                                </div>
                                                <p className='pt-2 px-2'>Free</p>
                                            </div>
                                            <div className='col-span-8  py-0'>
                                                <p>Your listings will appear in regular searches and recommendations</p>
                                            </div>

                                        </div>

                                        <div className='grid grid-cols-12 mt-2 gap-x-2 w-full border rounded-md p-2'>
                                            <div className='col-span-1 py-0'>
                                                <Radio
                                                    value="default radio"
                                                    name="radio-default"
                                                    testId="radio-default"
                                                    onChange={noop}
                                                />
                                            </div>
                                            <div className='col-span-3 py-0'>
                                                <div
                                                    className="flex items-center  rounded-md  py-1  mr-1"
                                                    style={{backgroundColor: '#FFC835'}}>
                                                    <p className="text-gray-700 mx-auto font-medium">Featured</p>
                                                </div>
                                                <p className='pt-2 px-2'>N900</p>
                                            </div>
                                            <div className='col-span-8  py-0'>
                                                <p>Let your ad be on top of the listings</p>
                                                <div>
                                                    <div className="flex pt-2">
                                                        <div
                                                            className="flex items-center border rounded-full px-4 py-1 mr-1">
                                                            <p className="text-gray-700 ">1 month</p>
                                                        </div>
                                                        <div
                                                            className="flex items-center border rounded-full px-4 py-1 mx-1">
                                                            <p className="text-gray-700 ">3 months</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                        <div className='grid grid-cols-12 mt-2 gap-x-2 w-full border rounded-md p-2'>
                                            <div className='col-span-1 py-0'>
                                                <Radio
                                                    value="default radio"
                                                    name="radio-default"
                                                    testId="radio-default"
                                                    onChange={noop}
                                                />
                                            </div>
                                            <div className='col-span-3 py-0'>
                                                <div
                                                    className="flex items-center  rounded-md  py-1  mr-1"
                                                    style={{backgroundColor: '#C3E9D2'}}>
                                                    <p className="text-gray-700 mx-auto font-medium">Premium</p>
                                                </div>
                                                <p className='pt-2 px-2'>N2,999</p>
                                            </div>
                                            <div className='col-span-8  py-0'>
                                                <p>Let your ad be on top of the listings</p>
                                                <div>
                                                    <div className="flex pt-2">
                                                        <div
                                                            className="flex items-center border rounded-full px-4 py-1 mr-1">
                                                            <p className="text-gray-700 ">7 days</p>
                                                        </div>
                                                        <div
                                                            className="flex items-center border rounded-full px-4 py-1 mx-1">
                                                            <p className="text-gray-700 ">14 days</p>
                                                        </div>
                                                        <div
                                                            className="flex items-center  border rounded-full px-4 py-1 mx-1">
                                                            <p className="text-gray-700 ">30 days</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>


                                    </div>
                                </div>
                                <div className="col-span-5 ">
                                    <div className='col-span-2 py-0'><InlineEditDefault
                                        //defaultValue={business?.address}
                                        name={'title'}
                                        isRequired label='Title'/>
                                    </div>

                                    <div className='col-span-2 pt-4 py-0'>
                                        <Label htmlFor="toggle-default">Call for price</Label>
                                        <Toggle id="toggle-default"/>
                                    </div>

                                    <div className='col-span-2 py-0'>
                                        <Field label="Price" name="price" defaultValue="150,000">
                                            {({fieldProps}: any) => (
                                                <Fragment>
                                                    <Textfield
                                                        {...fieldProps}
                                                        elemBeforeInput={
                                                            <img src={PriceBeforeNaira} className='px-2'
                                                                 alt={'item Naira'}/>
                                                        }
                                                    />
                                                </Fragment>
                                            )}
                                        </Field>
                                    </div>

                                    <div className='pt-4'>
                                        <Label htmlFor="toggle-default">Condition</Label>
                                    </div>
                                    <div className='grid grid-cols-7 gap-x-2 w-full'>
                                        <div className='col-span-2 py-0'>
                                            <Label htmlFor="toggle-default">New</Label>
                                            <Toggle id="toggle-default"/>
                                        </div>
                                        <div className='col-span-2 py-0'>
                                            <Label htmlFor="toggle-default">Used</Label>
                                            <Toggle id="toggle-default"/>
                                        </div>

                                    </div>


                                    <div className='col-span-2 py-0'><InlineEditDefault
                                        //defaultValue={business?.address}
                                        name={'description'}
                                        isRequired
                                        label='Description'/>
                                    </div>
                                    <div className='pt-4'>
                                        <Label htmlFor="toggle-default">Specification</Label>
                                    </div>
                                    <div className='grid grid-cols-7 pt-2 gap-x-2 w-full'>
                                        <div className='col-span-2 py-0'>
                                            <Textfield name="basic" isCompact value={'Size'}
                                                       aria-label="default text field"/>
                                        </div>
                                        <div className='col-span-4 py-0'>
                                            <Textfield name="basic" isCompact value={'40, 42, 45, 50, 52'}
                                                       aria-label="default text field"/></div>
                                        <div className='col-span-1 pt-0 '>
                                            <IconButton icon={<SelectClearIcon primaryColor='#FF5630' label=""/>}
                                                        tooltip={'Add new specification'}/>
                                        </div>

                                    </div>
                                    <div className='grid grid-cols-7 pt-0 gap-x-2 w-full'>
                                        <div className='col-span-2 py-1'>
                                            <Textfield name="basic" isCompact value={'Color'}
                                                       aria-label="default text field"/>
                                        </div>
                                        <div className='col-span-4 py-1'>
                                            <Textfield name="basic" isCompact value={'Brown, Blue'}
                                                       aria-label="default text field"/></div>
                                        <div className='col-span-1 pt-0 '>
                                            <IconButton icon={<SelectClearIcon primaryColor='#FF5630' label=""/>}
                                                        tooltip={'Add new specification'}/>
                                        </div>

                                    </div>
                                    <div className='grid grid-cols-7 pt-0 gap-x-2 w-full'>
                                        <div className='col-span-2 py-1'>
                                            <Textfield name="basic" isCompact value={'Processor'}
                                                       aria-label="default text field"/>
                                        </div>
                                        <div className='col-span-4 py-1'>
                                            <Textfield name="basic" isCompact value={'Intel Core i9'}
                                                       aria-label="default text field"/></div>
                                        <div className='col-span-1 pt-0 '>
                                            <IconButton icon={<SelectClearIcon primaryColor='#FF5630' label=""/>}
                                                        tooltip={'Add new specification'}/>
                                        </div>

                                    </div>

                                    <div className='pt-4'>
                                        <Label htmlFor="toggle-default">Add new spec</Label>
                                    </div>
                                    <div className='grid grid-cols-7 gap-x-4 w-full'>
                                        <div className='col-span-2 py-0'><InlineEditDefault

                                            //defaultValue={business?.map.latitude.toString()}
                                            name={'title'}
                                            isRequired label='Title'/>
                                        </div>
                                        <div className='col-span-4 py-0'>
                                            <InlineEditDefault

                                                //defaultValue={business?.map.longitude.toString()}
                                                name={'value'}
                                                isRequired label='Value'/></div>
                                        <div className='col-span-1 pt-8 '>
                                            <IconButton icon={<AddCircleIcon primaryColor='#007C98' label=""/>}
                                                        tooltip={'Add new specification'}/>
                                        </div>

                                    </div>


                                </div>

                            </div>

                        </ModalBody>
                    </Modal>
                )}
            </ModalTransition>
        </>
    );
}

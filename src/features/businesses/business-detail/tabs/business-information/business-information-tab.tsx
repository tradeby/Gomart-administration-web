import Form, {Field, HelperMessage} from "@atlaskit/form";
import InlineEditDefault, {InlineDatePicker} from "../../../../../shared/inline-textfield";
import ButtonGroup from "@atlaskit/button/button-group";
import LoadingButton from "@atlaskit/button/loading-button";
import Button from "@atlaskit/button/standard-button";
import Lozenge from "@atlaskit/lozenge";
import SettingsIcon from '@atlaskit/icon/glyph/settings'
import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import {MapSection} from "./google-map-section";
import {useAppDispatch, useAppSelector} from "../../../../../app/hooks";
import {useNavigate} from "react-router-dom";
import {Business, Product, User} from "../../../../../shared/models";
import PlaceHolderImage from '../../../../../assets/place-holder-photo.svg';
import Icon from "@atlaskit/icon";
import {CustomAddIcon} from "../listed-products/product-detail/add-remove-icons";
import Toggle from "@atlaskit/toggle";
import {debounce} from "lodash";
import {ProductImageFile, toProductImageFile} from "../listed-products/product-detail/create-new-product-modal";
import {IconButton} from "@atlaskit/atlassian-navigation";
import SelectClearIcon from "@atlaskit/icon/glyph/select-clear";
import {generateDocumentId} from "../../../../../shared/firebase/generate-document-id";
import {saveProductStart} from "../listed-products/product-detail/product.slice";
import {updateBusinessRequest} from "./update-business.slice";
import {FullScreenLoader} from "../../../../../shared/loader/full-screen-loader";
import {GoogleMapTestComp} from "../../../../debug/seed-data";
import {DateTimePicker, TimePicker} from "@atlaskit/datetime-picker";

interface BusinessInformationFormProp {
    businessName: string,
    phoneNumber: string,
    openingTime: string,
    closingTime: string,
    latitude: string,
    longitude: string,
    businessAddress: string,
    State: string,
    area: string,
    photosUrl: string[]
}

const supportedTime:string[] = [  "07:00",  "07:30",  "08:00",  "08:30",  "09:00",  "09:30",  "10:00",  "10:30",  "11:00",  "11:30",  "12:00",  "12:30",  "13:00",  "13:30",  "14:00",  "14:30",  "15:00",  "15:30",  "16:00",  "16:30",  "17:00",  "17:30",  "18:00",  "18:30",  "19:00",  "19:30",  "20:00",  "20:30",  "21:00",  "21:30",  "22:00",  "22:30",  "23:00",  "23:30"];

export function BusinessInformationPanel(props: { business: Business }) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {saving, error} = useAppSelector((state) => state.updateBusinessSlice);


    const [coverImageFile, setCoverImageFile] = useState<ProductImageFile | null>(props.business?.coverPhotoUrl ? toProductImageFile({url: props.business?.coverPhotoUrl}) : null);
    const [logoUrlFile, setLogoUrlFile] = useState<ProductImageFile | null>(props.business?.logoUrl ? toProductImageFile({url: props.business?.logoUrl}) : null);
    const [gallaryImageFiles, setGallaryImageFiles] = useState<ProductImageFile[]>(props.business?.galleryPhotos ?
        [...props.business?.galleryPhotos.map(c => toProductImageFile({url: c}))] : []);

    const [business, setBusiness] = useState<Business>({
        ...props.business,
        isPublished: props.business?.isPublished ?? false,
        map: {latitude: props.business?.map?.latitude ?? 0, longitude: props?.business?.map?.longitude ?? 0},
        galleryPhotos: [...(props?.business?.galleryPhotos ?? [])]

    });
    const [showMap, setShowMap] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setShowMap(true);
        }, 200);
        // Code to be executed after component has been rendered to the DOM
    }, []); // Empty dependency array ensures that the effect runs only once, simulating componentDidMount

    const submitForm = (data: BusinessInformationFormProp) => {
        //console.log('submit form', data)

    }
    const handleIsPublished = () => {

        const cont = true;// checkIsPublishedCondition();
        if (cont) {
            setBusiness((prevState) => ({
                ...prevState,
                isPublished: !prevState.isPublished,
            }));
            // console.log(product);
        }

    }
    const handleBusinessMapChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        // add validation checkIsPublishedConditionSilent();
        setBusiness((prevBusiness) => ({
            ...prevBusiness,
            map: {
                ...prevBusiness.map,
                [name]: value
            }
        }));
        console.log(name, value, business);
    };
    const handleBusinessChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        // add validation checkIsPublishedConditionSilent();
        setBusiness((prevBusiness) => ({
            ...prevBusiness,
            [name]: value,
        }));
        console.log(name, value, business);
    };

    const handleUpdatePickedFile = (file: File) => {
        setCoverImageFile(toProductImageFile({file: file}))
    }
    const handleUpdatePickedLogoFile = (file: File) => {
        setLogoUrlFile(toProductImageFile({file: file}))
    }

    const handleUpdatePickedGallaryFiles = (files: File[]) => {
        setGallaryImageFiles(prevState => {
            return prevState.concat(files.map(f => toProductImageFile({file: f})))
        });
    }

    const handleRemoveGallaryPhotos = (index: number) => {
        setGallaryImageFiles(prevImageFiles => prevImageFiles.filter((_, i) => i !== index));

    }
    const handleMapAddressChange = (lat: number, lng: number, address: string) => {

        console.log('address handled is', address);
        setShowMap(false);
        setTimeout(() => {
            setShowMap(true);
        }, 200);
        setBusiness((prevBusiness) => ({
            ...prevBusiness,
            address: address,
            map: {
                ...prevBusiness.map,
                longitude: lng,
                latitude: lat,

            }
        }));


    }
    const buildAndUpdateBusiness = () => {
        const businessToSave: Business = {
            ...business,
            id: business.id,
            companyName: business.companyName,
            businessCategory: business.businessCategory,
            address: business.address,
            closingTime: business.closingTime,
            openingTime: business.openingTime,
            daysOpen: business.daysOpen,
            phoneNumber: business.phoneNumber,
            map: {
                latitude: business.map.latitude,
                longitude: business.map.longitude
            },
            logoUrl: business.logoUrl,
            isDeactivated: business.isDeactivated,
            isPublished: business.isPublished,
            coverPhotoUrl: business.coverPhotoUrl,
            galleryPhotos: [...gallaryImageFiles.filter(c => !c.file).map(d => d.url)],//for images we will have to upload them first
            createdOn: "",
            updatedOn: "",
        };

        console.log(businessToSave);
        dispatch(updateBusinessRequest({
            business: businessToSave,
            logoFile: logoUrlFile?.file as File,
            gallaryPhotos: gallaryImageFiles.filter(d => d.file !== null).map(c => c.file as File),
            coverPhotoFile: coverImageFile?.file as File
            // images: imageFiles.filter(d => d.file !== null).map(c => c.file as File)
        }))
    }


    function handleUpdateTime(key:string, value: string) {
        setBusiness((prevBusiness) => ({
            ...prevBusiness,
            [key]:value
        }));
    }

    /*  if (loading) {
          return <p>Loading!</p>
      }

      if (error) {
          return <p>{error.message}</p>
      }*/
    return (
        <>
            <Form<BusinessInformationFormProp>
                onSubmit={(data) => submitForm(data)}>
                {({formProps, submitting, dirty, reset}) => (
                    <form {...formProps}>
                        <div className='flex flex-row w-full justify-between '>
                            <p className="text-lg pt-2 pb-4 font-semibold"> Business
                                Information {!business.isPublished && <Lozenge>Not
                                    Visible</Lozenge>}
                            </p>
                            <div className='pt-2 flex flex-row '>
                                <span className='flex flex-row'>
                                    <p className='font-medium pt-1'>Visible</p>
                                <Toggle id="toggle-defaultyu"
                                        onChange={handleIsPublished}
                                    // isChecked={product.isPublished}
                                        name={'isPublished'}/>
                                </span>

                                <span className='pr-4'></span>

                                <ButtonGroup>
                                    <Button
                                        onClick={buildAndUpdateBusiness}
                                        type="submit"
                                        appearance="primary"
                                        /* isLoading={savingOperationOngoing}
                                           ={savingOperationOngoing}*/
                                    >
                                        Save Changes
                                    </Button>
                                    <Button type={"reset"} onClick={() => reset()}>Discard</Button>
                                </ButtonGroup>

                            </div>
                        </div>
                        <div className='grid grid-cols-12 pb-20 gap-x-20 w-full'>
                            <div className='col-span-7 '>

                                {saving && <FullScreenLoader/>}
                                <CoverPhotoDragDropSection coverPhotoUrl={coverImageFile?.url}
                                                           onFileChanged={handleUpdatePickedFile}/>

                                <div className='grid grid-cols-5 '>
                                    <div className='col-span-1'>

                                        <UploadLogoSection logoUrl={logoUrlFile?.url}
                                                           onFileChanged={handleUpdatePickedLogoFile}/>

                                    </div>
                                    <div className='col-span-4'>

                                        <div className='grid grid-cols-2 gap-x-8'>
                                            <div className='col-span-1 py-0'><InlineEditDefault
                                                onChange={handleBusinessChange}
                                                defaultValue={business?.companyName}
                                                name={'companyName'}
                                                isRequired label='Business Name'/>
                                            </div>
                                            <div className='col-span-1 py-0'>
                                                <InlineEditDefault
                                                    onChange={handleBusinessChange}
                                                    defaultValue={business?.phoneNumber}
                                                    name={'phoneNumber'}
                                                    isRequired label='Phone Number'/></div>


                                        </div>

                                        {/*<p className="text-lg pt-2 font-semibold"> Opening & Closing times
                                </p>*/}
                                        <div className='grid grid-cols-4 gap-x-8'>
                                            <div className='col-span-2 py-0'><InlineEditDefault
                                                onChange={handleBusinessChange}
                                                defaultValue={business?.businessCategory}
                                                name={'businessCategory'}
                                                isRequired label='Business Category'/>
                                            </div>
                                            {/*<div className='col-span-1 py-0'>
                                                <InlineEditDefault

                                                    defaultValue={business?.closingTime}
                                                    name={'closingTime'}
                                                    isRequired label='Closing Time'/></div>
                                            <div className='col-span-2 py-0'>
                                                <InlineEditDefault

                                                    //defaultValue={business?.closingTime}
                                                    name={'DaysOpen'}
                                                    isRequired label='Days open'/></div>*/}


                                        </div>
                                      {/*  <div className='grid grid-cols-4 gap-x-8'>
                                            <div className='col-span-1 py-0'><InlineEditDefault
                                                onChange={handleBusinessChange}
                                                defaultValue={business?.openingTime}
                                                name={'openingTime'}
                                                isRequired label='Opening Time'/>
                                            </div>
                                            <div className='col-span-1 py-0'>
                                                <InlineEditDefault
                                                    onChange={handleBusinessChange}

                                                    defaultValue={business?.closingTime}
                                                    name={'closingTime'}
                                                    isRequired label='Closing Time'/></div>
                                            <div className='col-span-2 py-0'>
                                                <InlineEditDefault
                                                    onChange={handleBusinessChange}
                                                    defaultValue={business?.daysOpen}
                                                    name={'daysOpen'}
                                                    isRequired label='Days open'/></div>


                                        </div>*/}
                                        <div className='grid grid-cols-4 gap-x-8'>
                                            <div className='col-span-1 py-0'>
                                                <Field
                                                    name="datetime-picker0"
                                                    label="Opening time"

                                                    defaultValue={business?.openingTime}
                                                    isRequired={false}
                                                >
                                                    {({ fieldProps }) => (
                                                        <>
                                                            <TimePicker
                                                                {...fieldProps}
                                                                times={supportedTime}
                                                                onChange={(value)=>handleUpdateTime('openingTime', value)}
                                                                selectProps={{ inputId: fieldProps.id }}
                                                            />

                                                        </>
                                                    )}
                                                </Field>
                                            </div>
                                            <div className='col-span-1 py-0'>
                                                <Field
                                                    name="datetime-picker2"
                                                    label="Closing time"
                                                    defaultValue={business?.closingTime}
                                                    isRequired={false}
                                                >
                                                    {({ fieldProps }) => (
                                                        <>
                                                            <TimePicker
                                                                {...fieldProps}
                                                                times={supportedTime}
                                                                onChange={(value)=>handleUpdateTime('closingTime',value)}
                                                                selectProps={{ inputId: fieldProps.id }}
                                                            />

                                                        </>
                                                    )}
                                                </Field>
                                            </div>

                                            <div className='col-span-2 py-0'>
                                                <InlineEditDefault
                                                    onChange={handleBusinessChange}
                                                    defaultValue={business?.daysOpen}
                                                    name={'daysOpen'}
                                                    isRequired label='Days open'/></div>


                                        </div>
                                    </div>
                                </div>

                                <p className="text-lg pt-6 font-semibold"> Location & Map
                                </p>
                                <div className='grid grid-cols-2 gap-x-8'>
                                    <div className='col-span-2 py-2'>
                                        {showMap ? <MapSection lat={business?.map.latitude as number ?? 0}
                                                               lng={business?.map.longitude as number ?? 0} zoom={14}
                                                               height={'200px'}/> :
                                            <div className='bg-slate-100' style={{height: '200px'}}></div>}
                                    </div>


                                </div>

                                <div className='grid grid-cols-3 gap-x-8 w-full'>
                                    <div className='col-span-1 py-0'><InlineEditDefault
                                        onChange={handleBusinessMapChange}
                                        isDisabled
                                        defaultValue={business?.map.latitude.toString()}
                                        name={'latitude'}
                                        isRequired label='Latitude'/>
                                    </div>
                                    <div className='col-span-1 py-0'>
                                        <InlineEditDefault

                                            defaultValue={business?.map.longitude.toString()}
                                            onChange={handleBusinessMapChange}
                                            name={'longitude'}
                                            isDisabled
                                            isRequired label='Longitude'/></div>
                                    <div className='col-span-1 py-0'>
                                        <InlineEditDefault
                                            onChange={handleBusinessMapChange}
                                            defaultValue={'14'}
                                            isDisabled
                                            name={'zoom'}
                                            isRequired label='zoom'/></div>


                                </div>

                                <div className='col-span-2 py-0'>

                                    <GoogleMapTestComp address={business?.address}
                                                       onChange={handleBusinessChange }
                                                       onAddressChange={handleMapAddressChange}/>
                                    {/* <InlineEditDefault

                                    defaultValue={business?.address}
                                    onChange={handleBusinessChange}
                                    name={'address'}
                                    isRequired label='Business Address'/>*/}
                                </div>

                                <GallaryPhotosSection galleryPhotos={gallaryImageFiles.map(c => c.url)}
                                                      onFileChanged={handleUpdatePickedGallaryFiles}
                                                      onRemoveImage={handleRemoveGallaryPhotos}
                                />

                            </div>
                            <div className="col-span-5">

                                <div className="max-w-md my-4 mx-auto p-2 rounded-md overflow-hidden shadow-md">
                                    <div className="flex items-center space-x-4 w-full">
                                        <div
                                            onClick={() => navigate('/Users/user-detail/' + business?.businessManager.uid)}
                                            className="flex cursor-pointer items-center w-full">
                                            <img src={business?.businessManager?.photoURL ?? PlaceHolderImage}
                                                 alt="Avatar"
                                                 className="rounded-full h-10 w-10"/>
                                            <span
                                                className="ml-2 font-medium text-gray-800">{business?.businessManager?.displayName}</span>
                                        </div>
                                        <div className="flex items-center  pr-4 text-gray-500">
                                            Settings <SettingsIcon label={'settings icon'}/>
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-2 gap-x-8'>
                                        <div className='col-span-2 py-2 justify-center '>
                                            <img src={coverImageFile?.url ?? PlaceHolderImage} alt="Image 1"
                                                 className="w-full h-28 object-cover"/>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-1 py-5">
                                        <div className="col-span-1 justify-center">
                                            <img src={logoUrlFile?.url ?? PlaceHolderImage} alt="Business Logo"
                                                 className="rounded-full h-20 w-20 object-cover"/>
                                        </div>
                                        <div className="grid grid-rows-4 gap-0 col-span-3">
                                            <div className="flex items-center">
                                                <span className="font-medium text-gray-800">Business:</span>
                                                <span
                                                    className="ml-2 text-gray-600 col-span-2">{business?.companyName}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <span className="font-medium text-gray-800">Address:</span>
                                                <span className="ml-2 text-gray-600 col-span-2">{business?.address}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <span className="font-medium text-gray-800">Opening Hours:</span>
                                                <span
                                                    className="ml-2 text-gray-600 col-span-2">9am-5pm, Monday-Friday</span>
                                            </div>
                                            <div className="flex items-center">
                                                <span className="font-medium text-gray-800">Member Since:</span>
                                                <span className="ml-2 text-gray-600 col-span-2">January 2022</span>
                                            </div>
                                        </div>
                                    </div>


                                    <div className='grid grid-cols-2 gap-x-8'>
                                        <div className='col-span-2 py-2'>
                                            {showMap ? <MapSection lat={business?.map.latitude as number ?? 0}
                                                                   lng={business?.map.longitude as number ?? 0} zoom={13}
                                                                   height={'100px'}/>:
                                                <div className='bg-slate-100' style={{height: '100px'}}></div>}

                                        </div>
                                    </div>
                                    {business?.galleryPhotos && business?.galleryPhotos?.length > 0 &&
                                        <p className="text-lg pt-2 font-semibold"> View our gallery
                                        </p>}
                                    <div className="grid grid-cols-2 gap-1 md:grid-cols-4">

                                        {gallaryImageFiles.map(ph => <img src={ph.url} alt="Image 1"
                                                                          className="rounded-sm shadow object-cover h-32 w-28"/>)}


                                    </div>
                                </div>

                            </div>

                        </div>

                    </form>
                )}
            </Form>
        </>
    );
}

function GallaryPhotosSection(props: { galleryPhotos?: string[], onFileChanged: (files: File[]) => void, onRemoveImage: (index: number) => void }) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files;
        if (selectedFiles) {
            console.log('Selected files:', selectedFiles);
            const files = Array.from(selectedFiles);
            // Filter out non-image files based on file type
            const imgFiles = files.filter(file => {
                const fileType = file.type.toLowerCase();
                return (
                    fileType === 'image/jpeg' ||
                    fileType === 'image/png' ||
                    fileType === 'image/webp' ||
                    fileType === 'image/gif' ||
                    fileType === 'image/bmp' ||
                    fileType === 'image/tiff' ||
                    fileType === 'image/jp2'
                );
            });
            // Update state with filtered image files
            if (imgFiles.length > 0) {
                props.onFileChanged(imgFiles);
            }
            console.log('something was dropped here', files);

            // Do something with the selected file, e.g. upload or process it
        }
    };

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    return <>
        <p className="text-lg pt-2 font-semibold"> Photos
        </p>
        <input
            multiple
            type="file"
            ref={fileInputRef}
            style={{display: 'none'}}
            onChange={handleFileInputChange}
        />
        <div className="flex flex-wrap space-y-2 space-x-4">
            <div onClick={handleButtonClick}
                 className="w-32 h-32 bg-slate-100 rounded-md ml-4 mx-1 mt-2 py-12 hover:shadow-md cursor-pointer text-center">
                <Icon glyph={CustomAddIcon} label=""/>
            </div>

            {props?.galleryPhotos && props?.galleryPhotos?.length > 0 && props.galleryPhotos?.map((ph, i) =>

                // <img src={ph} alt="Image 1" className="rounded-sm shadow object-cover w-32 h-32"/>
                <ImagePreviewItem removeImage={props.onRemoveImage} url={ph} index={i}/>
            )

            }
            {(props.galleryPhotos?.length ?? 0) <= 4 && Array(4 - (props?.galleryPhotos?.length ?? 0)).fill(4).map(a =>
                <div className="w-32 h-32 bg-slate-100 rounded-md "></div>
            )}
        </div>

    </>
}


function ImagePreviewItem(props: {
    url: string,
    index: number,
    removeImage: (fileIndex: number) => void,
}) {
    const [hovering, setHovering] = useState(false);

    const handleMouseEnter = () => {
        setHovering(true);
    };

    const handleMouseLeave = () => {
        setHovering(false);
    };


    return (
        <div

            className={
                'relative w-32 h-32 bg-slate-100 rounded-md mx-1 flex flex-col justify-end'}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {hovering && (
                <div className="absolute top-0 right-0 m-1">
                    <IconButton
                        onClick={() => props.removeImage(props.index)}
                        icon={<SelectClearIcon primaryColor='#6b778c' label=""/>}
                        tooltip={'remove image'}/>
                </div>
            )}
            <div
                className="flex-1"
                style={{
                    backgroundImage: `url(${props.url})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                {/* Add any content you want here */}
            </div>

            {/*<ProgressBar
                ariaLabel="Loading issues"
                appearance="success"
                isIndeterminate
            />*/}
        </div>
    );
}

function CoverPhotoDragDropSection(props: { coverPhotoUrl?: string, onFileChanged: (file: File) => void }) {
    const [isDragging, setIsDragging] = useState(false); // State to track if dragging is in progress
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const files = Array.from(event.dataTransfer.files);
        // Filter out non-image files based on file type
        const imgFiles = files.filter(file => {
            const fileType = file.type.toLowerCase();
            return (
                fileType === 'image/jpeg' ||
                fileType === 'image/png' ||
                fileType === 'image/webp' ||
                fileType === 'image/gif' ||
                fileType === 'image/bmp' ||
                fileType === 'image/tiff' ||
                fileType === 'image/jp2'
            );
        });

        // Update state with filtered image files
        //setImageFiles(imageFiles.concat(...imgFiles.map(c => toProductImageFile({file: c}))));
        //setPreviewImageIndex(imageFiles.concat(...imgFiles.map(c => toProductImageFile({file: c}))).length - 1);
        if (imgFiles.length > 0) {
            props.onFileChanged(imgFiles[imgFiles.length - 1]);
        }
        console.log('something was dropped here', files);
        //  dispatch(addImage(files[0])); // You can customize this to handle multiple images if needed
        setIsDragging(false); // Set isDragging state to false when drag ends
    };
    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {

        event.preventDefault();
        console.log('dragover');
    };
    const handleDragStart = () => {
        console.log('dragging started');
        setIsDragging(true); // Set isDragging state to true when drag starts
    };
    const handleDragEnd = debounce(() => {
        setIsDragging(false);
    }, 800); // Debounce time in milliseconds
    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files;
        if (selectedFiles) {
            console.log('Selected files:', selectedFiles);
            const files = Array.from(selectedFiles);
            // Filter out non-image files based on file type
            const imgFiles = files.filter(file => {
                const fileType = file.type.toLowerCase();
                return (
                    fileType === 'image/jpeg' ||
                    fileType === 'image/png' ||
                    fileType === 'image/webp' ||
                    fileType === 'image/gif' ||
                    fileType === 'image/bmp' ||
                    fileType === 'image/tiff' ||
                    fileType === 'image/jp2'
                );
            });
            // Update state with filtered image files
            if (imgFiles.length > 0) {
                props.onFileChanged(imgFiles[imgFiles.length - 1]);
            }
            console.log('something was dropped here', files);

            // Do something with the selected file, e.g. upload or process it
        }
    };

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return <div className='grid grid-cols-2 gap-x-8 mb-2 cursor-pointer'
                onDrop={handleDrop}
                onDragEnter={handleDragStart}
                onDragLeave={handleDragEnd}
                onDragOver={handleDragOver}
                onClick={handleButtonClick}
    >

        <div
            className={isDragging ? "border h-28 border-dashed border-black w-full text-center  bg-slate-100 rounded-md col-span-2 justify-center  "
                : "w-full text-center h-28  bg-slate-100 rounded-md col-span-2  justify-center "}
        >
            <input
                type="file"
                ref={fileInputRef}
                style={{display: 'none'}}
                onChange={handleFileInputChange}
            />
            {isDragging && <p className='py-10 my-4'>Drop Here!!</p>}
            {!isDragging //&& imageFiles.length > 0 && imageFiles[previewImageIndex]
                && (props.coverPhotoUrl ?
                        <img src={props.coverPhotoUrl ?? PlaceHolderImage} alt="Image 1"
                             className="w-full h-28 object-cover rounded-md"/> :
                        <p className='py-10 my-4'>Drop Here!!</p>

                    /*<div className=' h-56'>
                        <img
                            //src={imageFiles[previewImageIndex].url}
                            src={props.coverPhotoUrl ?? PlaceHolderImage}
                            alt={`Preview`}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                            }}
                        />
                    </div>*/
                )}
            {/*<img src={props.coverPhotoUrl ?? PlaceHolderImage} alt="Image 1"
                 className="w-full h-28 object-cover rounded-md"/>*/}
        </div>
    </div>
}

function UploadLogoSection(props: { logoUrl?: string, onFileChanged: (file: File) => void }) {
    const [isDragging, setIsDragging] = useState(false); // State to track if dragging is in progress
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const files = Array.from(event.dataTransfer.files);
        // Filter out non-image files based on file type
        const imgFiles = files.filter(file => {
            const fileType = file.type.toLowerCase();
            return (
                fileType === 'image/jpeg' ||
                fileType === 'image/png' ||
                fileType === 'image/webp' ||
                fileType === 'image/gif' ||
                fileType === 'image/bmp' ||
                fileType === 'image/tiff' ||
                fileType === 'image/jp2'
            );
        });

        // Update state with filtered image files
        //setImageFiles(imageFiles.concat(...imgFiles.map(c => toProductImageFile({file: c}))));
        //setPreviewImageIndex(imageFiles.concat(...imgFiles.map(c => toProductImageFile({file: c}))).length - 1);
        if (imgFiles.length > 0) {
            props.onFileChanged(imgFiles[imgFiles.length - 1]);
        }
        console.log('something was dropped here', files);
        //  dispatch(addImage(files[0])); // You can customize this to handle multiple images if needed
        setIsDragging(false); // Set isDragging state to false when drag ends
    };
    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {

        event.preventDefault();
        console.log('dragover');
    };
    const handleDragStart = () => {
        console.log('dragging started');
        setIsDragging(true); // Set isDragging state to true when drag starts
    };
    const handleDragEnd = debounce(() => {
        setIsDragging(false);
    }, 800); // Debounce time in milliseconds

    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files;
        if (selectedFiles) {
            console.log('Selected files:', selectedFiles);
            const files = Array.from(selectedFiles);
            // Filter out non-image files based on file type
            const imgFiles = files.filter(file => {
                const fileType = file.type.toLowerCase();
                return (
                    fileType === 'image/jpeg' ||
                    fileType === 'image/png' ||
                    fileType === 'image/webp' ||
                    fileType === 'image/gif' ||
                    fileType === 'image/bmp' ||
                    fileType === 'image/tiff' ||
                    fileType === 'image/jp2'
                );
            });
            // Update state with filtered image files
            if (imgFiles.length > 0) {
                props.onFileChanged(imgFiles[imgFiles.length - 1]);
            }
            console.log('something was dropped here', files);

            // Do something with the selected file, e.g. upload or process it
        }
    };

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    return <div
        onDrop={handleDrop}
        onDragEnter={handleDragStart}
        onDragLeave={handleDragEnd}
        onDragOver={handleDragOver}
    >
        <div style={{width: '8rem', height: '8rem'}}
             className={isDragging ? "border border-dashed border-black w-full text-center  bg-slate-100  rounded-full col-span-2 justify-center  "
                 : "w-full text-center  bg-slate-100 rounded-full col-span-2  justify-center "}>
            <input
                type="file"
                ref={fileInputRef}
                style={{display: 'none'}}
                onChange={handleFileInputChange}
            />
            {isDragging && <p className='py-10 my-4'>Drop Here!!</p>}
            {!isDragging //&& imageFiles.length > 0 && imageFiles[previewImageIndex]
                && (props.logoUrl ?
                        <img src={props.logoUrl ?? PlaceHolderImage} alt="Image 1"
                             onClick={handleButtonClick}
                             style={{width: '8rem', height: '8rem'}}
                             className="w-full cursor-pointer  object-cover rounded-full"/> :
                        <p className='py-10 my-4'>Drop Here!!</p>
                )}
        </div>
        {/* <img src={business?.logoUrl ?? PlaceHolderImage} alt="Business Logo"

         className="rounded-full  object-cover"/>*/}

        <div className=' py-2 px-3'>
            <Button onClick={handleButtonClick}>Upload Logo</Button>
        </div>
    </div>

}

export function ProductCard() {
    return <div className="w-full md:w-1/2 lg:w-1/4 px-1 mb-8">
        <div className="bg-white  shadow">
            <img src="https://placehold.it/400x400" alt="Restaurant Image"
                 className="w-full "/>
            <div className="p-4">
                <h3 className=" font-semibold mb-2">Restaurant Name 3</h3>
                <Lozenge>Restaurant</Lozenge>
            </div>
        </div>
    </div>;
}

export function BusinessCard() {
    return <div className="w-full md:w-1/2 lg:w-1/4 px-1 mb-8">
        <div className="bg-white  shadow">
            <img src="https://placehold.it/400x400" alt="Restaurant Image"
                 className="w-full rounded-full "/>
            <div className="p-4">
                <h3 className=" font-semibold mb-2">Restaurant Name 3</h3>
                <Lozenge>Restaurant</Lozenge>
            </div>
        </div>
    </div>;
}

function SavedProductsSection() {
    return <>
        <p className="text-lg  pt-12 pb-3 font-semibold"> Saved products
        </p>
        <div className="flex py-0 my-0 flex-wrap mx-0 px-0">
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>

        </div>
        <a className="text-md -mt-10 pt-0 font-semibold"> View more
        </a>
    </>
}


function FollowedBusinessesSection() {
    return <>
        <p className="text-lg  pt-12 pb-3 font-semibold"> Saved products
        </p>
        <div className="flex flex-wrap mx-0 px-0">
            <BusinessCard/>
            <BusinessCard/>
            <BusinessCard/>
            <BusinessCard/>
        </div>
        <a className="text-md  pt-4 font-semibold"> View more
        </a>
    </>
}

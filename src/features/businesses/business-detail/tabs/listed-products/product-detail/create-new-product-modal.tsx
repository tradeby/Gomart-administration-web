import React, {ChangeEvent, Fragment, useCallback, useEffect, useRef, useState} from 'react';
import ButtonGroup from '@atlaskit/button/button-group';
import Button from '@atlaskit/button/standard-button';
import Modal, {
    ModalBody,
    ModalHeader,
    ModalTitle,
    ModalTransition,
} from '@atlaskit/modal-dialog';
import Form, {Field, Label} from "@atlaskit/form";
import InlineEditDefault from "../../../../../../shared/inline-textfield";
import Toggle from "@atlaskit/toggle";
import {IconButton} from "@atlaskit/atlassian-navigation";
import Textfield from '@atlaskit/textfield';
import PriceBeforeNaira from '../../../../../../assets/price-naira-before-icon.svg';
import Icon from "@atlaskit/icon";
import {CustomAddIcon} from "./add-remove-icons";
import {Radio} from "@atlaskit/radio";
import SelectClearIcon from '@atlaskit/icon/glyph/select-clear';
import AddCircleIcon from '@atlaskit/icon/glyph/add-circle';
import {debounce} from "lodash";
import {PromoteType, PromoteTypeList, PromotionPeriod} from "./promote-type";
import {formatToNairaCurrency} from "../../../../../../shared/currency-formatter/format-to-naira";
import {generateDocumentId} from "../../../../../../shared/firebase/generate-document-id";
import {Product} from "../../../../../../shared/models";
import {useAppDispatch, useAppSelector} from "../../../../../../app/hooks";
import {saveProductStart} from "./product.slice";
import {FullScreenLoader} from "../../../../../../shared/loader/full-screen-loader";
import {deleteProduct, fetchListedProductsStart} from "../listed-products.slice";
import {ListedProductCard} from "../listed-products-tab";
import Lozenge from "@atlaskit/lozenge";

interface ProductImageFile {
    url: string,
    file: File | null,
}

function toProductImageFile(prop: { url?: string, file?: File }): ProductImageFile {
    if (prop.url) {
        return {url: prop.url, file: null};
    }
    if (prop.file) {
        return {
            url: URL.createObjectURL(prop.file),
            file: prop.file
        };
    }
    throw "Either Url or File required";
}

interface ProductSpecifications {
    id: string;
    title: string;
    value: string;
}

const initialProductState: Product = {
    id: "",
    businessId: "",
    productName: "New product or service",
    productDescription: "",
    isNew: true,
    price: 0,
    callForPrice: false,
    isPublished: false,
    productImageUrls: [],
    specifications: [],
    createdOn: "",
    updatedOn: "",
};


export default function CreateProductDialog(props: { editProduct?: Product }) {
    const dispatch = useAppDispatch();
    const [product, setProduct] = useState<Product>(props.editProduct ? {...initialProductState, ...props.editProduct} : initialProductState);

    const [selectedPromoteAd, setSelectedPromoteAd] = useState<PromoteType>(PromoteTypeList[0])
    const [imageFiles, setImageFiles] = useState<ProductImageFile[]>([...product.productImageUrls.map(c => toProductImageFile({url: c}))]);

    const [specification, setSpecification] = useState<ProductSpecifications>({
        id: '999',
        title: '',
        value: '',
    });
    const [previewImageIndex, setPreviewImageIndex] = useState<number>(0);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const {business} = useAppSelector((state) => state.businessDetailSlice);
    const {saving, error, savedSuccessfully} = useAppSelector((state) => state.productDetailSlice);

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

    useEffect(() => {
        if (!props?.editProduct) {
            closeModal();
        }

    }, [savedSuccessfully])

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
        setImageFiles(imageFiles.concat(...imgFiles.map(c => toProductImageFile({file: c}))));
        setPreviewImageIndex(imageFiles.concat(...imgFiles.map(c => toProductImageFile({file: c}))).length - 1);
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

    const handleCallForPrice = () => {

        setProduct((prevProduct) => ({
            ...prevProduct,
            callForPrice: !prevProduct.callForPrice,
        }));
        console.log(product);
    }

    const handleIsNewToggle = () => {

        setProduct((prevProduct) => ({
            ...prevProduct,
            isNew: !prevProduct.isNew,
        }));
        console.log(product);
    }

    const handleIsPublished = () => {

        setProduct((prevProduct) => ({
            ...prevProduct,
            isPublished: !prevProduct.isPublished,
        }));
        console.log(product);
    }
    const handleProductChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
        console.log(name, value, product);
    };

    const handleChangeSpec = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setSpecification((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
        console.log(name, value, specification);
    };
    const addNewSpec = () => {
        //set specification in product
        const newSpec: ProductSpecifications = {
            id: (product.specifications.length + 1).toString(),
            title: specification.title,
            value: specification.value
        };
        setProduct((prevProduct) => ({
            ...prevProduct,
            specifications: [...prevProduct.specifications, newSpec],
        }));
        setSpecification({
            id: '999',
            title: '',
            value: '',
        });
        //clear spefication
    }

    const handleRemoveSpec = (id: string) => {
        return function (p1: React.MouseEvent<HTMLElement>, p2: any) {
            const cont: boolean = window.confirm("Are you sure you want to remove specification");
            if (cont) {
                const specsAfterDelete = product.specifications.filter(c => c.id !== id);
                setProduct((prevProduct) => ({
                    ...prevProduct,
                    specifications: specsAfterDelete,
                }));
                setPreviewImageIndex(0);
            }
        };
    }
    const changeSelectedAd = (ad: PromoteType) => {
        setSelectedPromoteAd(ad);
    }

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
            setImageFiles(prevImageFiles => prevImageFiles.concat(...imgFiles.map(c => toProductImageFile({file: c}))));
            console.log('something was dropped here', files);
            // Do something with the selected file, e.g. upload or process it
        }
    };

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    const handleRemoveImage = (index: number) => {
        setImageFiles(prevImageFiles => prevImageFiles.filter((_, i) => i !== index));

    }

    const buildAndSaveProduct = () => {
        const newDocumentId = props.editProduct ? props.editProduct.id : generateDocumentId();
        const prodToSave: Product = {
            id: newDocumentId,
            businessId: business?.id as string,
            productName: product.productName,
            productDescription: product.productDescription,
            isNew: product.isNew,
            price: product.price,
            callForPrice: product.callForPrice,
            isPublished: product.isPublished,
            productImageUrls: [...imageFiles.filter(c => !c.file).map(d => d.url)],//for images we will have to upload them first
            specifications: product.specifications,
            createdOn: "",
            updatedOn: "",
        };
        dispatch(saveProductStart({
            product: prodToSave,
            images: imageFiles.filter(d => d.file !== null).map(c => c.file as File)
        }))
    }

    const handleDelete = () => {
        const cont = confirm('Are you sure you want to delete product/Service?');
        if (cont) {
            dispatch(deleteProduct({
                businessId: props.editProduct?.businessId as string,
                productId: props.editProduct?.id as string
            }))
        }
    }

    return (
        <>
            {props.editProduct ?
                <ListedProductCard onClick={() => setWidthAndOpen('x-large')} product={props.editProduct}/> :
                <ButtonGroup>
                    <Button onClick={() => setWidthAndOpen('x-large')} appearance='primary'>Create new product</Button>
                </ButtonGroup>
            }


            <ModalTransition>
                {isOpen && (
                    <Modal onClose={closeModal} width={width}>
                        <ModalHeader>
                            {props.editProduct ?
                                <ModalTitle>Edit product - {product.productName} {!product.isPublished &&
                                    <Lozenge>Not public</Lozenge>}</ModalTitle>
                                : <ModalTitle>Create new product/service</ModalTitle>
                            }
                            <div className='flex flex-row justify-center'>
                                <p className='font-medium pt-1'>Is published</p>
                                <Toggle id="toggle-default" onChange={handleIsPublished}
                                        isChecked={product.isPublished} name={'isPublished'}/>
                                <span className='pr-4'></span>
                                {props.editProduct ?

                                    <Button appearance="primary" onClick={buildAndSaveProduct} autoFocus>
                                        Save Changes
                                    </Button> :
                                    <Button appearance="primary" onClick={buildAndSaveProduct} autoFocus>
                                        Create new product
                                    </Button>}
                                <span className='pr-4'></span>
                                {props.editProduct &&

                                    <Button onClick={ handleDelete } appearance="danger" >
                                        Delete
                                    </Button>}
                                <span className='pr-4'></span>
                                <Button onClick={closeModal} appearance="subtle">Cancel</Button>

                            </div>
                        </ModalHeader>
                        <ModalBody>


                            {saving && <FullScreenLoader/>}
                            <Form<Product>
                                onSubmit={(data) => console.log('product')}>
                                {({formProps, submitting, dirty, reset}) => (
                                    <form {...formProps}>
                                        <input
                                            multiple
                                            type="file"
                                            ref={fileInputRef}
                                            style={{display: 'none'}}
                                            onChange={handleFileInputChange}
                                        />
                                        <div onDrop={handleDrop}
                                             onDragEnter={handleDragStart}
                                             onDragLeave={handleDragEnd}
                                             onDragOver={handleDragOver}
                                             className='grid grid-cols-12 justify-center pb-20 gap-x-4 w-full'>

                                            <div className='col-span-6 ml-2 pt-4 '>
                                                <div onDrop={handleDrop}
                                                     onDragOver={handleDragOver}
                                                     onDragEnter={handleDragStart}
                                                     onDragLeave={handleDragEnd}
                                                     className={isDragging ? "border border-dashed border-black w-full text-center h-56 bg-slate-100 rounded-md " : "w-full text-center h-56 bg-slate-100 rounded-md"}>

                                                    {isDragging && <p className='py-20 my-4'>Drop Here!!</p>}
                                                    {!isDragging && imageFiles.length > 0 && imageFiles[previewImageIndex] && (
                                                        <div className=' h-56'>
                                                            <img
                                                                src={imageFiles[previewImageIndex].url}
                                                                alt={`Preview ${previewImageIndex + 1}`}
                                                                style={{
                                                                    width: '100%',
                                                                    height: '100%',
                                                                    objectFit: 'contain',
                                                                }}
                                                            />
                                                        </div>
                                                    )}

                                                </div>

                                                <div className="flex flex-wrap space-y-3 mt-0 ">
                                                    <div onClick={handleButtonClick}
                                                         className="w-16 h-16 bg-slate-100 rounded-md mx-1 mt-3 py-5 hover:shadow-md cursor-pointer text-center">
                                                        <Icon glyph={CustomAddIcon} label=""/>
                                                    </div>
                                                    {imageFiles.map((file, index) =>
                                                        <ImagePreviewItem removeImage={handleRemoveImage} index={index}
                                                                          previewImageIndex={previewImageIndex}
                                                                          previewImage={(i) => setPreviewImageIndex(i)}
                                                                          url={file.url}/>
                                                    )}

                                                    {/*    {product.productImageUrls.map((file, index) =>
                                                        <ImagePreviewItem removeImage={handleRemoveImage} index={index}
                                                                          previewImageIndex={previewImageIndex}
                                                                          previewImage={(i) => setPreviewImageIndex(i)}
                                                                          url={file}/>
                                                    )}*/}

                                                    {(imageFiles.length + product.productImageUrls.length) <= 5 && Array(5 - (imageFiles.length + product.productImageUrls.length)).fill(5).map(a =>
                                                        <div className="w-16 h-16 bg-slate-100 rounded-md mx-1"></div>
                                                    )}
                                                </div>

                                                <div className='col-span-2 pt-4 py-0'>
                                                    <Label htmlFor="toggle-default">Promote your product/Service</Label>
                                                </div>

                                                <div>

                                                    {PromoteTypeList.map(p => <PostAdItem postAdType={p}
                                                                                          selectedAdType={selectedPromoteAd}
                                                                                          key={p.id}
                                                                                          onChange={changeSelectedAd}
                                                    />)}


                                                </div>
                                            </div>
                                            <div className="col-span-5 "
                                                 onDrop={handleDrop}
                                                 onDragEnter={handleDragStart}
                                                 onDragLeave={handleDragEnd}
                                                 onDragOver={handleDragOver}
                                            >
                                                <div className='col-span-2 py-0'><InlineEditDefault
                                                    defaultValue={product.productName}
                                                    name={'productName'}
                                                    onChange={handleProductChange}
                                                    isRequired label='Title'/>
                                                </div>

                                                <div className='col-span-2 pt-4 py-0'>
                                                    <Label htmlFor="toggle-default">Call for price</Label>
                                                    <Toggle id="toggle-default" onChange={handleCallForPrice}
                                                            isChecked={product.callForPrice} name={'callForPrice'}/>
                                                </div>

                                                {!product.callForPrice && <div className='col-span-2 py-0'>
                                                    <Field label="Price" defaultValue={product.price}

                                                           name={'price'}>
                                                        {({fieldProps}: any) => (
                                                            <Fragment>
                                                                <Textfield
                                                                    {...fieldProps}
                                                                    type='number'
                                                                    onChange={handleProductChange}
                                                                    elemBeforeInput={
                                                                        <img src={PriceBeforeNaira} className='px-2'
                                                                             alt={'item Naira'}/>
                                                                    }
                                                                />
                                                            </Fragment>
                                                        )}
                                                    </Field>
                                                </div>}

                                                <div className='pt-4'>
                                                    <Label htmlFor="toggle-default">Condition</Label>
                                                </div>
                                                <div className='grid grid-cols-7 gap-x-2 w-full'>
                                                    <div className='col-span-2 py-0'>
                                                        <Label htmlFor="toggle-default">New</Label>
                                                        <Toggle id="toggle-default" onChange={handleIsNewToggle}
                                                                isChecked={product.isNew} name={'isNew'}/>
                                                    </div>
                                                    <div className='col-span-2 py-0'>
                                                        <Label htmlFor="toggle-default">Used</Label>
                                                        <Toggle id="toggle-default" onChange={handleIsNewToggle}
                                                                isChecked={!product.isNew} name={'isNew'}/>
                                                    </div>

                                                </div>


                                                <div className='col-span-2 py-0'><InlineEditDefault
                                                    defaultValue={product.productDescription}
                                                    onChange={handleProductChange}
                                                    name={'productDescription'}
                                                    isRequired
                                                    label='Description'/>
                                                </div>
                                                <div className='pt-4'>
                                                    <Label htmlFor="toggle-default">Specification</Label>
                                                </div>
                                                {product.specifications.map(s =>
                                                    <div key={s.id} className='grid grid-cols-7 pt-2 gap-x-2 w-full'>
                                                        <div className='col-span-2 py-0'>
                                                            <Textfield name="specTitle" isCompact value={s.title}
                                                                       isDisabled
                                                                       aria-label="default text field"/>
                                                        </div>
                                                        <div className='col-span-4 py-0'>
                                                            <Textfield name="specValue" isCompact value={s.value}
                                                                       isDisabled
                                                                       aria-label="default text field"/></div>
                                                        <div className='col-span-1 pt-0 '>
                                                            <IconButton
                                                                onClick={handleRemoveSpec(s.id)}
                                                                icon={<SelectClearIcon primaryColor='#6b778c'
                                                                                       label=""/>}
                                                                tooltip={'Remove specification'}/>
                                                        </div>

                                                    </div>)}

                                                {/*
                                        <div className='grid grid-cols-7 pt-0 gap-x-2 w-full'>
                                            <div className='col-span-2 py-1'>
                                                <Textfield name="basic" isCompact value={'Color'}
                                                           aria-label="default text field"/>
                                            </div>
                                            <div className='col-span-4 py-1'>
                                                <Textfield name="basic" isCompact value={'Brown, Blue'}
                                                           aria-label="default text field"/></div>
                                            <div className='col-span-1 pt-0 '>
                                                <IconButton
                                                    icon={<SelectClearIcon primaryColor='#6b778c' label=""/>}
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
                                                <IconButton
                                                    icon={<SelectClearIcon primaryColor='#6b778c' label=""/>}
                                                    tooltip={'Add new specification'}/>
                                            </div>

                                        </div>*/}

                                                <div className='pt-4'>
                                                    <Label htmlFor="toggle-default">Add new spec</Label>
                                                </div>
                                                <div className='grid grid-cols-7 gap-x-4 w-full'>
                                                    <div className='col-span-2 py-0'><InlineEditDefault
                                                        defaultValue={specification.title}
                                                        onChange={handleChangeSpec}
                                                        name={'title'} label='Title'/>
                                                    </div>
                                                    <div className='col-span-4 py-0'>
                                                        <InlineEditDefault
                                                            onChange={handleChangeSpec}
                                                            defaultValue={specification.value}
                                                            name={'value'} label='Value'/></div>
                                                    <div className='col-span-1 pt-8 '>
                                                        <IconButton
                                                            onClick={addNewSpec}
                                                            icon={<AddCircleIcon primaryColor='#007C98' label=""/>}
                                                            tooltip={'Add new specification'}/>
                                                    </div>

                                                </div>


                                            </div>

                                        </div>
                                    </form>
                                )}
                            </Form>


                        </ModalBody>
                    </Modal>
                )}
            </ModalTransition>
        </>
    );
}

function PostAdItem(prop: { postAdType: PromoteType, selectedAdType: PromoteType, onChange: any }) {
    const [selectedAdItem, setSelectedAdItem] = useState<PromotionPeriod | null>(prop.postAdType.supportedPeriods.length > 0 ?
        prop.postAdType.supportedPeriods[0] : null);

    return <div
        className={prop.postAdType.id === prop.selectedAdType.id ? 'grid grid-cols-12 mt-2  gap-x-2 w-full border rounded-md p-2 bg-slate-50' : 'grid grid-cols-12 mt-2  gap-x-2 w-full border rounded-md p-2 hover:bg-slate-50'}

    >
        <div className='col-span-1 py-0'>
            <Radio
                value="default radio"
                name={'radio-default' + prop.postAdType.id}
                testId="radio-default"
                isChecked={prop.postAdType.id === prop.selectedAdType.id}
                onChange={() => prop.onChange(prop.postAdType)}
            />
        </div>
        <div className='col-span-3 py-0'>
            <div onClick={() => prop.onChange(prop.postAdType)}
                 className="flex items-center cursor-pointer rounded-md  py-1  mr-1"
                 style={{backgroundColor: prop.postAdType.color}}>
                <p className="text-gray-700 mx-auto font-medium">{prop.postAdType.title}</p>

            </div>
            {selectedAdItem === null && <p className='pt-2 px-2'>Free</p>}
            {selectedAdItem !== null &&
                <p className='pt-2 px-2'> {formatToNairaCurrency(selectedAdItem.costAmount)}</p>}
        </div>
        <div className='col-span-8  py-0'>
            <p>{prop.postAdType.description}</p>
            <div>
                <div className="flex pt-2">
                    {prop.postAdType.supportedPeriods.map(c =>
                        <div key={c.id} onClick={() => {
                            setSelectedAdItem(c);
                            prop.onChange(prop.postAdType)
                        }}
                             className={c.id === selectedAdItem?.id ? 'bg-slate-200 flex cursor-pointer items-center border rounded-full px-4 py-1 mr-1' :
                                 'flex cursor-pointer items-center border rounded-full px-4 py-1 mr-1 hover:bg-slate-100'}>
                            <p className="text-gray-700  ">{c.title}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>

    </div>
}


function ImagePreviewItem(props: {
    url: string,
    index: number,
    previewImageIndex: number,
    removeImage: (fileIndex: number) => void,
    previewImage: (fileIndex: number) => void
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
            onClick={() => props.previewImage(props.index)}
            className={props.index === props.previewImageIndex ? 'relative w-16 h-16 bg-slate-100 rounded-md mx-1 flex flex-col justify-end border' :
                'relative w-16 h-16 bg-slate-100 rounded-md mx-1 flex flex-col justify-end'}
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

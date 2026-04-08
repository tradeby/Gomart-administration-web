import React, {useEffect} from "react";
import Breadcrumbs, {BreadcrumbsItem} from "@atlaskit/breadcrumbs";
import ButtonGroup from '@atlaskit/button/button-group';
import __noop from "@atlaskit/ds-lib/noop";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import TextField from '@atlaskit/textfield';
import PageHeader from "@atlaskit/page-header";
import Checkbox from "@atlaskit/checkbox";
import {HeadCellType} from "@atlaskit/dynamic-table/types";
import {sampleData, SoldAdsTableModel} from "../ads-sales/sold-ads-model";
import {AppDispatch} from "../../app/store";
import {createKey} from "../../shared/table-helper";
import Avatar from "@atlaskit/avatar";
import Lozenge from "@atlaskit/lozenge";
import {timeAgo} from "../../shared/time-ago/time-ago";
import Button from "@atlaskit/button/standard-button";
import DynamicTable from "@atlaskit/dynamic-table";
import {getFeedbacksStart, searchFeedback} from "./app-feedback.slice";
import {debounce} from 'lodash';
import { Feedback } from "../../shared/models";

const breadcrumbs = (
    <Breadcrumbs onExpand={__noop}>
        <BreadcrumbsItem text="Dashboard" key="Some project"/>
        <BreadcrumbsItem text="App Feedback" key="Parent page"/>
        <BreadcrumbsItem text="list" key="Parent page"/>
    </Breadcrumbs>
);

const actionsContent = (
    <ButtonGroup>
        <Button isDisabled appearance="primary">Invite Administrators</Button>
    </ButtonGroup>
);



export function AppFeedback() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    
    const {loading, error, feedbacks, searchTerm, searchedFeedback} = useAppSelector((state) => state.feedbacksSlice);

    // Define a debounced function for slicing the input value
    const handleInputSlice = debounce((value: string) => {
        dispatch(searchFeedback({searchTerm: value})); // Update the sliced value in state
    }, 300); // Debounce time in milliseconds

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;// Update the input value in state
        dispatch(searchFeedback({searchTerm: inputValue})); // U
        //   handleInputSlice(inputValue); // Invoke the debounced function to slice the input value
    };
    useEffect(() => {
        dispatch(getFeedbacksStart());
    }, [])


    if (error) {
        return <div>{error.status} {error.message}</div>
    }
    return <div className='container px-12 mx-auto'>
        <PageHeader
            breadcrumbs={breadcrumbs}
            actions={actionsContent}
            bottomBar={
                <div style={{display: 'flex'}}>
                    <div style={{flex: '0 0 400px'}}>
                        <TextField value={searchTerm === null ? '' : searchTerm as string} onChange={handleInputChange}
                                   isCompact placeholder="Search users, names, phone numbers, Uids etc"
                                   aria-label="Search feedbacks"/>
                    </div>
                   {/* <div style={{flex: '0 0 200px', marginLeft: 8}}>
                        <Button appearance="primary">Search</Button>
                    </div>*/}
                </div>}
        >
            App feedback - see all feedbacks sent by customers
        </PageHeader>
        <div className='py-8'>
            <DynamicTable
                head={tableHead({withWidth: true})}
                rows={rows(feedbacks, navigate, dispatch)}
                isLoading={loading}
                rowsPerPage={4}
                defaultPage={1}
                isFixedSize={false}
                loadingSpinnerSize="large"
                isRankable={false}
            />
        </div>
    </div>
}

const tableHead = (props: {
    withWidth: boolean,
}) => {

    return {
        cells: [
            {
                key: 'check',
                content: <Checkbox
                    onClick={() => {
                    }}
                ></Checkbox>,
                isSortable: false,
                width: undefined,
            },
            {
                key: 'id',
                content: 'ID',
                width: props.withWidth ? 20 : undefined,
            },
            {
                key: 'submittedByUser',
                content: 'Submitted by',
                width: props.withWidth ? 10 : undefined,
            },

            {
                key: 'message',
                content: 'Feedback message',
                width: props.withWidth ? 10 : undefined,
            },
             {
                key: 'rating',
                content: 'Rating',
                width: props.withWidth ? 10 : undefined,
            }, 
            {
                key: 'createdOn',
                content: 'Created on',
                width: props.withWidth ? 10 : undefined,
            },
            {
                key: 'updatedOn',
                content: 'Updated on',
                width: props.withWidth ? 15 : undefined,
            },

            {
                key: 'modify',
                content: 'Modify',
                width: 20,
                shouldTruncate: true,
            },
        ],
    } as { cells: HeadCellType[] };
};

const rows = (feedbacks: Feedback[] | undefined, navigate: NavigateFunction, dispatch: AppDispatch,) =>
    feedbacks?.map((feedback: Feedback, index: number) => ({
        key: `row-${index}-${feedback.id}`,
        cells: [
            {
                    key: createKey('Check' + feedback.id.toString()),
                content: <Checkbox
                    onClick={() => {
                    }}
                ></Checkbox>,
            },
            {
                key: createKey(feedback.id),
                content: <label>
                    {feedback.id}
                </label> ,
            },
            {
                key: createKey(feedback.id + feedback.submittedByUserId),
                content: <div
                    onClick={() => navigate('/businesses/business-detail/' + feedback.submittedByUser.businessId)}
                    className='flex gap-2'>

                    <Avatar size="small" src={'user.photoUrl'}/>
                    <div>
                        <label>
                            {feedback.submittedByUser.displayName}
                        </label>
                    </div>

                </div>
            },
             {
                key: createKey(feedback.id + feedback.message),
                content: <label>
                    {feedback.message}
                </label> ,
            },
            {
                key: createKey(feedback.id + feedback.rating),
                content: <Lozenge>{feedback.rating}</Lozenge>,
            },
            {
                key: createKey(feedback.id + feedback.createdOn),
                content: <p>{feedback.createdOn}</p>,
            },
            {
                key: createKey(feedback.updatedOn),
                content: <p>{feedback.updatedOn}</p>,
            },
            {
                key: createKey('view' + feedback.id),
                content: (
                    <Button onClick={() => {
                    }}>View</Button>
                ),
            },
        ],
    }));



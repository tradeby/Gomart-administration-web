export interface UserListInterface {
    id: number;
    name: string;
    phoneNumber: string;
    lastSignedIn: string;
    createdOn: string;
    updatedOn: string;
    role: string;
}


export const ListOfUser: UserListInterface[] = [
    {
        id: 1,
        name: "John Doe",
        phoneNumber: "555-555-1234",
        lastSignedIn: "2022-03-15T09:30:00Z",
        createdOn: "2021-05-10T12:00:00Z",
        updatedOn: "2022-03-15T09:30:00Z",
        role: "admin"
    },
    {
        id: 2,
        name: "Jane Smith",
        phoneNumber: "555-555-5678",
        lastSignedIn: "2022-04-01T14:45:00Z",
        createdOn: "2021-08-22T10:30:00Z",
        updatedOn: "2022-04-01T14:45:00Z",
        role: "user"
    },
    {
        id: 3,
        name: "Bob Johnson",
        phoneNumber: "555-555-9012",
        lastSignedIn: "2022-04-05T16:20:00Z",
        createdOn: "2022-01-01T08:00:00Z",
        updatedOn: "2022-04-05T16:20:00Z",
        role: "user"
    },
    {
        id: 4,
        name: "Samantha Lee",
        phoneNumber: "555-555-3456",
        lastSignedIn: "2022-03-30T11:15:00Z",
        createdOn: "2021-11-12T15:00:00Z",
        updatedOn: "2022-03-30T11:15:00Z",
        role: "admin"
    },
    {
        id: 5,
        name: "David Kim",
        phoneNumber: "555-555-7890",
        lastSignedIn: "2022-04-07T09:10:00Z",
        createdOn: "2021-09-01T07:00:00Z",
        updatedOn: "2022-04-07T09:10:00Z",
        role: "user"
    }
];


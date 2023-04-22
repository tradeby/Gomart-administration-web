const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export interface GraphRecord {
    id: string;
    totalAmount: number;
    createdOn: string
}

type GraphDataType = Array<string | number>;

export enum graphTypeEnum {
    user,
    sales
}

export function GetFilteredWeekData(data: GraphRecord[], currentDate: string, type: graphTypeEnum)
    : GraphDataType[] {

    const dayArray: GraphDataType[] = [['Week', 'data']];
    for (let i = 6; i >= 0; i--) {

        const previousDay = new Date(currentDate);
        previousDay.setDate(previousDay.getDate() - i);

        if (type === graphTypeEnum.user) {
            dayArray.push([days[previousDay.getDay()], getMatchedDate(previousDay, data).length]);
        } else if (type === graphTypeEnum.sales) {

            dayArray.push([days[previousDay.getDay()], getMatchedDate(previousDay, data).reduce((sum, rec) => {
                return sum + rec.totalAmount;
            }, 0)]);
        }

        // console.log(record);
    }

    return dayArray;
}

export function GetFilteredMonthData(data: GraphRecord[], currentDate: string, type: graphTypeEnum)
    : GraphDataType[] {
// console.log(data);
    const monthArray: GraphDataType[] = [['Week', 'data']];
    for (let i = 5; i >= 0; i--) {

        const previousMonth = new Date(currentDate);
        previousMonth.setDate(1);// set to first day of the month, fixes bug of having
        // graph.helper.ts:60 previous month Fri Mar 31 2020 04:33:52 GMT+0200 (Eastern European Standard Time)
        // graph.helper.ts:60 previous month Mon Mar 02 2020 04:33:52 GMT+0200 (Eastern European Standard Time)
        previousMonth.setMonth(previousMonth.getMonth() - i);
        // console.log('previous month', previousMonth);
        if (type === graphTypeEnum.user) {
            //dataUsersMonth.push([months[i], users[i]]);
            monthArray.push([months[previousMonth.getMonth()], getMatchedMonth(previousMonth, data).length]);
            //  console.log('sales get month',record)

        } else if (type === graphTypeEnum.sales) {
            //dataUsersMonth.push([months[i], users[i]]);
            monthArray.push([months[previousMonth.getMonth()], getMatchedMonth(previousMonth, data)
                .reduce((sum, rec) => {
                    return sum + rec.totalAmount;
                }, 0)]);

        }

        // console.log(record)
    }

    return monthArray;
}


function getMatchedDate(cDate: Date, data: GraphRecord[])
    : GraphRecord[] {
    return data
        .filter(c =>
            isSameDay(new Date(c.createdOn), cDate) &&
            isSameMonth(new Date(c.createdOn), cDate) &&
            isSameYear(new Date(c.createdOn), cDate)
        );

}

function getMatchedMonth(cDate: Date, data: GraphRecord[])
    : GraphRecord[] {
    return data.filter(c =>
        isSameMonth(new Date(c.createdOn), cDate) &&
        isSameYear(new Date(c.createdOn), cDate)
    );

}

function isSameDay(d: Date, c: Date) {
    return d.getDate() === c.getDate();
}

function isSameMonth(d: Date, c: Date) {
    return d.getMonth() === c.getMonth();
}

function isSameYear(d: Date, c: Date) {
    return d.getFullYear() === c.getFullYear();
}

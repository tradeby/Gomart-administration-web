export function formatToNairaCurrency(number: number): string {
    // Convert number to string
    return  number.toLocaleString("en-NG", {style: "currency", currency: "NGN", minimumFractionDigits: 0});

}

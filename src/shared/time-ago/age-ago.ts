export function formatAgeDateString(dateString: string): string {
    if(dateString) {
        const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ];

        const date = new Date(dateString);
        const currentYear = new Date().getFullYear();
        const yearDifference = currentYear - date.getFullYear();
        const formattedMonth = months[date.getMonth()]?.toUpperCase();
        const formattedDate = String(date.getDate()).padStart(2, "0");
        const formattedYear = String(date.getFullYear());

        return `${yearDifference} years (${formattedDate}-${formattedMonth}-${formattedYear})`;
    }return '';
}

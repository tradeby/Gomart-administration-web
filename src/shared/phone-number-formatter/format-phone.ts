export const formatPhoneNumber = (phoneNumber?: string): string => {
    // Remove all non-numeric characters from the phone number
    if(phoneNumber){
        const cleanedNumber = phoneNumber.replace(/\D/g, "");

        // Format the cleaned phone number as per desired format
        const formattedNumber = `(${cleanedNumber.slice(0, 3)}) ${cleanedNumber.slice(3, 6)}-${cleanedNumber.slice(6)}`;

        return formattedNumber;
    }return '';

};

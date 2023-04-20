import {CustomGlyphProps} from "@atlaskit/icon/types";
import Icon from "@atlaskit/icon";

export const CustomAddIcon = (props: CustomGlyphProps) => (
    <svg width="28"
         height="28"
         viewBox="0 0 28 28"
         data-testid={props['data-testid']}
         aria-label={props['aria-label']}
         className={props.className}>
        <g clip-path="url(#clip0_493_7698)">
            <rect x="0.580078" width="27" height="27" rx="13.5" fill="white" fill-opacity="0.01"/>
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M15.2051 12.375V5.625C15.2051 5.32663 15.0866 5.04048 14.8756 4.8295C14.6646 4.61853 14.3784 4.5 14.0801 4.5C13.7817 4.5 13.4956 4.61853 13.2846 4.8295C13.0736 5.04048 12.9551 5.32663 12.9551 5.625V12.375H6.20508C5.90671 12.375 5.62056 12.4935 5.40958 12.7045C5.1986 12.9155 5.08008 13.2016 5.08008 13.5C5.08008 13.7984 5.1986 14.0845 5.40958 14.2955C5.62056 14.5065 5.90671 14.625 6.20508 14.625H12.9551V21.375C12.9551 21.6734 13.0736 21.9595 13.2846 22.1705C13.4956 22.3815 13.7817 22.5 14.0801 22.5C14.3784 22.5 14.6646 22.3815 14.8756 22.1705C15.0866 21.9595 15.2051 21.6734 15.2051 21.375V14.625H21.9551C22.2534 14.625 22.5396 14.5065 22.7506 14.2955C22.9616 14.0845 23.0801 13.7984 23.0801 13.5C23.0801 13.2016 22.9616 12.9155 22.7506 12.7045C22.5396 12.4935 22.2534 12.375 21.9551 12.375H15.2051ZM3.95508 0H24.2051C25.1002 0 25.9586 0.355579 26.5916 0.988515C27.2245 1.62145 27.5801 2.47989 27.5801 3.375V23.625C27.5801 24.5201 27.2245 25.3786 26.5916 26.0115C25.9586 26.6444 25.1002 27 24.2051 27H3.95508C3.05997 27 2.20153 26.6444 1.56859 26.0115C0.935657 25.3786 0.580078 24.5201 0.580078 23.625L0.580078 3.375C0.580078 2.47989 0.935657 1.62145 1.56859 0.988515C2.20153 0.355579 3.05997 0 3.95508 0V0Z"
                  fill="#007C98"/>
        </g>
        <defs>
            <clipPath id="clip0_493_7698">
                <rect x="0.580078" width="27" height="27" rx="13.5" fill="white"/>
            </clipPath>
        </defs>
    </svg>
);


export const CustomRemoveIcon = (props: CustomGlyphProps) => (
    <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_494_7691)">
            <rect x="18.4141" y="0.839355" width="27" height="27" rx="13.5" transform="rotate(43 18.4141 0.839355)" fill="white" fill-opacity="0.01"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.2939 21.1005L26.9302 20.5545C26.7754 22.4803 25.9182 24.282 24.5215 25.6168C23.1248 26.9516 21.2861 27.7265 19.3553 27.7939C17.4245 27.8613 15.5363 27.2166 14.0499 25.9825C12.5635 24.7483 11.5826 23.0108 11.2939 21.1005ZM11.2783 18.8508C11.5292 17.0109 12.4223 15.3189 13.7997 14.0736C15.1772 12.8283 16.9504 12.1098 18.8062 12.0449C20.662 11.9801 22.481 12.5732 23.9419 13.7194C25.4029 14.8656 26.4118 16.4912 26.7905 18.3091L11.2783 18.8508ZM20.8824 3.1411L35.6923 16.9516C36.3469 17.562 36.7323 18.4075 36.7635 19.3021C36.7947 20.1967 36.4693 21.067 35.8589 21.7216L22.0484 36.5315C21.4379 37.1862 20.5924 37.5715 19.6979 37.6027C18.8033 37.634 17.933 37.3086 17.2783 36.6981L2.46843 22.8877C1.81379 22.2772 1.42847 21.4317 1.39723 20.5371C1.36599 19.6426 1.69139 18.7722 2.30185 18.1176L16.1123 3.30767C16.7228 2.65304 17.5683 2.26771 18.4629 2.23647C19.3574 2.20524 20.2277 2.53064 20.8824 3.1411V3.1411ZM12.1751 27.3246C13.1476 28.2314 14.2891 28.9378 15.5345 29.4034C16.7799 29.8691 18.1049 30.0848 19.4337 30.0384C20.7625 29.992 22.0692 29.6844 23.2791 29.133C24.489 28.5816 25.5785 27.7973 26.4853 26.8248C27.3921 25.8524 28.0985 24.7109 28.5642 23.4655C29.0298 22.22 29.2456 20.8951 29.1992 19.5662C29.1528 18.2374 28.8451 16.9308 28.2937 15.7208C27.7423 14.5109 26.958 13.4215 25.9856 12.5147C24.0217 10.6833 21.4107 9.70706 18.727 9.80078C16.0433 9.89449 13.5068 11.0505 11.6754 13.0144C9.84402 14.9783 8.86781 17.5893 8.96153 20.273C9.05525 22.9566 10.2112 25.4932 12.1751 27.3246Z" fill="#FF5630"/>
        </g>
        <defs>
            <clipPath id="clip0_494_7691">
                <rect x="18.4141" y="0.839355" width="27" height="27" rx="13.5" transform="rotate(43 18.4141 0.839355)" fill="white"/>
            </clipPath>
        </defs>
    </svg>

);

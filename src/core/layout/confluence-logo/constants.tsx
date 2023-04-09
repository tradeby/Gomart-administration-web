import { LogoProps } from './types';

export type { LogoProps };

/**
 * These are the default parameters for LogoProps if the user does not specify values.
 */
export const defaultLogoParams: Partial<LogoProps> = {
    iconColor: 'inherit',
    iconGradientStart: 'inherit',
    iconGradientStop: 'inherit',
    label: '',
    size: 'medium',
    textColor: 'currentColor',
};

/**
 * The props for the <Wrapper /> that takes the svg and turns it into a component.
 */
export type WrapperProps = LogoProps & {
    svg: string | ((a: string, b: string) => string);
};

export const sizes = {
    xsmall: 16,
    small: 24,
    medium: 32,
    large: 40,
    xlarge: 48,
} as const;

/**
 * In order to pass linting rules, these props were renamed to be more descriptive i.e. props renamed to LogoProps and
 * defaultParams to defaultLogoParams. However, this is a breaking change as it is a file with public entry points. The code
 * below is here to keep Logo backwards compatible.
 * See the ticket here: https://product-fabric.atlassian.net/browse/DSP-4086.
 *
 * Note that some consumers are accessing this using like so: import { Props } from '@atlaskit/logo/constants', this should
 * still work despite `LogoProps` being in a different types.tsx file.
 *
 */

/**
 * @deprecated This has been renamed, please import `LogoProps` instead.
 */
export type Props = LogoProps;
/**
 * @deprecated This has been renamed, please import `defaultLogoParams` instead.
 */
export const DefaultProps = defaultLogoParams;

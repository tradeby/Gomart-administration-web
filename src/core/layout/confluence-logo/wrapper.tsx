

import { css, SerializedStyles } from '@emotion/core';

import { sizes, WrapperProps } from './constants';

const CSS_VAR_COLOR = '--logo-color';
const CSS_VAR_FILL = '--logo-fill';

const baseWrapperStyles = css({
    display: 'inline-block',
    position: 'relative',
    color: `var(${CSS_VAR_COLOR})`,
    fill: `var(${CSS_VAR_FILL})`,
    userSelect: 'none',

    '> svg': {
        width: '100%',
        height: '100%',
        position: 'relative',
        top: '0',
        left: '0',
        fill: 'inherit',
    },

    '> canvas': {
        display: 'block',
        height: '100%',
        visibility: 'hidden',
    },
});

const stopColorStyles = css({

    stop: {
        stopColor: 'currentColor',
    },
});

type Size = keyof typeof sizes;
type SizeStyles = Record<Size, SerializedStyles>;
const sizeStyles = Object.entries(sizes).reduce((acc, [key, val]) => {
    acc[key as Size] = css({
        height: `${val}px`,
    });
    return acc;
}, {} as Partial<SizeStyles>) as SizeStyles;

/**
 * __Wrapper__
 *
 * An internal component used by `@atlaskit/logo` to render logo SVGs with correct styles.
 */
const Wrapper = ({
                     label,
                     svg,
                     iconGradientStart,
                     iconGradientStop,
                     size,
                     iconColor,
                     testId: userDefinedTestId,
                     textColor,
                     ...rest
                 }: WrapperProps) => {
    const shouldApplyStopColor =
        iconGradientStart === 'inherit' && iconGradientStop === 'inherit';

    const testId = userDefinedTestId && `${userDefinedTestId}--wrapper`;

    return (
        <span
            css={[
                baseWrapperStyles,
                shouldApplyStopColor && stopColorStyles,
                size && sizeStyles[size],
            ]}
            data-testid={testId}
            style={
                {
                    [CSS_VAR_COLOR]: iconColor,
                    [CSS_VAR_FILL]: textColor,
                } as React.CSSProperties
            }
            aria-label={label ? label : undefined}
            role={label ? 'img' : 'presentation'}
            dangerouslySetInnerHTML={{
                __html:
                    typeof svg === 'function'
                        ? svg(String(iconGradientStart), String(iconGradientStop))
                        : svg,
            }}
            {...rest}
        />
    );
};

export default Wrapper;

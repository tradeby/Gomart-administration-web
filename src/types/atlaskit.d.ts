declare module '@atlaskit/icon/types' {
  export type CustomGlyphProps = any;
}

declare module '@atlaskit/icon' {
  const Icon: any;
  export default Icon;

  export type CustomGlyphProps = any;
}

declare module '@atlaskit/icon/glyph/*' {
  const Icon: any;
  export default Icon;
}

// For FlagsProvider
declare module '@atlaskit/flag' {
  export const FlagsProvider: any;
}

declare module '@atlaskit/flag' {
  export const useFlags: any;
}

declare module '@atlaskit/dynamic-table' {
  const DynamicTable: any;
  export default DynamicTable;
}

declare module '@atlaskit/dynamic-table/types' {
  export type HeadCellType = any;
}

// Atlaskit Pagination
declare module '@atlaskit/pagination' {
  const Pagination: any;
  export default Pagination;
}
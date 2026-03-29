export declare function format(a: number, b?: Math, c?: (typeof Math)['log'], d?: number, e?: number): string;
export declare function metricFormat(a: number, b?: Math, c?: (typeof Math)['log'], d?: number, e?: number): string;
/**
 * Convert human-readable size to bytes.
 *
 * <div>Example:
 * ```javascript
 * parse("50 MB") // 52428800
 * parse("50gb")  // 53687091200
 * parse("50G")   // 53687091200
 * ```
 * </div>
 * @param {String} text
 * @return {Number} how many bytes
 */
export declare function parse(text: string | number): number;

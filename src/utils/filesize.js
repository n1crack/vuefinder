// Sir I cannot understand what is going on with this function, add docs please.
export function format(a, b, c, d, e)  {
    return (b = Math, c = b.log, d = 1024, e = c(a) / c(d) | 0, a / b.pow(d, e)).toFixed(0) + ' ' + (e ? 'KMGTPEZY'[--e] + 'iB' : 'B');
}

export function metricFormat(a, b, c, d, e)  {
    return (b = Math, c = b.log, d = 1000, e = c(a) / c(d) | 0, a / b.pow(d, e)).toFixed(0) + ' ' + (e ? 'KMGTPEZY'[--e]  + 'B' : 'B');
}

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
export function parse(text) {
    const powers = {'k': 1, 'm': 2, 'g': 3, 't': 4};
    const regex = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i;

    const res = regex.exec(text);

    return res[1] * Math.pow(1024, powers[res[2].toLowerCase()]);
}

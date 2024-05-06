// This function formats a given byte size a into a human-readable string with binary prefixes (KiB, MiB, GiB, etc.).
// It calculates the appropriate binary prefix (e.g., KiB for kilobyte) based on the magnitude of the byte size.
// Returns the formatted string with the byte size and its corresponding binary prefix.
 export function format(a, b, c, d, e)  {
    return (b = Math, c = b.log, d = 1024, e = c(a) / c(d) | 0, a / b.pow(d, e)).toFixed(0) + ' ' + (e ? 'KMGTPEZY'[--e] + 'iB' : 'B');
}

// This function formats a given byte size a into a human-readable string with metric prefixes (kB, MB, GB, etc.).
// It calculates the appropriate metric prefix (e.g., kB for kilobyte) based on the magnitude of the byte size.
// Returns the formatted string with the byte size and its corresponding metric prefix.
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

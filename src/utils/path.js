/**
 * @param {string} fullPath
 * @returns {string | undefined} returns the path of the parent directory
 */
export function dirname(fullPath) {
    let [storage, path] = splitPath(fullPath)
    if (!path || path === '/') return storage + '://';
    // Remove trailing slashes
    path = path.replace(/\/+$/, '');
    const index = path.lastIndexOf('/');
    if (index === 0) return storage + '://';
    return storage + ':/' + path.slice(0, index);
}

/**
 * @param {string} fullPath 
 */
export function splitPath(fullPath) {
    const index = fullPath.indexOf(":/")
    if (index === -1) {
        return [undefined, fullPath]
    }
    return [fullPath.slice(0, index), fullPath.slice(index+2) || '/']
}
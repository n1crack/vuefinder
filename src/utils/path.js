/**
 * @param {string} fullPath
 * @returns {string | undefined} returns the path of the parent directory
 */
export function dirname(fullPath) {
    let [storage, path] = fullPath.split(':/')
    if (!path || path === '/') return storage + '://';
    // Remove trailing slashes
    path = path.replace(/\/+$/, '');
    const index = path.lastIndexOf('/');
    if (index === 0) return storage + '://';
    return storage + ':/' + path.slice(0, index);
}
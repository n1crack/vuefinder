export function dirname(fullPath: string): string | undefined {
    const [storage, path] = splitPath(fullPath);
    if (!path || path === '/') return storage + '://';
    const trimmed = path.replace(/\/+$/, '');
    const index = trimmed.lastIndexOf('/');
    if (index === 0) return storage + '://';
    return storage + ':/' + trimmed.slice(0, index);
}

export function splitPath(fullPath: string): [string | undefined, string] {
    const index = fullPath.indexOf(":/");
    if (index === -1) {
        return [undefined, fullPath];
    }
    return [fullPath.slice(0, index), fullPath.slice(index+2) || '/'];
}



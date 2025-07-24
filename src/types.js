/**
 * @typedef {import('./ServiceContainer.js')['default']} ServiceContainer
 * @typedef {ReturnType<ServiceContainer>} App
 * 
 * @typedef {'file' | 'dir'} DirEntryType
 * 
 * @typedef DirEntry
 * @prop {string} basename
 * @prop {string} extension
 * @prop {string} path
 * @prop {string} storage
 * @prop {DirEntryType} type
 * @prop {number | null} file_size
 * @prop {number | null} last_modified
 * @prop {string | null} mime_type 
 * @prop {string} visibility
 * 
 * @typedef {import('./utils/contextmenu').Item} ContextMenuItem
 * 
 * @typedef SelectButton
 * @prop {boolean} active show select button
 * @prop {boolean} multiple allow multiple selection
 * @prop {(items: DirEntry[], event: any) => void} click handle click event
 */

export {}
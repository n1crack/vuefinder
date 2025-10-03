import { h } from 'vue';

// Types
export interface FileItem {
  id: number;
  name: string;
  type: string;
  size: string;
  modified: string;
}

// Icon Components
export const FolderIcon = () => h('svg', {
  class: 'w-full h-full text-yellow-500',
  fill: 'currentColor',
  viewBox: '0 0 20 20'
}, [
  h('path', {d: 'M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z'})
]);

export const ImageIcon = () => h('svg', {
  class: 'w-full h-full text-purple-500',
  fill: 'currentColor',
  viewBox: '0 0 20 20'
}, [
  h('path', {
    'fill-rule': 'evenodd',
    d: 'M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z',
    'clip-rule': 'evenodd'
  })
]);

export const DocumentIcon = () => h('svg', {
  class: 'w-full h-full text-blue-500',
  fill: 'currentColor',
  viewBox: '0 0 20 20'
}, [
  h('path', {
    'fill-rule': 'evenodd',
    d: 'M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z',
    'clip-rule': 'evenodd'
  })
]);

export const VideoIcon = () => h('svg', {
  class: 'w-full h-full text-red-500',
  fill: 'currentColor',
  viewBox: '0 0 20 20'
}, [
  h('path', {d: 'M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm12.553 1.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z'})
]);

export const AudioIcon = () => h('svg', {
  class: 'w-full h-full text-green-500',
  fill: 'currentColor',
  viewBox: '0 0 20 20'
}, [
  h('path', {d: 'M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z'})
]);

// Generate files function
export const generateFiles = (): FileItem[] => {
  const types = ['folder', 'image', 'document', 'video', 'audio'];
  const extensions: Record<string, string[]> = {
    image: ['.jpg', '.png', '.gif', '.svg'],
    document: ['.pdf', '.docx', '.txt', '.xlsx'],
    video: ['.mp4', '.avi', '.mov', '.mkv'],
    audio: ['.mp3', '.wav', '.flac', '.m4a'],
    folder: ['']
  };

  return Array.from({length: 20000}, (_, i) => {
    const type = types[Math.floor(Math.random() * types.length)] as string;
    const ext = type === 'folder' ? '' : extensions[type]![Math.floor(Math.random() * extensions[type]!.length)];

    return {
      id: i,
      name: type === 'folder' ? `Folder ${i + 1}` : `File_${i + 1}${ext}`,
      type,
      size: type === 'folder' ? '--' : `${Math.floor(Math.random() * 10000)}KB`,
      modified: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString()
    };
  });
};

// Get file icon function
export const getFileIcon = (type: string) => {
  const icons: Record<string, () => unknown> = {
    folder: FolderIcon,
    image: ImageIcon,
    document: DocumentIcon,
    video: VideoIcon,
    audio: AudioIcon
  };
  return icons[type] || DocumentIcon;
};

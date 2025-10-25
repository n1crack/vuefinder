import { ref } from 'vue';
import { scanFiles } from '../utils/scanFiles';

export interface ExternalFile {
  name: string;
  size: number;
  type: string;
  lastModified: Date;
  file: File;
}

export function useExternalDragDrop() {
  const isDraggingExternal = ref(false);
  const externalFiles = ref<ExternalFile[]>([]);
  
  const handleDragEnter = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent internal drag handlers from interfering
    
    const items = e.dataTransfer?.items;
    if (items) {
      const hasExternalFiles = Array.from(items).some(item => item.kind === 'file');
      if (hasExternalFiles) {
        isDraggingExternal.value = true;
        // Set a flag to prevent internal drag handling
        (e as any).isExternalDrag = true;
      }
    }
  };

  const handleDragOver = (e: DragEvent) => {
    if (isDraggingExternal.value && e.dataTransfer) {
      e.dataTransfer.dropEffect = 'copy';
      e.preventDefault();
      e.stopPropagation(); // Prevent internal drag handlers from interfering
    }
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    
    // Sadece VueFinder container'ından çıkıldığında false yap
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      isDraggingExternal.value = false;
    }
  };

  const handleDrop = async (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent internal drag handlers from interfering
    isDraggingExternal.value = false;
    
    const items = e.dataTransfer?.items;
    if (items) {
      const fileItems = Array.from(items).filter(item => item.kind === 'file');
      
      if (fileItems.length > 0) {
        externalFiles.value = [];
        
        // Use shared scanFiles utility
        for (const item of fileItems) {
          const getAsEntry = (item as any).webkitGetAsEntry?.();
          if (getAsEntry) {
            // Use scanFiles for folder structure preservation
            await scanFiles((entry: any, file: File) => {
              externalFiles.value.push({
                name: file.name,
                size: file.size,
                type: file.type,
                lastModified: new Date(file.lastModified),
                file: file
              });
            }, getAsEntry);
          } else {
            // Fallback for simple file handling
            const file = item.getAsFile();
            if (file) {
              externalFiles.value.push({
                name: file.name,
                size: file.size,
                type: file.type,
                lastModified: new Date(file.lastModified),
                file: file
              });
            }
          }
        }
        
        return externalFiles.value;
      }
    }
    
    return [];
  };

  const clearExternalFiles = () => {
    externalFiles.value = [];
  };

  return {
    isDraggingExternal,
    externalFiles,
    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    clearExternalFiles
  };
}

import { ref } from 'vue';

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
    
    const items = e.dataTransfer?.items;
    if (items) {
      const hasExternalFiles = Array.from(items).some(item => item.kind === 'file');
      if (hasExternalFiles) {
        isDraggingExternal.value = true;
      }
    }
  };

  const handleDragOver = (e: DragEvent) => {

    
    if (isDraggingExternal.value && e.dataTransfer) {
      e.dataTransfer.dropEffect = 'copy';
      e.preventDefault();
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

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    isDraggingExternal.value = false;
    
    const items = e.dataTransfer?.items;
    if (items) {
      const fileItems = Array.from(items).filter(item => item.kind === 'file');
      
      if (fileItems.length > 0) {
        externalFiles.value = fileItems.map(item => {
          const file = item.getAsFile();
          if (!file) throw new Error('File not found');
          
          return {
            name: file.name,
            size: file.size,
            type: file.type,
            lastModified: new Date(file.lastModified),
            file: file
          };
        });
        
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

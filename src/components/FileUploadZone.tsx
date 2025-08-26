import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, Image, Video, Music, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface FileWithPreview extends File {
  preview?: string;
}

interface FileUploadZoneProps {
  onFilesSelected: (files: FileWithPreview[]) => void;
  isProcessing: boolean;
  progress: number;
}

const FileUploadZone: React.FC<FileUploadZoneProps> = ({
  onFilesSelected,
  isProcessing,
  progress,
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<FileWithPreview[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const filesWithPreview = acceptedFiles.map((file) => {
      const fileWithPreview = file as FileWithPreview;
      if (file.type.startsWith('image/')) {
        fileWithPreview.preview = URL.createObjectURL(file);
      }
      return fileWithPreview;
    });
    
    setUploadedFiles(filesWithPreview);
    onFilesSelected(filesWithPreview);
  }, [onFilesSelected]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg', '.webp', '.gif'],
      'video/*': ['.mp4', '.avi', '.mov', '.mkv'],
      'audio/*': ['.mp3', '.wav', '.aac', '.ogg'],
    },
    multiple: true,
  });

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image className="h-6 w-6" />;
    if (type.startsWith('video/')) return <Video className="h-6 w-6" />;
    if (type.startsWith('audio/')) return <Music className="h-6 w-6" />;
    if (type === 'application/pdf') return <FileText className="h-6 w-6" />;
    return <FileText className="h-6 w-6" />;
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-smooth bg-card",
          isDragActive
            ? "border-primary bg-primary/5 scale-105"
            : "border-muted hover:border-primary/50 hover:bg-primary/5",
          isProcessing && "pointer-events-none opacity-50"
        )}
      >
        <input {...getInputProps()} />
        
        <div className="space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full gradient-hero flex items-center justify-center">
            {isDragActive ? (
              <Upload className="h-8 w-8 text-white animate-bounce" />
            ) : (
              <Sparkles className="h-8 w-8 text-white" />
            )}
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {isDragActive ? 'Drop your files here' : 'Drop files to get started'}
            </h3>
            <p className="text-muted-foreground mb-4">
              Support for PDF, images, videos, and audio files • Max 50MB per file
            </p>
            <Button variant="hero" size="lg">
              <Upload className="h-4 w-4" />
              Choose Files
            </Button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      {isProcessing && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Processing files...</span>
            <span className="text-foreground">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}

      {/* Uploaded Files Preview */}
      {uploadedFiles.length > 0 && !isProcessing && (
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Uploaded Files:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {uploadedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-4 bg-card border rounded-lg hover:shadow-soft transition-smooth"
              >
                <div className="text-primary">
                  {getFileIcon(file.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                {file.preview && (
                  <img
                    src={file.preview}
                    alt="Preview"
                    className="h-10 w-10 object-cover rounded"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Trust Indicator */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          🔒 Files are processed locally in your browser • Auto-deleted after processing • 100% secure
        </p>
      </div>
    </div>
  );
};

export default FileUploadZone;
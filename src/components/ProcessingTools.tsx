import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Zap, 
  FileText, 
  Image, 
  Video, 
  Music, 
  Sparkles, 
  Archive, 
  RefreshCw,
  Eye,
  FileCheck
} from 'lucide-react';

interface ProcessingToolsProps {
  files: File[];
  onProcessFiles: (action: string) => void;
  isProcessing: boolean;
}

const ProcessingTools: React.FC<ProcessingToolsProps> = ({
  files,
  onProcessFiles,
  isProcessing,
}) => {
  const fileTypes = {
    pdf: files.filter(f => f.type === 'application/pdf'),
    image: files.filter(f => f.type.startsWith('image/')),
    video: files.filter(f => f.type.startsWith('video/')),
    audio: files.filter(f => f.type.startsWith('audio/')),
  };

  const tools = [
    // PDF Tools
    {
      category: 'PDF Tools',
      icon: <FileText className="h-5 w-5" />,
      tools: [
        {
          name: 'Compress PDF',
          description: 'Smart PDF compression with AI optimization',
          action: 'compress-pdf',
          icon: <Archive className="h-4 w-4" />,
          variant: 'default' as const,
          enabled: fileTypes.pdf.length > 0,
        },
        {
          name: 'Merge PDFs',
          description: 'Combine multiple PDF files into one',
          action: 'merge-pdfs',
          icon: <RefreshCw className="h-4 w-4" />,
          variant: 'secondary' as const,
          enabled: fileTypes.pdf.length > 1,
        },
        {
          name: 'PDF to Word',
          description: 'Convert PDF to editable Word document',
          action: 'pdf-to-word',
          icon: <FileText className="h-4 w-4" />,
          variant: 'secondary' as const,
          enabled: fileTypes.pdf.length > 0,
        },
        {
          name: 'PDF to Excel',
          description: 'Extract data to Excel-compatible format',
          action: 'pdf-to-excel',
          icon: <FileText className="h-4 w-4" />,
          variant: 'secondary' as const,
          enabled: fileTypes.pdf.length > 0,
        },
        {
          name: 'Extract Text (OCR)',
          description: 'Extract text from scanned PDFs with AI',
          action: 'extract-text',
          icon: <Eye className="h-4 w-4" />,
          variant: 'ai' as const,
          enabled: fileTypes.pdf.length > 0,
        },
        {
          name: 'AI Summarize',
          description: 'Get AI-powered summary of PDF content',
          action: 'summarize-pdf',
          icon: <Sparkles className="h-4 w-4" />,
          variant: 'ai' as const,
          enabled: fileTypes.pdf.length > 0,
        },
      ],
    },
    // Image Tools
    {
      category: 'Image Tools',
      icon: <Image className="h-5 w-5" />,
      tools: [
        {
          name: 'Smart Compress',
          description: 'AI-powered image compression with quality preservation',
          action: 'compress-images',
          icon: <Archive className="h-4 w-4" />,
          variant: 'default' as const,
          enabled: fileTypes.image.length > 0,
        },
        {
          name: 'Convert All Formats',
          description: 'Convert to PNG, JPG, WebP formats',
          action: 'convert-images',
          icon: <RefreshCw className="h-4 w-4" />,
          variant: 'secondary' as const,
          enabled: fileTypes.image.length > 0,
        },
        {
          name: 'Extract Text (OCR)',
          description: 'Extract text from images using advanced AI',
          action: 'extract-text-images',
          icon: <Eye className="h-4 w-4" />,
          variant: 'ai' as const,
          enabled: fileTypes.image.length > 0,
        },
      ],
    },
    // Video Tools
    {
      category: 'Video Tools',
      icon: <Video className="h-5 w-5" />,
      tools: [
        {
          name: 'Extract Audio',
          description: 'Extract audio track as MP3 from video files',
          action: 'extract-audio',
          icon: <Music className="h-4 w-4" />,
          variant: 'default' as const,
          enabled: fileTypes.video.length > 0,
        },
        {
          name: 'Compress Video',
          description: 'Reduce video file size while maintaining quality',
          action: 'compress-video',
          icon: <Archive className="h-4 w-4" />,
          variant: 'secondary' as const,
          enabled: fileTypes.video.length > 0,
        },
      ],
    },
    // Audio Tools
    {
      category: 'Audio Tools',
      icon: <Music className="h-5 w-5" />,
      tools: [
        {
          name: 'Convert Format',
          description: 'Convert between MP3, WAV, AAC formats',
          action: 'convert-audio',
          icon: <RefreshCw className="h-4 w-4" />,
          variant: 'default' as const,
          enabled: fileTypes.audio.length > 0,
        },
        {
          name: 'Compress Audio',
          description: 'Reduce audio file size with smart compression',
          action: 'compress-audio',
          icon: <Archive className="h-4 w-4" />,
          variant: 'secondary' as const,
          enabled: fileTypes.audio.length > 0,
        },
      ],
    },
  ];

  if (files.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Choose Your Tool</h2>
        <p className="text-muted-foreground">
          Select the processing tool you want to apply to your files
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {tools.map((category) => {
          const hasEnabledTools = category.tools.some(tool => tool.enabled);
          
          if (!hasEnabledTools) return null;

          return (
            <Card key={category.category} className="shadow-soft hover:shadow-medium transition-smooth">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  {category.icon}
                  {category.category}
                </CardTitle>
                <CardDescription>
                  Tools available for your uploaded {category.category.toLowerCase()}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {category.tools.map((tool) => (
                  <div
                    key={tool.name}
                    className={`flex items-center justify-between p-4 rounded-lg border transition-smooth ${
                      tool.enabled 
                        ? 'bg-card hover:bg-muted/50 cursor-pointer' 
                        : 'bg-muted/30 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`p-2 rounded-lg ${
                        tool.variant === 'ai' 
                          ? 'gradient-accent text-white' 
                          : 'bg-primary/10 text-primary'
                      }`}>
                        {tool.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground flex items-center gap-2">
                          {tool.name}
                          {tool.variant === 'ai' && (
                            <span className="text-xs gradient-accent text-white px-2 py-1 rounded-full">
                              AI
                            </span>
                          )}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {tool.description}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant={tool.variant}
                      size="sm"
                      disabled={!tool.enabled || isProcessing}
                      onClick={() => onProcessFiles(tool.action)}
                      className="ml-4"
                    >
                      {isProcessing ? (
                        <RefreshCw className="h-4 w-4 animate-spin" />
                      ) : (
                        <FileCheck className="h-4 w-4" />
                      )}
                      Process
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ProcessingTools;
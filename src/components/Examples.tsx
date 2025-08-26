import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  FileText, 
  Image, 
  Video, 
  Music, 
  Sparkles, 
  Archive, 
  RefreshCw,
  Eye,
  Merge,
  Download,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Examples = () => {
  const examples = [
    {
      category: 'PDF Processing',
      icon: <FileText className="h-6 w-6" />,
      color: 'gradient-primary',
      items: [
        'Compress large PDF files by up to 70%',
        'Merge multiple PDFs into one document',
        'Convert PDF to Word/Excel format',
        'Extract text from scanned PDFs using OCR',
        'Generate AI-powered summaries of long documents'
      ]
    },
    {
      category: 'Image Enhancement',
      icon: <Image className="h-6 w-6" />,
      color: 'gradient-secondary',
      items: [
        'Smart compression preserving visual quality',
        'Convert between PNG, JPG, WebP formats',
        'Extract text from images using advanced OCR',
        'Batch process multiple images at once',
        'Optimize images for web use'
      ]
    },
    {
      category: 'Video & Audio',
      icon: <Video className="h-6 w-6" />,
      color: 'gradient-accent',
      items: [
        'Extract audio tracks from video files',
        'Compress videos to reduce file size',
        'Convert audio between MP3, WAV, AAC',
        'Reduce audio file size while maintaining quality',
        'Process multiple media files simultaneously'
      ]
    },
    {
      category: 'AI-Powered Features',
      icon: <Sparkles className="h-6 w-6" />,
      color: 'gradient-hero',
      items: [
        'Advanced OCR with 99%+ accuracy',
        'Intelligent document summarization',
        'Smart compression algorithms',
        'Multi-language text extraction',
        'Context-aware content analysis'
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-foreground">What Can You Do?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore the powerful features available with AI File Assistant. 
          All processing happens in your browser for maximum security.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {examples.map((category, index) => (
          <Card key={index} className="hover:shadow-medium transition-smooth">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${category.color} text-white`}>
                  {category.icon}
                </div>
                {category.category}
              </CardTitle>
              <CardDescription>
                Professional-grade tools for {category.category.toLowerCase()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-card border rounded-2xl p-8 text-center space-y-4">
        <div className="w-16 h-16 rounded-full gradient-hero flex items-center justify-center mx-auto">
          <Shield className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-foreground">Privacy First</h3>
        <p className="text-muted-foreground max-w-lg mx-auto">
          All file processing happens locally in your browser. Your files never leave your device, 
          ensuring complete privacy and security. No servers, no storage, no tracking.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Archive className="h-4 w-4 text-success" />
            <span>Local Processing</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Eye className="h-4 w-4 text-success" />
            <span>No Data Collection</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <RefreshCw className="h-4 w-4 text-success" />
            <span>Auto-Delete After Processing</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Examples;
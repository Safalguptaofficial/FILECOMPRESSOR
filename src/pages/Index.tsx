import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Zap, Shield, Globe, Star, FileText, Download, RefreshCw } from 'lucide-react';
import FileUploadZone from '@/components/FileUploadZone';
import ProcessingTools from '@/components/ProcessingTools';
import Examples from '@/components/Examples';
import { FileProcessor, ProcessedFile } from '@/lib/fileProcessor';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [processedFiles, setProcessedFiles] = useState<ProcessedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState<'upload' | 'process' | 'results' | 'examples'>('upload');
  const [currentAction, setCurrentAction] = useState<string>('');

  const handleFilesSelected = (files: File[]) => {
    setUploadedFiles(files);
    setCurrentStep('process');
    toast({
      title: "Files uploaded successfully!",
      description: `${files.length} file(s) ready for processing.`,
    });
  };

  const handleProcessFiles = async (action: string) => {
    setIsProcessing(true);
    setProgress(0);
    setCurrentAction(action);
    setProcessedFiles([]);

    try {
      const results: ProcessedFile[] = [];
      const totalFiles = uploadedFiles.length;

      for (let i = 0; i < uploadedFiles.length; i++) {
        const file = uploadedFiles[i];
        setProgress((i / totalFiles) * 90);

        let processedFile: ProcessedFile | ProcessedFile[];

        switch (action) {
          case 'compress-pdf':
            if (file.type === 'application/pdf') {
              processedFile = await FileProcessor.compressPDF(file);
              results.push(processedFile);
            }
            break;

          case 'merge-pdfs':
            // Process all PDFs at once for merging
            if (i === 0) {
              const pdfFiles = uploadedFiles.filter(f => f.type === 'application/pdf');
              processedFile = await FileProcessor.mergePDFs(pdfFiles);
              results.push(processedFile);
            }
            break;

          case 'pdf-to-word':
            if (file.type === 'application/pdf') {
              processedFile = await FileProcessor.convertPDFToWord(file);
              results.push(processedFile);
            }
            break;

          case 'pdf-to-excel':
            if (file.type === 'application/pdf') {
              processedFile = await FileProcessor.convertPDFToExcel(file);
              results.push(processedFile);
            }
            break;

          case 'compress-images':
            if (file.type.startsWith('image/')) {
              processedFile = await FileProcessor.compressImage(file);
              results.push(processedFile);
            }
            break;

          case 'convert-images':
            if (file.type.startsWith('image/')) {
              const convertedFiles = await FileProcessor.convertImageFormat(file);
              results.push(...convertedFiles);
            }
            break;

          case 'extract-text':
          case 'extract-text-images':
            if (file.type === 'application/pdf' || file.type.startsWith('image/')) {
              processedFile = await FileProcessor.extractText(file);
              results.push(processedFile);
            }
            break;

          case 'summarize-pdf':
            if (file.type === 'application/pdf') {
              processedFile = await FileProcessor.summarizePDF(file);
              results.push(processedFile);
            }
            break;

          case 'extract-audio':
            if (file.type.startsWith('video/')) {
              processedFile = await FileProcessor.extractAudioFromVideo(file);
              results.push(processedFile);
            }
            break;

          case 'compress-video':
            if (file.type.startsWith('video/')) {
              processedFile = await FileProcessor.compressVideo(file);
              results.push(processedFile);
            }
            break;

          case 'convert-audio':
            if (file.type.startsWith('audio/')) {
              processedFile = await FileProcessor.convertAudio(file);
              results.push(processedFile);
            }
            break;

          case 'compress-audio':
            if (file.type.startsWith('audio/')) {
              processedFile = await FileProcessor.compressAudio(file);
              results.push(processedFile);
            }
            break;

          default:
            // Fallback - just copy the file
            processedFile = {
              name: `processed_${file.name}`,
              blob: new Blob([await file.arrayBuffer()], { type: file.type }),
              size: file.size,
              type: file.type
            };
            results.push(processedFile);
        }

        // Special handling for merge operation (only process once)
        if (action === 'merge-pdfs') break;
      }

      setProgress(100);
      setProcessedFiles(results);
      setCurrentStep('results');

      toast({
        title: "Processing completed!",
        description: `${results.length} file(s) processed successfully using ${getActionDisplayName(action)}.`,
        variant: "default",
      });

    } catch (error) {
      console.error('Processing error:', error);
      toast({
        title: "Processing failed",
        description: error instanceof Error ? error.message : "An error occurred during processing.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadAll = () => {
    if (processedFiles.length === 0) return;

    processedFiles.forEach((file, index) => {
      // Stagger downloads to avoid browser blocking
      setTimeout(() => {
        FileProcessor.downloadFile(file);
      }, index * 200);
    });

    toast({
      title: "Downloads started!",
      description: `${processedFiles.length} file(s) are being downloaded.`,
    });
  };

  const handleDownloadSingle = (file: ProcessedFile) => {
    FileProcessor.downloadFile(file);
    toast({
      title: "Download started!",
      description: `${file.name} is being downloaded.`,
    });
  };

  const resetApp = () => {
    setUploadedFiles([]);
    setProcessedFiles([]);
    setCurrentStep('upload');
    setProgress(0);
    setIsProcessing(false);
    setCurrentAction('');
  };

  const features = [
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "AI-Powered Processing",
      description: "Smart compression, OCR text extraction, and AI summarization"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Lightning Fast",
      description: "Process files instantly in your browser - no waiting for uploads"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "100% Secure",
      description: "Files never leave your device. Complete privacy guaranteed"
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Universal Support",
      description: "PDF, images, videos, audio - all formats supported"
    }
  ];

  const getActionDisplayName = (action: string) => {
    const actionNames: { [key: string]: string } = {
      'compress-pdf': 'PDF Compression',
      'merge-pdfs': 'PDF Merge',
      'pdf-to-word': 'PDF to Word Conversion',
      'pdf-to-excel': 'PDF to Excel Conversion',
      'compress-images': 'Image Compression',
      'convert-images': 'Image Format Conversion',
      'extract-text': 'Text Extraction (OCR)',
      'extract-text-images': 'Text Extraction (OCR)',
      'summarize-pdf': 'AI Summarization',
      'extract-audio': 'Audio Extraction',
      'compress-video': 'Video Compression',
      'convert-audio': 'Audio Format Conversion',
      'compress-audio': 'Audio Compression',
    };
    return actionNames[action] || 'File Processing';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">AI File Assistant</h1>
                <p className="text-xs text-muted-foreground">Compress, Convert & Summarize</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">4.9/5</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-12">
        {/* Hero Section */}
        {currentStep === 'upload' && (
          <>
            <section className="text-center space-y-6 py-12">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-6xl font-bold text-foreground">
                  Your Files,{' '}
                  <span className="gradient-hero bg-clip-text text-transparent">
                    AI-Enhanced
                  </span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Compress, convert, and extract insights from your files using cutting-edge AI. 
                  Fast, secure, and completely free.
                </p>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  variant="hero"
                  size="lg"
                  onClick={() => {
                    if (uploadedFiles.length === 0) {
                      toast({
                        title: "No files uploaded",
                        description: "Please upload a PDF file to use AI Summarizer.",
                        variant: "destructive"
                      });
                    } else {
                      handleProcessFiles('summarize-pdf');
                    }
                  }}
                >
                  <Sparkles className="h-5 w-5" />
                  Try AI Features
                </Button>
                <Button variant="outline" size="lg" onClick={() => setCurrentStep('examples')}>
                  <FileText className="h-5 w-5" />
                  View Examples
                </Button>
              </div>
            </section>

            {/* Features Grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="text-center p-6 hover:shadow-medium transition-smooth">
                  <CardContent className="space-y-4">
                    <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-white mx-auto">
                      {feature.icon}
                    </div>
                    <h3 className="font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </section>
          </>
        )}

        {/* File Upload */}
        {currentStep === 'upload' && (
          <section>
            <FileUploadZone
              onFilesSelected={handleFilesSelected}
              isProcessing={isProcessing}
              progress={progress}
            />
          </section>
        )}

        {/* Processing Tools */}
        {currentStep === 'process' && (
          <section>
            <div className="text-center mb-8">
              <Button variant="ghost" onClick={resetApp}>
                ← Back to Upload
              </Button>
            </div>
            <ProcessingTools
              files={uploadedFiles}
              onProcessFiles={handleProcessFiles}
              isProcessing={isProcessing}
            />
            {isProcessing && (
              <div className="text-center mt-8 space-y-4">
                <div className="inline-flex items-center gap-2 text-muted-foreground">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Processing with {getActionDisplayName(currentAction)}...</span>
                </div>
                <div className="max-w-md mx-auto">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="gradient-primary h-2 rounded-full transition-smooth"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

        {/* Examples Section */}
        {currentStep === 'examples' && (
          <section>
            <div className="text-center mb-8">
              <Button variant="ghost" onClick={() => setCurrentStep('upload')}>
                ← Back to Upload
              </Button>
            </div>
            <Examples />
          </section>
        )}

        {/* Results */}
        {currentStep === 'results' && (
          <section className="space-y-8">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 rounded-full gradient-secondary flex items-center justify-center mx-auto">
                <FileText className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-foreground">Processing Complete!</h2>
              <p className="text-muted-foreground">Your files have been successfully processed and are ready for download.</p>
            </div>

            {/* Processed Files List */}
            {processedFiles.length > 0 && (
              <div className="max-w-4xl mx-auto space-y-4">
                <h3 className="text-xl font-semibold text-foreground text-center">Processed Files</h3>
                <div className="grid gap-4">
                  {processedFiles.map((file, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium text-foreground">{file.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {(file.size / 1024).toFixed(1)} KB • {file.type}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => handleDownloadSingle(file)}
                        >
                          <Download className="h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex justify-center gap-4">
              <Button variant="success" size="lg" onClick={handleDownloadAll}>
                <Download className="h-5 w-5" />
                Download All Files
              </Button>
              <Button variant="outline" size="lg" onClick={resetApp}>
                Process More Files
              </Button>
            </div>

            <div className="text-sm text-muted-foreground text-center">
              Files are processed locally in your browser for maximum security
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t bg-card/50 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <div className="w-6 h-6 rounded gradient-hero flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold text-foreground">AI File Assistant</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Free, fast, and AI-powered file processing. Your privacy is our priority.
            </p>
            <div className="flex justify-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-smooth">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-smooth">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-smooth">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
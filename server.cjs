const express = require('express');
const multer = require('multer');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/compress-pdf', upload.single('file'), (req, res) => {
  console.log('--- Upload Attempt ---');
  console.log('req.file:', req.file);
  console.log('req.body:', req.body);
  const inputPath = req.file?.path;
  const outputPath = path.join('uploads', `compressed_${req.file?.originalname || 'unknown.pdf'}`);

  if (!inputPath) {
    console.error('No file uploaded or multer error:', req.file);
    return res.status(400).send('No file uploaded');
  }

  console.log('Checking input file existence:', inputPath, fs.existsSync(inputPath));

  // Ghostscript command for compression
  const gsCmd = `gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET -dBATCH -sOutputFile=${outputPath} ${inputPath}`;
  console.log('Running Ghostscript command:', gsCmd);

  exec(gsCmd, (err, stdout, stderr) => {
    console.log('Ghostscript stdout:', stdout);
    if (err) {
      console.error('Ghostscript error:', err);
      console.error('Ghostscript stderr:', stderr);
      if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
      return res.status(500).send('Compression failed: ' + (stderr || err.message));
    }
    const outputExists = fs.existsSync(outputPath);
    console.log('Output file existence:', outputPath, outputExists);
    if (!outputExists) {
      console.error('Output file not created:', outputPath);
      if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
      return res.status(500).send('Compression failed: Output file not created');
    }
    res.download(outputPath, (downloadErr) => {
      if (downloadErr) {
        console.error('Download error:', downloadErr);
      }
      if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
      if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
    });
  });
});

app.listen(3000, () => console.log('PDF Compression API running on port 3000'));

const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const mongoose = require('mongoose');
const timeout = require('connect-timeout');
const mime = require('mime');

app.use(express.static(path.join(__dirname, '..', '..', 'client', 'public')));
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use(express.json());
app.use(timeout('120s'));

const dbUri = 'mongodb://localhost:27017/';

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

const userSchema = new mongoose.Schema({
    email: { type: String, requried: true },
    uploadedFiles: [
        {
            fileName: { type: String },
            filePath: { type: String },
            fileType: { type: String },
            fileSize: { type: Number }
        }
    ]
})

const User = mongoose.model('User', userSchema);

const storage = multer.diskStorage({
    destination: path.join(__dirname, '..', 'uploads'),
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const fileExtension = file.originalname.split('.').pop();
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + fileExtension);
    }
})

const upload = multer({ storage: storage });

app.post('/signup', async (req, res) => {

    try {
        const { email } = req.body;
        const user = new User({ email });
        await user.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }

})

app.post('/upload', upload.single('file'), async (req, res) => {

    try {
        const { filename, path: filePath, mimetype: fileType, size: fileSize } = req.file;
        const userEmail = req.query.email;

        const fileObject = {
            fileName: filename,
            filePath: filePath,
            fileType: fileType,
            fileSize: fileSize,
        }

        await User.updateOne(
            { email: userEmail },
            { $push: { uploadedFiles: fileObject } }
        );

        res.send(`
            <script>
                alert('File uploaded successfully!');
                window.location.href = '/upload-page';
            </script>
        `);
    } catch (err) {
        console.log('Error uploading file: ', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }

})

app.get('/uploaded-files', async (req, res) => {
    const userEmail = req.query.email;

    try {
        const user = await User.findOne({ email: userEmail }).exec();

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const uploadedFiles = user.uploadedFiles.map((file) => ({
            name: file.fileName,
            url: file.filePath,
        }));

        res.json(uploadedFiles);
    } catch (err) {
        console.log('Error retrieving user from database', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/stream/:fileName', (req, res) => {
    const fileName = req.params.fileName;
    const filePath = path.join(__dirname, '..', 'uploads', fileName);

    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunksize = (end - start) + 1;
        const file = fs.createReadStream(filePath, { start, end });
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': mime.getType(filePath),
        };

        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': mime.getType(filePath),
        };

        res.writeHead(200, head);
        fs.createReadStream(filePath).pipe(res);
    }
});


app.get('/download/:filename', (req, res) => {
    const fileName = req.params.filename;
    const filePath = path.join(__dirname, '..', 'uploads', fileName);

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).send('File not found');
        }

        res.download(filePath, (err) => {
            if (err) {
                req.status(500).send('Error downloading file');
            }
        })
    })
})

app.delete('/delete-file/:filename', async (req, res) => {
    try {
        const { filename } = req.params;
        const filePath = path.join(__dirname, '..', 'uploads', filename);

        await fs.promises.unlink(filePath);

        const userEmail = req.query.email;
        const user = await User.findOneAndUpdate(
            { email: userEmail },
            { $pull: { uploadedFiles: { fileName: filename } } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        console.log('File deleted:', filename);
        res.json({ success: true, message: 'File deleted' });
    } catch (err) {
        console.log('Error deleting file:', err);
        res.status(500).json({ success: false, message: 'Error deleting file' });
    }
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'client', 'public'));
})

const port = 8000;

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
})
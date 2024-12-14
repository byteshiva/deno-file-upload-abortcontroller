// public/static/main.js
import { uploadFile, cancelUpload } from './fileUpload.js';

const fileInput = document.getElementById('fileInput');
const uploadButton = document.getElementById('uploadButton');
const cancelButton = document.getElementById('cancelButton');

uploadButton.addEventListener('click', async () => {
    const file = fileInput.files[0];
    uploadFile(file);
});

cancelButton.addEventListener('click', () => {
    cancelUpload();
});

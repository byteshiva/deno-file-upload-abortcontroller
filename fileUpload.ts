// fileUpload.ts
let controller = new AbortController();

export function uploadFile(file: File) {
    controller = new AbortController();
    const signal = controller.signal;

    const formData = new FormData();
    formData.append('file', file);

    fetch('http://localhost:8000/upload', {
        method: 'POST',
        body: formData,
        signal
    })
        // .then(response => response.json())
        .then(response => response)
        .then(data => {
            console.log('Upload successful:', data);
        })
        .catch(error => {
            if (error.name === 'AbortError') {
                console.log('Upload aborted');
            } else {
                console.error('Upload error:', error);
            }
        });
}

// Example usage
const fileInput = document.querySelector('input[type="file"]');
fileInput.addEventListener('change', (event) => {
    const file = (event.target as HTMLInputElement).files[0];
    uploadFile(file);
});

// To cancel the upload
export function cancelUpload() {
    controller.abort();
}

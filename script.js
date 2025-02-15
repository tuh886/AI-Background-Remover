const API_KEY = 'ooZEjvEAEyY7SEDqnReDhWj2';
const API_URL = 'https://api.remove.bg/v1.0/removebg';

document.addEventListener('DOMContentLoaded', function() {
    console.log('Website loaded successfully');
    const processButton = document.getElementById('processButton');
    const loadingAnimation = document.getElementById('loadingAnimation');

    processButton.addEventListener('click', function() {
        const fileInput = document.getElementById('imageUpload');
        if (fileInput.files.length === 0) {
            alert('Please upload an image first.');
            return;
        }

        // লোডিং অ্যানিমেশন দেখান
        loadingAnimation.style.display = 'block';

        const file = fileInput.files[0];
        const formData = new FormData();
        formData.append('image_file', file);

        fetch(API_URL, {
            method: 'POST',
            headers: {
                'X-Api-Key': API_KEY,
            },
            body: formData,
        })
        .then(response => response.blob())
        .then(blob => {
            const url = URL.createObjectURL(blob);
            document.getElementById('processedImg').src = url;
            document.getElementById('downloadButton').onclick = () => {
                const a = document.createElement('a');
                a.href = url;
                a.download = 'processed-image.png';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            };
        })
        .catch(error => console.error('Error:', error))
        .finally(() => {
            // লোডিং অ্যানিমেশন লুকান
            loadingAnimation.style.display = 'none';
        });
    });

    document.getElementById('imageUpload').addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('originalImg').src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // ইমেজ ব্যাকগ্রাউন্ড রিমুভ করার জন্য একটি ফাংশন
    function removeImageBackground(imageElement) {
        // এখানে আপনার ব্যাকগ্রাউন্ড রিমুভ করার লজিক যোগ করুন
        // উদাহরণস্বরূপ, আপনি একটি API কল করতে পারেন যা ব্যাকগ্রাউন্ড রিমুভ করে
        console.log("Background removal function called for", imageElement);
    }

    // ইমেজ লোড হলে ফাংশন কল করুন
    document.querySelectorAll('img').forEach(img => {
        img.onload = () => removeImageBackground(img);
    });
});
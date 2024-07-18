function generateShortUrl() {
    const originalUrl = document.getElementById('originalUrl').value;
    const shortUrl = document.getElementById('shortUrl');

    if (originalUrl) {
        fetch('/generate-short-url', {
            method: 'POST',
            body: JSON.stringify({ originalUrl }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.text())
        .then(data => {
            shortUrl.textContent = "生成的短链接: " + data;
        })
        .catch(error => {
            console.error('Error:', error);
            shortUrl.textContent = "生成短链接失败";
        });
    } else {
        shortUrl.textContent = "请输入原始URL";
    }
}

function generateShortUrl() {
    const originalUrl = document.getElementById('originalUrl').value;
    const shortUrl = document.getElementById('shortUrl');

    if (originalUrl) {
        const fakeShortUrl = `https://vipm01.github.io/${encodeURIComponent(originalUrl)}`;
        shortUrl.textContent = "生成的短链接: " + fakeShortUrl;
    } else {
        shortUrl.textContent = "请输入原始URL";
    }
}

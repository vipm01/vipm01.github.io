document.addEventListener('DOMContentLoaded', function() {
    fetch('/redirect-url.txt')
    .then(response => response.text())
    .then(url => {
        if (url) {
            setTimeout(function() {
                window.location.href = url;
            }, 1000); // 延迟3秒后跳转
        } else {
            console.error('No URL found in redirect-url.txt');
        }
    })
    .catch(error => {
        console.error('Error fetching redirect URL:', error);
    });
});

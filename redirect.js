document.addEventListener('DOMContentLoaded', function() {
    fetch('/redirect-url.txt')
    .then(response => response.text())
    .then(url => {
        if (url) {
            // 检查是否在 QQ 浏览器中访问
            if (navigator.userAgent.match(/QQBrowser/i)) {
                // 使用外部浏览器打开 URL
                window.open(url, '_blank');
            } else {
                // 延迟3秒后在当前窗口跳转
                setTimeout(function() {
                    window.location.href = url;
                }, 1000);
            }
        } else {
            console.error('No URL found in redirect-url.txt');
        }
    })
    .catch(error => {
        console.error('Error fetching redirect URL:', error);
    });
});

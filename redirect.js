document.addEventListener('DOMContentLoaded', function() {
    fetch('/redirect-url.txt')
    .then(response => response.text())
    .then(url => {
        if (url) {
            // 检查是否在 QQ 浏览器中访问
            if (navigator.userAgent.match(/QQBrowser/i) || navigator.userAgent.match(/Mobile/i)) {
                // 在 QQ 浏览器或移动设备中访问时，直接在当前窗口跳转
                window.location.href = url;
            } else {
                // 非 QQ 浏览器，延迟3秒后在当前窗口跳转
                setTimeout(function() {
                    window.location.href = url;
                }, 3000); // 延迟3秒后跳转
            }
        } else {
            console.error('No URL found in redirect-url.txt');
        }
    })
    .catch(error => {
        console.error('Error fetching redirect URL:', error);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    fetch('/https://qq.com')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(url => {
        if (url) {
            // 检查是否在 QQ 浏览器中访问
            if (navigator.userAgent.match(/QQBrowser/i)) {
                // 尝试使用 setTimeout 延迟跳转，绕过 QQ 浏览器的拦截
                console.log('Detected QQ Browser, redirecting in 1.5 seconds...');
                setTimeout(function() {
                    window.location.href = url;
                }, 1500); // 延迟1.5秒后跳转
            } else {
                // 非 QQ 浏览器，直接跳转
                console.log('Non-QQ Browser detected, redirecting immediately...');
                window.location.href = url;
            }
        } else {
            console.error('No URL found in redirect-url.txt');
        }
    })
    .catch(error => {
        console.error('Error fetching redirect URL:', error);
    });
});

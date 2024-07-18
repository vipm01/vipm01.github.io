document.addEventListener('DOMContentLoaded', function() {
    fetch('/redirect-url.txt')
    .then(response => response.text())
    .then(url => {
        window.location.href = url;
    })
    .catch(error => {
        console.error('Error fetching redirect URL:', error);
    });
});

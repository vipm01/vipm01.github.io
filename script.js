const urlsFile = 'urls.json';

async function shortenURL() {
    const urlInput = document.getElementById('urlInput').value;
    const shortenedURLDisplay = document.getElementById('shortenedURL');
    
    if (!urlInput) {
        alert('Please enter a URL');
        return;
    }
    
    const response = await fetch(urlsFile);
    const urls = await response.json();

    const shortCode = generateShortCode();
    urls[shortCode] = urlInput;

    await saveURLs(urls);

    const shortenedURL = `https://vipm01.github.io/${shortCode}`;
    shortenedURLDisplay.innerHTML = `Shortened URL: <a href="${shortenedURL}" target="_blank">${shortenedURL}</a>`;
}

function generateShortCode() {
    return Math.random().toString(36).substring(2, 8);
}

async function saveURLs(urls) {
    const githubUsername = 'vipm01';
    const repoName = 'vipm01.github.io';
    const filePath = 'urls.json';
    const token = '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'; // 请替换为你的 GitHub 个人访问令牌

    const response = await fetch(`https://api.github.com/repos/${githubUsername}/${repoName}/contents/${filePath}`, {
        headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json'
        }
    });
    
    const fileData = await response.json();
    const updatedContent = btoa(JSON.stringify(urls, null, 2));
    const updateResponse = await fetch(`https://api.github.com/repos/${githubUsername}/${repoName}/contents/${filePath}`, {
        method: 'PUT',
        headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json'
        },
        body: JSON.stringify({
            message: 'Update URLs',
            content: updatedContent,
            sha: fileData.sha
        })
    });

    if (!updateResponse.ok) {
        alert('Failed to save the URL');
    }
}

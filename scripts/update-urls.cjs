const path = require('path');
const fetch = require('node-fetch');



const githubUsername = 'vipm01';
const repoName = 'vipm01.github.io';
const filePath = 'urls.json';

const githubToken = process.env.GH_TOKEN;

async function saveURLs(urls) {
    try {
        const response = await fetch(`https://api.github.com/repos/${githubUsername}/${repoName}/contents/${filePath}`, {
            headers: {
                'Authorization': `token ${githubToken}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        const fileData = await response.json();
        const updatedContent = Buffer.from(JSON.stringify(urls, null, 2)).toString('base64');

        const updateResponse = await fetch(`https://api.github.com/repos/${githubUsername}/${repoName}/contents/${filePath}`, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${githubToken}`,
                'Accept': 'application/vnd.github.v3+json'
            },
            body: JSON.stringify({
                message: 'Update URLs',
                content: updatedContent,
                sha: fileData.sha
            })
        });

        return updateResponse.ok;
    } catch (error) {
        console.error('Error saving URLs:', error);
        return false;
    }
}

const urls = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

const shortCode = Math.random().toString(36).substring(2, 8);
urls[shortCode] = process.argv[2];

saveURLs(urls).then(success => {
    if (success) {
        console.log(`Shortened URL: https://vipm01.github.io/${shortCode}`);
    } else {
        console.error('Failed to save the URL');
    }
});

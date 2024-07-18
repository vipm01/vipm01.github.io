const fetch = require('node-fetch');
const fs = require('fs');

const githubUsername = 'vipm01';
const repoName = 'vipm01.github.io';
const filePath = 'urls.json';
const githubToken = process.env.GH_TOKEN; // 从GitHub Actions环境变量中获取令牌

async function saveURLs(urls) {
    try {
        // 获取现有文件的 SHA 值
        const response = await fetch(`https://api.github.com/repos/${githubUsername}/${repoName}/contents/${filePath}`, {
            headers: {
                'Authorization': `token ${githubToken}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        const fileData = await response.json();
        const updatedContent = Buffer.from(JSON.stringify(urls, null, 2)).toString('base64');

        // 更新文件内容
        const updateResponse = await fetch(`https://api.github.com/repos/${githubUsername}/${repoName}/contents/${filePath}`, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${githubToken}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: 'Update URLs via GitHub Actions',
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

// 从命令行参数中获取要缩短的 URL
const urlToShorten = process.argv[2];

if (!urlToShorten) {
    console.error('No URL provided.');
    process.exit(1);
}

// 读取当前的 urls.json 文件
let urls = {};
try {
    urls = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
} catch (error) {
    console.error('Error reading URLs file:', error);
    process.exit(1);
}

// 生成一个新的短链接并保存
const shortCode = Math.random().toString(36).substring(2, 8);
urls[shortCode] = urlToShorten;

// 保存更新后的 urls.json 文件
saveURLs(urls).then(success => {
    if (success) {
        console.log(`Shortened URL: https://vipm01.github.io/${shortCode}`);
    } else {
        console.error('Failed to save the URL');
    }
});

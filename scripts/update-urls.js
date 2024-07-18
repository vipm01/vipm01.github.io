const path = require('path');
const fetch = require(path.join(__dirname, 'node_modules', 'node-fetch'));


const githubUsername = 'vipm01'; // GitHub 用户名
const repoName = 'vipm01.github.io'; // GitHub Pages 所在的仓库名称
const filePath = 'urls.json'; // 存储 URL 映射的文件路径，位于仓库根目录

const githubToken = process.env.GH_TOKEN; // 从环境变量中获取 GitHub 个人访问令牌

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

// 读取当前的 urls.json
const urls = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

// 生成一个新的短链接并保存
const shortCode = Math.random().toString(36).substring(2, 8);
urls[shortCode] = process.argv[2]; // 从命令行参数中获取要缩短的 URL

saveURLs(urls).then(success => {
    if (success) {
        console.log(`Shortened URL: https://vipm01.github.io/${shortCode}`);
    } else {
        console.error('Failed to save the URL');
    }
});

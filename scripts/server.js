const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const githubUsername = 'vipm01'; // GitHub 用户名
const repoName = 'vipm01.github.io'; // GitHub Pages 所在的仓库名称
const filePath = 'urls.json'; // 存储 URL 映射的文件路径，位于仓库根目录

const githubToken = process.env.GH_TOKEN; // 从环境变量中获取 GitHub 个人访问令牌

app.post('/api/shorten', async (req, res) => {
    const { url } = req.body;

    try {
        // 发送 GitHub Actions 的触发请求
        const response = await fetch(`https://api.github.com/repos/${githubUsername}/${repoName}/dispatches`, {
            method: 'POST',
            headers: {
                'Authorization': `token ${githubToken}`,
                'Accept': 'application/vnd.github.everest-preview+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                event_type: 'update-urls',
                client_payload: {
                    url: url
                }
            })
        });

        if (response.ok) {
            res.json({ success: true, message: 'Shortening request sent to GitHub Actions' });
        } else {
            throw new Error('Failed to send GitHub Actions request');
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Failed to send GitHub Actions request' });
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

const fs = require('fs').promises;
const axios = require('axios');
const crypto = require('crypto');
const path = require('path');

const { GITHUB_TOKEN, REPO_NAME, USERNAME } = process.env;

async function generateShortUrl() {
  try {
    // Read existing URLs from urls.txt
    let urls = await fs.readFile('urls.txt', 'utf8');
    urls = urls.split('\n').filter(url => url.trim() !== '');

    // Generate a new short URL
    const newShortCode = crypto.randomBytes(6).toString('hex');
    const newUrl = `https://${USERNAME}.github.io/${newShortCode}`;
    urls.push(newUrl);

    // Update urls.txt
    await fs.writeFile('urls.txt', urls.join('\n'));

    // Update GitHub repository file
    const response = await axios.put(`https://api.github.com/repos/${USERNAME}/${REPO_NAME}/contents/urls.txt`, {
      message: 'Update URLs',
      content: Buffer.from(urls.join('\n')).toString('base64')
    }, {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    console.log(`New short URL generated: ${newUrl}`);
    return newUrl;
  } catch (error) {
    console.error('Error generating short URL:', error);
    throw error;
  }
}

(async () => {
  try {
    const newUrl = await generateShortUrl();
    process.stdout.write(newUrl + '\n');
  } catch (error) {
    process.stderr.write('Error generating short URL\n');
  }
})();

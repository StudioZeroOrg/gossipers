const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3001;

app.use(bodyParser.json());

app.post('/github-webhook', (req, res) => {
    const event = req.headers['x-github-event'];
    const payload = req.body;

    console.log(`Received GitHub Event: ${event}`);

    // Log the event for micro-documentation
    const logEntry = `[${new Date().toISOString()}] Event: ${event}, Action: ${payload.action}, Repo: ${payload.repository?.full_name}\n`;
    fs.appendFileSync(path.join(__dirname, 'webhook.log'), logEntry);

    // Filter for Issues or Issue Comments
    if (event === 'issues' || event === 'issue_comment') {
        const repoName = payload.repository.name;
        const issueNumber = payload.issue.number;
        const body = payload.comment ? payload.comment.body : payload.issue.body;
        const user = payload.sender.login;

        // Skip if the bot itself made the comment to avoid infinite loops
        if (user.includes('[bot]') || user === 'anima-regem') {
            return res.status(200).send('Ignored bot action');
        }

        console.log(`Triggering reaction for issue #${issueNumber} in ${repoName}`);

        // Logic to "spin up" corresponding bots via OpenClaw system event
        // We'll create a trigger file that the main loop can pick up or use 'openclaw wake'
        const triggerMessage = `GITHUB_TRIGGER: ${event} on ${repoName} #${issueNumber} by ${user}. Content: ${body}`;
        
        // Append to a global triggers file for the Manager to audit
        fs.appendFileSync(path.join(__dirname, '../GHTRIGGERS.md'), `- ${triggerMessage}\n`);
    }

    res.status(200).send('OK');
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Webhook server listening at http://64.227.184.138:${port}/github-webhook`);
});

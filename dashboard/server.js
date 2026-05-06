const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    // We will read the latest STATUS.md or a custom JSON for the dashboard
    const statusPath = path.join(__dirname, '../status/STATUS.md');
    const gossipPath = path.join(__dirname, '../gossipers/history.md');
    let content = "<h1>Dashboard Loading...</h1>";
    
    let markdown = "";
    if (fs.existsSync(statusPath)) markdown = fs.readFileSync(statusPath, 'utf8');
    
    let gossip = "";
    if (fs.existsSync(gossipPath)) gossip = fs.readFileSync(gossipPath, 'utf8');

    content = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>StudioZero Dashboard</title>
            <style>
                body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; line-height: 1.6; padding: 40px; max-width: 1000px; margin: auto; background: #f6f8fa; color: #1f2328; }
                .card { background: white; border: 1px solid #d0d7de; border-radius: 6px; padding: 32px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 24px; }
                pre { background: #f6f8fa; padding: 16px; border-radius: 6px; overflow: auto; white-space: pre-wrap; font-size: 14px; border: 1px solid #d0d7de; }
                h1 { border-bottom: 1px solid #d0d7de; padding-bottom: 8px; }
                .status-tag { display: inline-block; padding: 2px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; background: #2da44e; color: white; }
                .gossip-tag { background: #bf3989; }
            </style>
        </head>
        <body>
            <div class="card">
                <h1>📟 System Status</h1>
                <div class="status-tag">LIVE</div>
                <pre>${markdown}</pre>
            </div>
            <div class="card">
                <h1>🗣️ Eternal Gossiper History</h1>
                <div class="status-tag gossip-tag">GOSSIP</div>
                <pre>${gossip || "No gossip logged yet."}</pre>
            </div>
        </body>
        </html>
    `;

    res.send(content);
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Dashboard running at http://64.227.184.138:${port}`);
});

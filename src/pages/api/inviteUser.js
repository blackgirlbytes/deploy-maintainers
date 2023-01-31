import { Octokit } from "octokit";
const { createAppAuth } = require("@octokit/auth-app");
// make a put request to the github api to invite user to repository
export default async function handler(req, res) {
  const { username } = req.body;

  const appOctokit = new Octokit({
    authStrategy: createAppAuth,
    auth: {
      appId: process.env.APP_ID,
      privateKey:process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
      oauth: {
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
      },
      webhooks: {
        secret: process.env.WEBHOOK_SECRET,
      },
      installationId: process.env.INSTALLATION_ID
    },
  });

  try {
    const response = await appOctokit.request(
      "PUT /repos/{owner}/{repo}/collaborators/{username}",
      {
        owner: process.env.GITHUB_OWNER_FOR_MEMBER_REPO,
        repo: process.env.GITHUB_MEMBER_REPO,
        username: username,
        permission: "read"
      }
    );
    
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
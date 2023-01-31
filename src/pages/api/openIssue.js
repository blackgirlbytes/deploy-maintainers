import { Octokit  } from "octokit";

const { createAppAuth } = require("@octokit/auth-app");
// make a put request to the github api to invite user to repository
export default async function handler(req, res) {
  const { username, reason, repoName, repoURL } = req.body;


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

   const body = `## Who is requesting to join the repo? \n @${username} \n ## What project do they maintain? \n ${repoName} \n ## What is the repository URL for the project? \n https://github.com/${repoURL} \n ## Why do they want to join? \n ${reason}`;
      const response = await appOctokit.request("POST /repos/{owner}/{repo}/issues", {
        owner: process.env.GITHUB_OWNER_FOR_MEMBER_REPO,
        repo: process.env.GITHUB_MEMBER_REPO,
        labels: ["pending-invitation"],
        title: `Pending invitation request for: @${username}`,
        body: body,
      })

    res.status('200').json({message: 'success'})
  } catch (error) {
    res.status('500').json({message: 'error'})
    console.log(error)
  }
}
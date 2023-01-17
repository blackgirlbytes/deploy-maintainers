import { Octokit } from "octokit";

// make a put request to the github api to invite user to repository
export default async function handler(req, res) {
  const { username, reason, repoName, repoURL } = req.body;

  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN_FOR_ISSUES_REPO,
  });
  const body = `## Who is requesting to join the repo? \n @${username} \n ## What project do they maintain? \n ${repoName} \n ## What is the repository URL for the project? \n https://github.com/${repoURL} \n ## Why do they want to join? \n ${reason}`;
  try {
    const response = await octokit.request("POST /repos/{owner}/{repo}/issues", {
        owner: process.env.GITHUB_OWNER_FOR_MEMBER_REPO,
        repo: process.env.GITHUB_MEMBER_REPO,
        labels: ["pending-invitation"],
        title: `Pending invitation request for: @${username}`,
        body: body,
      })

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
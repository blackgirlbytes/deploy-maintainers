import { Octokit } from "octokit";

// make a put request to the github api to invite user to repository
export default async function handler(req, res) {
  const { username } = req.body;

  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN_FOR_ISSUES_REPO,
  });

  try {
    const response = await octokit.request(
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
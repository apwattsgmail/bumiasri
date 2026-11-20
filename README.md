# Bumi Asri Community Website

A lightweight, responsive community website designed for GitHub Pages. It includes sample news, events, organisation information and a feedback form that can create a pre-filled GitHub Issue.

## Configure

Edit `config.js` and set:

- `githubOwner`: the GitHub account or organisation name
- `githubRepository`: the repository name
- `contactEmail`: the public contact email

Replace all content marked â€œSampleâ€ in `index.html` with approved community information before announcing the site.

## Publish with GitHub Pages

1. Create a public GitHub repository and upload these files to its `main` branch.
2. In the repository, open **Settings â†’ Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the `main` branch and `/ (root)`, then save.
5. In **Settings â†’ General â†’ Features**, enable Issues so the feedback form can prepare submissions.

GitHub will show the public website address in the Pages settings after deployment.

## Feedback privacy

GitHub Issues are public in a public repository. If feedback should remain private, replace the feedback handler with a private form service before launch.


# Create the hosted repository — lead

## Current status

The public hosted repository exists at `https://github.com/Chi944/memepet`.
The verified L0 baseline is on `chore/l0-foundation`. Collaborator invitations
are still the lead's responsibility and have not been recorded as sent.

## If you need to recreate or inspect the repository

1. Sign in to the GitHub account that should own the project. Open **+ → New repository**.
2. Set the repository name **memepet**, choose visibility, and use the description
   **MemePet — X Layer meme-community companion app.**
3. Leave automatic README, .gitignore, and license initialization off if the local
   starter already supplies those files. If the name is already taken in this account,
   inspect that repository rather than deleting or overwriting it.
4. Preserve README.md, AGENTS.md, and CLAUDE.md at the repository root, including hidden
   `.gitignore`, `.gitattributes`, and `.github`. Never upload a local `.git` directory.
5. Open **Settings → Collaborators → Add people**. Invite Teammate A and Teammate B using
   their actual GitHub usernames or verified emails. They must accept. Role labels in
   this kit do not identify GitHub accounts.
6. In ChatGPT's GitHub app settings, authorize this repository if the connection is
   restricted to selected repositories. Each teammate uses their own account/connection
   when needed; sharing a project is not a transfer of GitHub access.

## Initial local development

Clone the repository in your chosen editor. The lead runs L0 first; Teammate A and
Teammate B can read their packs and prepare copy/art until a verified baseline is merged.
Each person uses their own checkout and task branch. Do not copy a teammate's `.env` or
share a signing wallet.

## Sources

GitHub repository creation:
https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository

Uploading files:
https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository

Inviting collaborators:
https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/repository-access-and-collaboration/inviting-collaborators-to-a-personal-repository

GitHub CLI create:
https://cli.github.com/manual/gh_repo_create

ChatGPT GitHub connection:
https://help.openai.com/en/articles/11145903-connecting-github-to-chatgpt

# Deploy ABHA Healthcare Demo to GitHub Pages

Your ABHA Healthcare Login Demo is now ready to be deployed on GitHub Pages! Here's how to set it up:

## Quick Setup Steps

### 1. Create a GitHub Repository
1. Go to [GitHub](https://github.com) and create a new repository
2. Give it a name (e.g., `abha-healthcare-demo`)
3. Make it public (required for free GitHub Pages)
4. Don't initialize with README, .gitignore, or license

### 2. Push Your Code
```bash
git init
git add .
git commit -m "Initial commit: ABHA Healthcare Demo"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### 3. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **GitHub Actions**
5. The workflow will automatically run and deploy your site

### 4. Update Base URL (if needed)
If your repository name is not your main GitHub Pages site:
1. Edit `vite.config.pages.ts`
2. Change `base: "/"` to `base: "/your-repo-name/"`
3. Commit and push the change

## Build Commands

Since package.json cannot be modified, use these commands:

- **Build for GitHub Pages**: `npx vite build --config vite.config.pages.ts`
- **Preview locally**: `npx vite preview --config vite.config.pages.ts`

## What's Already Set Up

✅ **GitHub Actions Workflow**: Automatically builds and deploys on every push to main  
✅ **Static Build Configuration**: Optimized for GitHub Pages hosting  
✅ **SEO Ready**: Title and meta description included  
✅ **No Backend Dependencies**: Uses mock authentication (OTP: 123456)  
✅ **Clean HTML**: Replit-specific scripts removed  

## Demo Credentials

Your deployed app will work with these test credentials:

- **ABHA Number**: Any 14-digit number (e.g., `12345678901234`)
- **Email**: Any valid email format (e.g., `test@example.com`)
- **Phone**: Any phone number format (e.g., `+1234567890`)
- **OTP**: `123456` (hardcoded for demo)

## Access Your Site

Once deployed, your site will be available at:
- `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

The GitHub Actions workflow runs automatically on every push to the main branch, so updates are deployed instantly!

## Troubleshooting

- **404 Errors**: Make sure the base URL in `vite.config.pages.ts` matches your repository name
- **Build Fails**: Check the Actions tab in your GitHub repository for error details
- **CSS Not Loading**: Verify the base path is correctly set for your repository structure
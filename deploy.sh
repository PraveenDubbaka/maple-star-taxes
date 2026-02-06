#!/bin/bash

# Maple Star Taxes - GitHub Pages Deployment Script
# Run this script to deploy to GitHub Pages

echo "🍁 Maple Star Taxes - GitHub Pages Deployment"
echo "=============================================="
echo ""

# Check if GitHub repository is configured
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "❌ No GitHub repository configured!"
    echo ""
    echo "Please follow these steps:"
    echo ""
    echo "1. Go to https://github.com and create a new repository named: maple-star-taxes"
    echo "   - Make it public (required for free GitHub Pages)"
    echo "   - Don't initialize with README, .gitignore, or license"
    echo ""
    echo "2. Run this command to link your repository:"
    echo "   git remote add origin https://github.com/YOUR_USERNAME/maple-star-taxes.git"
    echo ""
    echo "3. Run this script again"
    exit 1
fi

echo "✅ GitHub repository configured"
echo ""
echo "📤 Pushing to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Code pushed successfully!"
    echo ""
    echo "🚀 Deploying to GitHub Pages..."
    npm run deploy
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "=============================================="
        echo "✅ DEPLOYMENT SUCCESSFUL!"
        echo "=============================================="
        echo ""
        echo "Your website will be available at:"
        REPO_URL=$(git remote get-url origin)
        USERNAME=$(echo $REPO_URL | sed -n 's/.*github.com[:/]\([^/]*\)\/.*/\1/p')
        echo "🌐 https://${USERNAME}.github.io/maple-star-taxes/"
        echo ""
        echo "⏰ Note: It may take 2-5 minutes for changes to appear"
        echo ""
        echo "Next steps:"
        echo "1. Go to https://github.com/${USERNAME}/maple-star-taxes/settings/pages"
        echo "2. Ensure 'Source' is set to 'gh-pages' branch"
        echo "3. Wait a few minutes and visit your site!"
        echo ""
    else
        echo "❌ Deployment failed. Check errors above."
        exit 1
    fi
else
    echo "❌ Push failed. Check errors above."
    exit 1
fi

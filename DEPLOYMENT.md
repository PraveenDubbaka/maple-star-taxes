# Maple Star Taxes - GitHub Pages Deployment

This website is deployed to GitHub Pages for client review.

## Live Demo

- **GitHub Pages URL**: `https://[your-username].github.io/maple-star-taxes/`

## Deployment Instructions

### Initial Setup

1. Create a new repository on GitHub named `maple-star-taxes`
2. Push this code to the repository
3. Enable GitHub Pages in repository settings

### Deploy Updates

```bash
npm run deploy
```

## Important Notes

### AI Chat Feature

⚠️ **Note**: The AI Tax Assistant chatbot requires a backend server and will NOT work on GitHub Pages (which only hosts static files). The chatbot will be disabled in the deployed version.

To enable the AI chatbot:

1. Deploy the backend server (server.js) to a platform like:
   - Heroku
   - Vercel
   - Railway
   - Render
   - AWS/Azure
2. Update the API endpoint in script.js

### Static Features Available

The following features work perfectly on GitHub Pages:
✅ All page sections and navigation
✅ Country selection (Canada/USA)
✅ Contact form (requires backend integration)
✅ Responsive design
✅ Animations and interactions
✅ TaxDome redirects (login/signup)

### Backend Features (Not Available on GitHub Pages)

❌ AI Tax Assistant chatbot
❌ Contact form submission processing
❌ API endpoints

## Viewing Locally

```bash
# Install dependencies
npm install

# Start the development server with AI features
npm start

# Open http://localhost:3001
```

## Repository Structure

```
maple-star-taxes/
├── index.html          # Main website
├── styles.css          # Styling
├── script.js           # Frontend JavaScript
├── server.js           # Backend (Node.js/Express)
├── .env               # API keys (not committed)
├── package.json       # Dependencies
└── docs/              # GitHub Pages deployment
```

## Contact

For questions about the website, contact Maple Star Taxes.

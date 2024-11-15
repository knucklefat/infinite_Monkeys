interface RedditConfig {
  clientId: string;
  redirectUri: string;
  scope: string[];
}

export const redditConfig: RedditConfig = {
  clientId: process.env.REDDIT_CLIENT_ID || '',
  redirectUri: process.env.REDDIT_REDIRECT_URI || 'https://infinite-monkeys-typewriter.netlify.app/auth/callback',
  scope: ['identity']
};
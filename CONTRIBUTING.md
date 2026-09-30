# Contributing to Minimalist Developer Portfolio

First off, thank you for considering contributing to this project! It's people like you that make open source such a great community.

## Local Development

To get the project running locally:

1. **Fork & Clone** the repository:
   ```bash
   git clone https://github.com/<your-username>/my-portfolio.git
   cd my-portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```
   Ensure `ENABLE_ADMIN_PANEL=true` is set.

4. **Run the development server**:
   ```bash
   npm run dev
   ```
   The site will be available at [http://localhost:3000](http://localhost:3000). The admin panel is at [http://localhost:3000/admin](http://localhost:3000/admin).

## Making Changes

1. Create a new branch: `git checkout -b my-feature-branch`
2. Make your changes and test them locally.
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-feature-branch`
5. Submit a pull request.

## Reporting Issues
Please use the provided GitHub Issue Templates to report bugs or request new features.

Thank you for your contributions!

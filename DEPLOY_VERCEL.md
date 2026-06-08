Quick Vercel deploy

Option A — Deploy from local with Vercel CLI
1. Install Vercel CLI if you don't have it:

   npm i -g vercel

2. From the project folder run:

   cd "C:\\Users\\jesic\\Desktop\\jesica-portfolio"
   vercel login
   vercel --prod

This will upload the site. `vercel.json` ensures `/resume.pdf` is served with `Content-Disposition: attachment`.

Option B — Deploy from Git
1. Push this folder to a Git repo (GitHub/GitLab/Bitbucket).
2. In Vercel dashboard, choose "Import Project" -> select your repo -> Deploy.

Notes
- The site is static (index.html, style.css, script.js). The `vercel.json` header rule will make browsers download `resume.pdf` rather than preview it inline.
- If you want the project root removed (e.g., put under a subfolder), adjust the import settings in Vercel.

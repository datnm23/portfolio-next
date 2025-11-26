# Migration to Next.js

The project has been successfully migrated from Vite + React to Next.js (App Router).

## Steps Completed
- Converted project structure to Next.js conventions (`app` directory).
- Migrated pages: Home, About, Portfolio, Contact.
- Migrated components, hooks, contexts, and lib utilities.
- Configured Tailwind CSS with `oklch` color support.
- Configured `next.config.mjs`, `tsconfig.json`, `postcss.config.js`.
- Removed legacy Vite and Express server files.

## Important Notes

### 1. Install Dependencies
Since the automatic installation failed due to environment issues, please run the following command in the project root:

```bash
npm install
# or
pnpm install
# or
yarn install
```

### 2. Restore Assets
The `public` folder was reset during migration. Please restore your static assets (images, PDFs, Excel files) from your backup or git repository to the `public` folder in the root directory.
- `logo.svg`
- `CV_Nguyen_Manh_Dat.pdf`
- Excel files referenced in `lib/const.ts` (e.g., `250717BOQFULLSỬA-OPB(ORIGINAL)R4-KCT-Gửi.xlsx`)

### 3. Admin Page
The `Admin` page was not migrated as it requires a backend implementation for persistence (Next.js API Routes). You can reimplement it under `app/admin/page.tsx` if needed.

### 4. Run the Project
To start the development server:

```bash
npm run dev
```

To build for production:

```bash
npm run build
npm start
```

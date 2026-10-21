# Node.js + Express + React + Vite CI Test Project

Checks: Node API tests, ESLint, TypeScript type checking, Vite production build.

## Run locally
```bash
npm install
npm test
npm run lint
npm run typecheck
npm run build
```

## Failure test
In `.github/workflows/ci.yml`, change `FORCE_CI_FAILURE: "false"` to `"true"` and push. The API test should fail with `FORCED_CI_FAILURE: DeployGuard test marker (Node/React project)`. Add/sync the repository in DeployGuard. Restore `false` after testing.

The workflow uses `npm install` because this starter does not include a generated package-lock.json.

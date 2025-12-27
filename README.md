## Build Project

This Projekt uses npm-workspaces.
Main packages-scripts are as following:

```bash
    # Starts Build of the whole monorepo. Uses 'monorepo:build'
    npm run build
    # Cleans monorepo-output folder
    npm run clean
    # Starts all Build scripts in 'projects' folder
    npm run monorepo:build
    # Starts all Clean scripts in 'projects' folder
    npm run monorepo:clean
    # Bundles all _buildOutput folders from 'projects' folder into '_monorepo-output'
    npm run monorepo:bundle
```

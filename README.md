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

## Project Configuration

This Project uses environment variables.

NODE_ENV = (dev|)

.env.<NODE_ENV> file is getting used if running the backend.


Backend configuration gets done by using .env.dev or .env file.
Rename the template that can be found in .env.example.

```bash 
# Create new .env.dev File from template
cp ./projects/backend/.env.example ./projects/backend/.env.dev
```

Start the backend using the .env.dev file by running the VSCode launch.json config 'Debug Server'.

or
```bash
# You can also launch by commandline
NODE_ENV=dev node _monorepo-output/backend/server.js
```


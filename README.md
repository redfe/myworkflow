# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## Deploy to Azure Container App Registry

```bash
az login
source .env && az acr login --name ${AZ_CR}
source .env && az acr build --registry ${AZ_CR} --image ${AZ_IMG} .
```

## Update Azure Container Apps

```bash
source .env && az containerapp update --name ${AZ_CA} --resource-group ${AZ_RG} --image ${AZ_CR}.azurecr.io/${AZ_IMG}:latest --revision-suffix $(date +%Y%m%d%H%M%S)
```

## ex.Create Docker image & Run Docker container

```bash
docker build -t myworkflow .
docker run --network docker_default --name myworkflow -p 80:80 -e PORT=80 -e DATABASE_URL="sqlserver://sql1:1433;initial catalog=myworkflow;user=sa;password={P@ssw0rd};trustServerCertificate=true;" myworkflow
```

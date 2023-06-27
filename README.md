# Dare Drop Coding Task

## Requirements

- Node.js
- Package manager: npm | yarn | pnpm

<p style="color: yellow; font-size: 2.1rem; font-weight: bold">Warning!</p>

Some things like constants, events constants or routes constants, or schemas that are repeated in both client and server, should normally be shared for them both, and only way I know how to do this is through monorepo, and setting up monorepo seemed like a slight overkill

## Getting Started

First step is to install needed dependencies, minimum required to run server and client is to install at least dependencies inside `client` directory and `server` directory, but if you want to run `dev` command for both `client` and `sever` app in one command, you're gonna have to install dependencies also in the root of the project, I'm personally using `pnpm` but choice is yours, run following commands, assuming you're in the root directory

```bash
# Root

# npm
npm install

# yarn
yarn

# pnpm
pnpm install

#############################
# Server

# npm
cd server && npm install

# yarn
cd server && yarn

# pnpm
cd server && pnpm install

#############################
# Client

# npm
cd client && npm install

# yarn
cd client && yarn

# pnpm
cd client && pnpm install
```

### Setting Env Variables

Env variables are required to run both `client` and the `server` apps.

All you have to do is run following commands, assuming you're in the root directory

```bash
# Client
cd client && cp .env.example .env.local

# Server
cd server && cp .env.example .env
```

### Setting Up Database

The `db push` command pushes the state of your Prisma schema file to the database, it creates the database if the database does not exist.

```bash
# npm
cd server && npm run db:push

# yarn
cd server && yarn db:push

# pnpm
cd server && pnpm db:push
```

Then if you want to have some starter data, so the page don't look empty on initial load, you can `seed` the database with

```bash
# npm
cd server && npm run db:seed

# yarn
cd server && yarn db:seed

# pnpm
cd server && pnpm db:seed
```

## Run in Dev Mode

Finally we can run `client` and `server` in `dev` modes

First option is to do that by running commands separately on both `client` and `server`, assuming you're in the root directory

```bash
# Server

# npm
cd server && npm run dev

# yarn
cd server && yarn dev

# pnpm
cd server && pnpm dev

#############################
# Client

# npm
cd client && npm run dev

# yarn
cd client && yarn dev

# pnpm
cd client && pnpm dev
```

Or you can run both `client` and `server` at the same time in the root of the project by running following command

```bash
# npm
npm run dev

# yarn
yarn dev

# pnpm
pnpm dev
```

But keep in mind you'd have to alter scripts in the `package.json` in the root of the project, as it uses `pnpm` by default

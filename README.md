# Tabi

A practice chat application using phoenix, react, and postgres to be deployed through cloud platforms.

## Tech stack

- Elixir
- Phoenix
- React
- Postgres
- Nginx
- Docker
- Docker Compose

## Start the application

### Create `.env` in root directory

```
APP_PORT=4000
APP_HOSTNAME=localhost
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=database
SECRET_KEY_BASE=Y0uRvErYsecr3TANDL0ngStr1ng
DOCKER_WEB_PORT_FORWARD=4000
```

### Create `.env.local` in /app directory

```
VITE_API_URL=http://localhost:4000/api
VITE_WS_URL=ws://localhost:4000/socket
```

_Replace env values to your liking_

### Execute the command to start the app

```
docker-compose up --build
```

### Execute the command to stop the app

```
docker-compose down -v
```

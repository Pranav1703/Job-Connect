# Job Connect
search for jobs or post job openings.

## How to Run locally

### 1.Download the folder
Download the source file and extract it. open it in vscode.

### 2. Run the application
open a new terminal and cd into the 'frontend' directory
```
cd frontend
```
install the dependencies
```
npm i
```
create and set env file in /frontend/
```
VITE_SERVER_URL={"server url here"}
```

now, start the application by running this command 

```
npm run dev
```

### 3.Start the server
open another terminal and cd into the 'server' directory
```
cd server
```
install the dependencies
```
npm i
```
create and set env in /server/
```
CORS_ORIGIN="{frontend url here}"
MONGO_URL="{mongodb uri here}"
TOKEN_SECRET={"secret string"}
TOKEN_EXPIRY={"time period in days"}
```

start the server by running this command
```
node dist/index.js
```


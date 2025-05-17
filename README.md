# Group Debt Manager

Simple web app for managing group debts. Built as a technical task for an internship.

## Features

- Create groups
- Add and remove people
- Track who owes money
- Add transactions to settle debts

## Tech

- Backend: ASP.NET Core
- Frontend: React

## Dependencies

To build and run the project, you need to have the following installed:
- .NET Core 9 SDK
- ASP.NET Core 9 Runtime
- npm (Node.js package manager)

```shell
# on archlinux
pacman -S dotnet-sdk aspnet-runtime npm
  
```

## How to Run

1. Start backend:

```shell
cd server
dotnet restore
dotnet run  
```

2. Start frontend:

```
cd client
npm install
npm start
```

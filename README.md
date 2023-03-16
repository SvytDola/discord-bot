# discord-bot

# Configuration

#### Create file `config.json`
```json
{
  "guildIds": ["guildId"],
  "clientId": "clientId",
  "tokenName": "AGN",
  "commissionPercent": 10,
  "embedColor": "#89CFF0",
  "token": "token",
  "faucetTokensNumber": 0.1,
  "database": {
    "name": "discord",
    "host": "localhost",
    "dialect": "mysql",
    "username": "username",
    "password": "password",
    "port": 3306
  }
}
```
## Install requirements
```shell
npm install .
```
## Run bot
```shell
npm start
```

# Tasks

- [x] balance `command`
  - [x] info `info of balance`
  - [x] send `send tokens`
  - [x] top `show user top of balance`
- [x] faucet `send free tokens`
- [ ] music
  - [ ] play
  - [ ] skip
  - [ ] pause

# Commands
![alt](https://media.discordapp.net/attachments/817438337181941842/1085935308027203737/anix3.gif)

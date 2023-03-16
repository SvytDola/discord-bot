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

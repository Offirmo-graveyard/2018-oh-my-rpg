# Oh My RPG

RPG logic for web RPGs in TypeScript.

## Installation
```bash
nvm use 8
npm install --global lerna

lerna clean --yes
lerna exec -- rm -f package-lock.json
rm -f package-lock.json

lerna bootstrap

lerna run build:dev

```

## Usage
Compose and profit !

Example: see `packages/the boring rpg`


## Misc

### Interesting reads:
* https://github.com/Offirmo-team/wiki/wiki/RPG
* https://gamedevelopment.tutsplus.com/categories/game-design
  * https://gamedevelopment.tutsplus.com/tutorials/making-difficult-fun-how-to-challenge-your-players--cms-25873
* ;-) https://gamedevelopment.tutsplus.com/articles/3-questions-to-help-you-finish-your-first-game--gamedev-9576




git push --set-upstream origin master
npm install
lerna run install

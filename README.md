# Oh My RPG ⚔ 👑


## Intro
A [lerna](https://lernajs.io/) collection of packages featuring:
- individual modules implementing RPG logic
- actual RPGs using those packages (for now only the-npm-rpg)

The modules are in TypeScript.



## Installation
```bash
nvm install
npm install --global lerna
lerna bootstrap --hoist
lerna run build:dev
lerna run build
```


## Usage
Compose and profit !

Example: see `packages/the-npm-rpg`


## Contributing
```bash
lerna clean --yes
rm -f package-lock.json & lerna exec -- rm -f package-lock.json
rm -rf node_modules & lerna exec -- rm -rf node_modules
lerna bootstrap --hoist
lerna exec -- rm -rf dist
lerna run build:dev
lerna run build

lerna exec -- npm outdated
```


## Misc / TOSORT

### Interesting reads:
* https://github.com/Offirmo-team/wiki/wiki/RPG
* https://gamedevelopment.tutsplus.com/categories/game-design
  * https://gamedevelopment.tutsplus.com/tutorials/making-difficult-fun-how-to-challenge-your-players--cms-25873
* ;-) https://gamedevelopment.tutsplus.com/articles/3-questions-to-help-you-finish-your-first-game--gamedev-9576

```bash
git push --set-upstream origin master
npm install
lerna run install
```

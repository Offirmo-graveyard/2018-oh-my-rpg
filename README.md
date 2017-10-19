# Oh My RPG ⚔ 👑

## Intro

My RPG framework, comprised of:
* composable building blocks
* final RPG implementations (using the blocks)
Code is issomorphic, targeting node & browser. This is achieved by being text based with progressive augmentations:
# pure text
# text with emojis
# text with styles: ASCII or CSS
# pictures (displayable in browser or iterm2)
# ...

Under the hood, it's a [lerna](https://lernajs.io/) collection of packages.
Those modules are either in TypeScript or JavaScript, whatever makes the most sense in each case.



## Installation
```bash
nvm install
npm install --global lerna
lerna bootstrap --hoist
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

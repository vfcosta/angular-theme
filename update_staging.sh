#!/bin/bash

git checkout master
git pull
git checkout staging
git pull
git merge --strategy-option theirs
npm install
npm run build-all
git add -f dist
git commit -m "Version for staging's publication"
git push

#!/user/bin/env sh

set -e

npm run build

cd dist

git init 
git add -A
git commit -m "New Deployment" --allow-empty
git push -f git@github.com:enguyen807/Slots-App.git master:gh-pages

cd -

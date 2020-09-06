#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

cd ~/dojo/js/hexjs
rm -rf 20200807
mkdir 20200807
cp -r ~/dojo/js/hexjs-final-customer/dist/. ./20200807/

git add .
git commit -m "Deploy 20200807"
git push

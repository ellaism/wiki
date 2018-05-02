#!/bin/bash

cd /var/www/ellawiki/meta.wiki
git pull
cd ..
cp -r meta.wiki/* wiki/ 
cp meta.wiki/_Sidebar.md wiki/_includes/_Sidebar.md
cd wiki
git pull --no-edit
git add -A
git commit -m "Wiki Update" 
git push

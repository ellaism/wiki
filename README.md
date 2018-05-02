## GitHub Wiki to Static Page Converter

These are the scripts used to generate http://wiki.ellaism.org

### Webhook 

Install the webhook on a vhost that runs PHP. When you run the index.php it will add a record to a mysql table that will allow a rebuild of the static pages. The vhost needs to be accessible to the outside world without any passwords.

eg:

http://wiki-webhook.ellaism.org/

### Setup the repo's

Checkout a copy of the github wiki as a user that has an ssh key on your repo.  This is the git url to your repo with .wiki appended to the repo name:

`git clone git@github.com:ellaism/meta.wiki.git`

Checkout a copy of the repo that will hold the static pages as a user that has write access on the repo.  This can be the same repo as the wiki if you want:

`git clone git@github.com:ellaism/meta.git` 

### Setup the cron

Setup a cron to run update_wiki.php every minute.  The cron should run as the same user that you used to checkout the repos in the previous section.

`* * * * * /usr/bin/php /var/www/ellawiki/update_wiki.php`

### Edit update_wiki.sh

Change update_wiki.sh to use the paths that you used to setup the repo's.

### Configure Webhook

On the wiki that you want to publish to static pages, configure the webhook.


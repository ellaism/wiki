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


### WikiLoader JavaScript

There is a jQuery plugin that allows you to load a piece of content from the wiki static pages.  GitHub pages sends a CORS header that allows you to load content onto any page.

Load the plugin on your page that will receive the content:

`<script src="/js/wiki-loader.js"></script>`

Add a div to hold the loading indicator and a div to hold your content. The "id" of the div must match the id of div from the wiki page that you are trying to load. If you want to load the entire wiki page, use "wiki-page-content" as your id.  The data-wiki-page attribute should point to the URL of the page that holds the content you want to load.  There is an optional attribute called "data-wiki-fail-message" that will be displayed with a link to the content if the request fails.

```
<div class="wiki-loader"></div>
<div id="wiki-page-content" data-wiki-page="https://wiki.ellaism.org/Pool-List" data-wiki-fail-message="View the complete pool list on the wiki"></div>
```

Make sure to run the plugin after the page loads:

`$(".wiki-loader").WikiLoader();`



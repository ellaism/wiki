<!-- TITLE: Ellaism OpenAlias Howto -->
<!-- SUBTITLE: A guide to setting up an OpenAlias DNS record for an Ellaism address -->

# Ellaism OpenAlias How To

## What is OpenAlias?

<a href="https://openalias.org">OpenAlias</a> is a standard that was created and is currently maintained by the <a href="https://forum.getmonero.org/">Monero dev team</a>. Software that supports OpenAlias allows you to use domain style addressing. It's easier to remember <a href="https://outdoordevs.com">outdoordevs.com</a> than it is to remember 0xF08d00694Ff9aDbE37960030fE622EdEa35Eb48F.


## What do I need?

### 1. Own your own domain name. 

Your registrar must support DNSSEC for your domain.  Not all registrars support DNSSEC on all their top level domains.  I recommend <a href="https://aws.amazon.com/route53/">Amazon Route 53</a>. Most registrars don't allow you to transfer your domain for at least 60 days after buying it, so check in advance that you can use DNSSEC before you buy the domain.

### 2. Ability to setup TXT records & DNSSEC support

A DNS provider like <a href="https://www.cloudflare.com/">Cloudflare</a> makes it easy to do both of these. 


## How do I set it up?


### Step 1 - Enable DNSSEC

With CloudFlare you can enable DNSSEC with 1 click. Click on the DNS tab and scroll down to the bottom of the page. When you enable DNSSEC you will be given a public key and some other settings that will need to be applied to your registrar.

### Step 2 - Configure the registrar
 
With Amazon Route 53, click on Registered Domains then domain that you want to edit, then click on Manage Keys in the bottom right.

For Cloudflare, choose 257 - KSK as the Key type. Set the algorithm to 13 - ECDSAAP256SHA256 and paste your public key from the Cloudflare page. Other registrars might require slightly different settings.  To make matters more complicated, not all registrars support all algorithms so your DNS provider might not be compatible with your registrar.  This is why I recommend Amazon Route 53 in conjunction with Cloudflare as it is very easy to setup with this combination.

### Step 3 - Create TXT record for your address

You need to add a TXT record to DNS record for your domain:

oa1:ella recipient_address=0xF08d00694Ff9aDbE37960030fE622EdEa35Eb48F; recipient_name=Outdoor Devs;

The record must begin with oa1: followed by the symbol of the currency, in this case ella. recipient_address is your Ellaism address.  recipient_name is optional and might not be used by all clients that implement OpenAlias.


### Using other currencies

You can add as many of these TXT records as you like for other currencies.

oa1:btc recipient_address=1KCPjz2W4v4NsAX2GysR3nP9CPpMADdDqR; recipient_name=Outdoor Devs;


### Using email addresses

If you want to allow people to send to steve@outdoordevs.com create the same TXT record but use steve in the name part of the DNS record.  OpenAlias clients will automatically convert the @ to a . and peform the lookup on steve.outdoordevs.com



## Developing

There are no Ellaism clients I am aware of that use this yet, so setting this up is just for very, very early adopters. The mobile wallets and historical balance tool will support OpenAlias at some point. There are libraries for Rust, Python and Javascript at the bottom of this page if you are interested in adding OpenAlias support to your project. 

### DNSCrypt

The official OpenAlias spec uses DNSCrypt to prevent client lookups from leaking. They recommend routing all DNS lookups through a proxy to a small subset of servers that promise not to log anything. Since Ellaism is a public ledger without any privacy features at the network level, Ellaism OpenAlias clients are not expected to follow this part of the specification.

### Chain of Trust

Ellaism clients should verify the chain of trust is intact and force users to manually enter the hex addresses if the chain of trust can not be verified. If the chain of trust is valid using domain addresses is very safe. For extra piece of mind you can setup a script that will monitor your domain name resolves to the correct address and be alerted when it changes.

## Resources

https://openalias.org/#implement
https://docs.rs/openalias/0.2.0/openalias/
https://github.com/jedisct1/dnscrypt-proxy
https://github.com/openalias/dnscrypt-python
https://github.com/openalias/openalias-api



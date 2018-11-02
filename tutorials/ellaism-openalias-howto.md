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

With Cloudflare you can enable DNSSEC with 1 click. Click on the DNS tab and scroll down to the bottom of the page. 

![Step 1](/uploads/tutorials/step-1.png "Step 1")

Click on Enable DNSSEC.

![Step 2](/uploads/tutorials/step-2.png "Step 2")

You will be given a public key and some other settings that will need to be applied to your registrar.

![Step 3](/uploads/tutorials/step-3.png "Step 3")

### Step 2 - Configure the registrar
 
With Amazon Route 53, click on Registered Domains then domain that you want to edit, then click on Manage Keys in the bottom right.

![Step 4](/uploads/tutorials/step-4.png "Step 4")

For Cloudflare, choose 257 - KSK as the Key type. Set the algorithm to 13 - ECDSAAP256SHA256 and paste your public key from the Cloudflare page. 

![Step 5](/uploads/tutorials/step-5.png "Step 5")

Other registrars might require slightly different settings.  To make matters more complicated, not all registrars support all algorithms so your DNS provider might not be compatible with your registrar.  The combination of Amazon Route 53 in conjunction with Cloudflare has been very reliable.

### Step 3 - Create TXT record for your address

You need to add a TXT record to DNS record for your domain.  On the DNS tab in Cloudflare, change the record type to TXT and enter an @ symbol into the **Name** field.  Then click on **Click to configure**

![Step 6](/uploads/tutorials/step-6.png "Step 6")

Now you need to build your OpenAlias record. Replace the string below with your Ellaism address.

**oa1:ella recipient_address=YOUR_ELLAISM_ADDRESS; recipient_name=OPTIONAL RECIPIENT NAME;**

The recipient address should always be terminated with a semi-colon. You can optionally add a recipient_name to your record.

Copy/paste your OpenAlias record into the value field.

![Step 7](/uploads/tutorials/step-7.png "Step 7")

### Using other currencies

You can add as many of these TXT records as you like for other currencies.

oa1:btc recipient_address=1KCPjz2W4v4NsAX2GysR3nP9CPpMADdDqR; recipient_name=Outdoor Devs;


### Using email addresses

If you want to allow people to send to steve@outdoordevs.com create the same TXT record but use steve in the name part of the DNS record.  OpenAlias clients will automatically convert the @ to a . and peform the lookup on <a href="https://steve.outdoordevs.com">steve.outdoordevs.com</a>


### Additional settings for TXT records

The [official specifications](https://openalias.org/#extend) for OpenAlias list some additional settings that can be used in TXT records that your clients might want to support.

* tx_description - In case you have an address that will always be used for a specific reason, like donations for instance. A client that supports this field might take this data and display display it for the user, or store it for reference so the user can review it later.

* tx_amount - In case you have a recommended amount that you want to be filled in by default for each transaction to this address.  Clients should pre-populate transaction amounts with this value.

* tx_payment_id - This is particular to Monero, but is standardised as other cryptocurrencies (CryptoNote-based cryptocurrencies in particular) may find it useful. It is typically a hex string of 32 characters, but that is not enforced in the standard.  Ellaism TXT records do not have a practical application for this so Ella OA clients can safely ignore this field.

* address_signature - This is very good to have for additional security but takes some effort on both the person creating the TXT record and the client to verify this signature is correct. The signed message should consist of the entire FQDN (eg. donate.outdoordevs.com) with nothing else. The message should be signed with [eth_personal_sign](https://wiki.parity.io/JSONRPC-personal-module#personal_sign) using the address holders private key, and the result of this would be added to the TXT record.  Clients can then verify the address that was used to sign this message wtih [ec_recover](https://wiki.parity.io/JSONRPC-personal-module#personal_ecrecover)

* checksum - It has to appear as the last item in the TXT record, otherwise the record is open to manipulation. Depending on your use-case, it may serve little or no purpose, although some may choose to include it for additional validation. In order to calculate or verify the checksum, take the entire record up until the checksum key-value pair (ie. excluding the checksum key-value pair). Strip any spaces from either side, and calculate the CRC-32 on that final record.  If you are verifying address_signature then this probably isn't needed but could be useful to know if the TXT record in being 

## Developing

There are no Ellaism clients I am aware of that use this yet, so setting this up is just for very, very early adopters. The mobile wallets and historical balance tool will support OpenAlias at some point. There are libraries for Rust, Python and Javascript at the bottom of this page if you are interested in adding OpenAlias support to your project. 

### Resolution

Not all DNS servers support DNSSEC.  When building an application that will support OpenAlias you need to perform DNS lookups on servers that you specify.  Use an established 3rd party library to verify the chain of trust is intact.

### DNSCrypt

The official OpenAlias spec uses DNSCrypt to prevent client lookups from leaking. They recommend routing all DNS lookups through a proxy to a small subset of servers that promise not to log anything. Since Ellaism is a public ledger without any privacy features at the network level, Ellaism OpenAlias clients are not expected to follow this part of the specification.  If you are not using DNSCrypt this fact should be clearly visible so that users are fully informed.

### Chain of Trust

Ellaism clients should verify the chain of trust is intact and force users to manually enter the hex addresses if the chain of trust can not be verified. If the chain of trust is valid using domain addressing is very safe. For extra piece of mind you can setup a script that will monitor your domain and be alerted to changes.

## Resources

https://openalias.org/#implement
https://docs.rs/openalias/0.2.0/openalias/
https://github.com/jedisct1/dnscrypt-proxy
https://github.com/openalias/dnscrypt-python
https://github.com/openalias/openalias-api



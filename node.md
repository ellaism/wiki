<!-- TITLE: Node -->
<!-- SUBTITLE: Setup and connection -->                                                                                                                                           
                                                                                                                                                                                                                         ![Logo](/uploads/logo.png "Logo")
  **1. Install Git**
Windows: https://git-scm.com/download/win (default settings during install should be fine)
Linux:
   *Code:*
sudo apt-get install git
Mac:
   *Code:*
brew install git

**2. Install NodeJS**
Windows: https://nodejs.org/en/download/current/
Linux:
   *Code:*
sudo apt-get install node
(or nodejs)
Mac
   *Code:*
brew install node

*The rest of the commands should be run in a command window, terminal, or shell, and should be the same for all platforms (linux users might need to prepend some of these with 'sudo')*

**3. Install pm2**
   *Code:*
npm install -g pm2

**4. Install Parity**
https://github.com/ellaism/shell/releases       and  Start Ellaism Shell

**5. Dowlound** [Ellaism Net Intelligence Api](/uploads/ellaism-net-intelligence-api.zip "Ellaism Net Intelligence Api")

**6. Edit  the** *app.json*  file in the *ellaism-net-intelligence-api*  folder, and set the **INSTANCE_NAME** a unique name
   *Code:*
[
  {
    "name"              : "node-app",
    "script"            : "app.js",
    "log_date_format"   : "YYYY-MM-DD HH:mm Z",
    "merge_logs"        : false,
    "watch"             : false,
    "max_restarts"      : 10,
    "exec_interpreter"  : "node",
    "exec_mode"         : "fork_mode",
    "env":
    {
      "NODE_ENV"        : "production",
      "RPC_HOST"        : "127.0.0.1",
      "RPC_PORT"        : "8545",
      "LISTENING_PORT"  : "30303",
      "INSTANCE_NAME"   : "###PUT YOUR INSTANCE NAME HERE###",
      "CONTACT_DETAILS" : "",
      "WS_SERVER"       : "https://stats.ellaism.org/",
      "WS_SECRET"       : "ellaismstats",
      "VERBOSITY"       : 2
    }
  }
]
**7. Copy the folder** *"ellaism-net-intelligence-api"* in C: \ Windows \ System32

**8. Get the stats project**
open a new command window
   *Code:*
git clone https://github.com/ellaism/ellaism-net-intelligence-api.git
   *Code:*
cd ellaism-net-intelligence-api
   *Code:*
npm install
**9. Start the stats monitor**
   *Code:*
pm2 start app.json

**10. Check your status**
   *Code:*
pm2 show 0
   *Code:*
pm2 logs
    Check the work of the ***NODE*** here     https://stats.ellaism.org/
  If you have any questions, please contact me PM @Alexander in the channel Discord 
https://discord.gg/KUChqm2
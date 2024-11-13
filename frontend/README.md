
<p align="center">
   <a href="https://nlrx-wjc.github.io/react-antd-admin-template/" target="_blank">
      <img src="./logo.png"/>
   </a>
</p>

# Introduction

[react-antd-admin-template](https://nlrx-wjc.github.io/react-antd-admin-template/) is a background management system template based on `React` and `Ant ​​Design`. It has built-in typical business models such as user login/logout, dynamic routing, permission verification, Manajemen Pengguna, etc., which can help you quickly build enterprise-level mid- and back-end product prototypes, and is your best choice for private work.

The development of this system is inspired by [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin/), which is an excellent background management system template based on `Vue` and `ElementUI` , Pay tribute to the boss here!

In fact, my main technology stack has always been `Vue`, but recently I got into `React`. After reading the documentation for more than half a month, I wanted to give it a try, haha. Isn't there a saying: the best way to test learning outcomes is to make wheels. So this wheel was built, lol. For `React`, I am still a novice. There must be something that is not good enough in the project. Welcome to raise `pr` or `issue`.

- [Online preview](https://nlrx-wjc.github.io/react-antd-admin-template/)
- [Gitee online preview (domestic users can access this address)](https://nlrx.gitee.io/react-antd-admin-template/)
- [Development document](https://nlrx-wjc.github.io/react-antd-admin-template-doc/) is still being written and improved...

# Function

```bash
- login/logout

- ASD
   - Page permissions
   - Routing authority

- Global functions
   - Dynamic sidebar (support multi-level routing nesting)
   - dynamic breadcrumbs
   - local/backend mock data
   - Screenfull full screen
   - Adaptive shrink sidebar

- editor
   - rich text
   - Markdown

- Excel
   -Export to excel
   - import excel
   - Front-end visualization excel

- Zip
   - export zip

- error page
   - 404

- components
   - Drag and drop list

- sheet
-Dashboard
- Guide pages
- ECharts chart
- clipboard
```

# Directory Structure

```bash
├─ public # static resources
│ ├─ favicon.ico # favicon icon
│ └─ index.html # html template
├─ src # project source code
│ ├─ api # all requests
│ ├─ assets # Images, fonts and other static resources
│ ├─ components # Global public components
│ ├─ config # Global configuration
│ │ ├─ menuConfig.js # Navigation menu configuration
│ │ └─ routeMap.js # route configuration
│ ├─ lib # Third-party library loaded on demand
│ ├─ mock # project mock simulation data
│ ├─ store # Global store management
│ ├─ styles # Global styles
│ ├─ utils # Global public methods
│ ├─ views # views all pages
│ ├─ App.js # Entry page
│ ├─ defaultSettings.js # Global default configuration
│ └─index.js # Source code entry
├── .env.development # Development environment variable configuration
├── .env.production # production environment variable configuration
├── config-overrides.js # Custom configuration of webpack for cra
├── deploy.sh # CI deployment script
├── .travis.yml # Automatic CI configuration
└── package.json # package.json
```

# Install

```shell
# clone project
git clone https://github.com/NLRX-WJC/react-antd-admin-template.git

# enter the project directory
cd react-antd-admin-template

# install dependencies
npm install

# Switch Taobao source to solve the problem of slow npm download speed
npm install --registry=https://registry.npm.taobao.org

# start the service
npm start
```

After the startup is complete, it will automatically open the browser to visit [http://localhost:3000](http://localhost:3000), and you will see the following page, which means that Operasi is successful.

![](./guide.gif)

Then you can modify the code for business development.

# About the author

Hello everyone, I am Sistem Ujian.

A code farmer at the foot of Zhongnan Mountain, under the tutelage of Taoist Wang Chongyang, loves coding, advocates the spirit of open source, and is willing to share.

In 2005, he served in the Langya Special Brigade of the Southeast Theater of the Chinese People's Liberation Army as a sniper.

In 2008, he was invited by the Russian Alpha Special Forces to teach in the first brigade of the special forces to teach its members the theory of socialism with Chinese characteristics and Mao Zedong Thought.

In 2011, he was defeated in the US presidential election, so he was disheartened, put aside all honors, and lived in seclusion at the foot of Zhongnan Mountain.

In 2015, he was entrusted by Taoist priest Wang Chongyang to develop an incense management system for Taoist temples, so he became addicted to IT and couldn't extricate himself.

I like tossing and messing with machines, pursuing new technologies.

Below is my WeChat, welcome to tree (tree) new (new) style (bee) together with good friends! ! !

![](./wechat.jpg)

# Encourage authors

As an individual developer, maintaining open source is not easy. If you feel that this project is of some help to you, please give me a star~~
If you have spare energy, thank you very much for your appreciation to me. Your appreciation is the greatest recognition and encouragement to my creation.

![](./pay.png)
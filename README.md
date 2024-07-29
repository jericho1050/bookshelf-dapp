# BookShelf

In this project, it's configured to run only for local development, but if you wish to use testnets, you might have to configure them yourself.

## Demo

## Installation

1. Clone this repo

    ```zsh
    https://github.com/jericho1050/bookshelf-dapp.git
    ```

2. Now change to the smart-contract directory, and let's first do some configuration with our smart contract

    ```zsh
    bookshelf-dapp % cd smart-contract
    ```

    install the dependencies

    ```zash
    bookshelf-dapp % npm install
    ```

    then run the smart contract

    ```zsh
    bookshelf-dapp % npx hardhat node
    ```

    after that open a new terminal with the same directory and then deploy the smart-contract into the localhost network

    ```zsh
    smart-contract % npx hardhat \
                    ignition \
                    deploy \
                    ignition/modules/BookShelf.js \
                    --network localhost
    ```

3. Okay now let's move on to the frontend, change your directory to frontend and let's configure it

    ```zsh
    bookshelf-dapp % cd frontend
    ```

    create an enviroment variables

    ```zsh
    bookshelf-dapp % touch .env.local
    ```

    or in windows

    ```cmd
    bookshelf-dapp % type nul > .env.local
    ```

    inside our .env.local

    ```zsh
    REACT_APP_CLIENT_ID=YOUR_CLIENT_ID
    REACT_APP_SECRET_KEY=YOUR_SECRET_KEY
    ```

    after that get Our Client API Key from ThirdWeb.

    Go to [here](https://thirdweb.com/login?next=%2Fdashboard%2Fsettings%2Fapi-keys) and click the create API key.

    - Key name: BookShelf
    - Allowed Domains: localhost:5173

    then copy and replace it in the `.env.local` that we've just created

     then install all the dependencies

     ```zsh
     bookshelf-dapp % npm install
     ```

     and lastly we can now run our frontend

     ```zsh
     bookshelf-dapp % npm dev run
     ```

    Note:

    if you're getting some errors, find this at the advance settings (metmask) try doing this
    ![Do image!](/frontend/src/assets/Screenshot.JPG)

## File Structure (partially git ignored some)

```zsh

/bookshelf-dapp
├── frontend
|  ├── README.md
|  ├── frontend
|  |  └── src
|  |     └── contracts
|  ├── index.html
|  ├── package-lock.json
|  ├── package.json
|  ├── public
|  |  └── vite.svg
|  ├── src
|  |  ├── App.jsx
|  |  ├── assets
|  |  |  ├── Screenshot.JPG
|  |  |  └── react.svg
|  |  ├── book.css
|  |  ├── components
|  |  |  ├── AdditionalInfo.jsx
|  |  |  ├── AppBase.jsx
|  |  |  ├── BookList.jsx
|  |  |  ├── OwnedBooks.jsx
|  |  |  ├── PublishBook.jsx
|  |  |  ├── Status.jsx
|  |  |  └── Submit.jsx
|  |  ├── contracts
|  |  |  └── BookShelf.json
|  |  ├── index.css
|  |  └── main.jsx
├──├──.env.local
|  └── vite.config.js
├── readme.md
└── smart-contract
   ├── README.md
   ├── artifacts
   |  ├── build-info
   |  |  ├── 89d701f92be31eacb5991519cc89282a.json
   |  |  └── bdca610012ca37bce3a038357aff33fc.json
   |  ├── contracts
   |  |  └── Bookshelf.sol
   |  └── hardhat
   |     └── console.sol
   ├── cache
   |  └── solidity-files-cache.json
   ├── contracts
   |  └── Bookshelf.sol
   ├── demo.cast
   ├── hardhat.config.js
   ├── ignition
   |  ├── deployments
   |  |  ├── chain-11155111
   |  |  └── chain-31337
   |  └── modules
   |     └── BookShelf.js
   ├── out.txt
   ├── package-lock.json
   ├── package.json
   └── test
      └── Lock.js

directory: 1781 file: 5294

ignored: directory (167)

```

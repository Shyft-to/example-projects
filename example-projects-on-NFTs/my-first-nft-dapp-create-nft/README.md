### How to create an NFT?

All the development information regarding the project in this directory is listed here.

Create a sample React app. We have called our React app 'My Dapp', but you can name yours anything you like. 

Create React App is a comfortable environment for learning React, and is the best way to start building a new single-page application in React. Note that you’ll need to have Node >= 14.0.0 and npm >= 5.6 on your machine. 

To create a project, run:
```bash
  npx create-react-app my-app
  cd my-app
  npm start
```
This will create a react application and it will be up and running on your local system at [localhost:3000](localhost:3000)

Now, let's open up this project with a text editor. We have used vs-code as our text editor for this project, but you can use any text editor you want. Once done this is how it should look like: 

![New React App](src/resources/screenshots/Sample-Asset-1.png)

Now, let us quickly setup a form in our our react project. The data from this form will be used for accepting the params which is required for minting a new NFT, and then we will use SHYFT's create API to mint a new NFT. 
Inside the `App.js` Component, we create the html(JSX) form as per the parameters required for the create API.

```html
<form>
  <label htmlFor="file">Select File</label>
  <input name="file" type="file" onChange={(e) => {}} />
  <br />

  <label htmlFor="network">
    Network <span>(network: string)</span>
  </label>
  <select name="network" onChange={(e) => {}}>
    <option value="devnet">Devnet</option>
    <option value="testnet">Testnet</option>
    <option value="mainnet-beta">Mainnet Beta</option>
  </select>
  <br />

  <label htmlFor="private_key">Private Key (private_key:string)</label>
  <input type="text" name="private_key" onChange={(e) => {}} required />
  <br />

  <label htmlFor="xapikey">X API Key (x-api-key:string)</label>
  <input type="text" onChange={(e) => {}} required />
  <br />

  <label htmlFor="name">Name (name:string)</label>
  <input type="text" name="name" onChange={(e) => {}} required />
  <br />

  <label htmlFor="symbol">Symbol (symbol:string)</label>
  <input type="text" name="symbol" onChange={(e) => {}} required />
  <br />

  <label htmlFor="desc">Description (description:string)</label>
  <textarea name="desc" onChange={(e) => {}} required></textarea>
  <br />

  <label htmlFor="attributes">Attributes (attributes:string)</label>
  <textarea name="attributes" onChange={(e) => {}} required></textarea>
  <br />

  <label htmlFor="external_url">External Url (external_url:string)</label>
  <input type="text" name="external_url" onChange={(e) => {}} />
  <br />

  <label htmlFor="max_supply">Max Supply (max_supply:number)</label>
  <input type="number" name="max_supply" onChange={(e) => {}} required />
  <br />

  <label htmlFor="royalty">Royalty (royalty:number)</label>
  <input type="number" name="royalty" onChange={(e) => {}} required />
  <br />

  <button type="submiit" onClick={() => {}}>
    Submit
  </button>
</form>
```

Now, we go on adding the variables for accepting the values, we use react's `useState` hook for state management in the React App. To import the `useState` hook we use the following code,
```react
import { useState } from "react";
```
and we create the variables with `useState` hook for state management of the variables. 

```react
const [file, setfile] = useState();
const [network, setnetwork] = useState("devnet");
const [privKey, setprivKey] = useState();
const [xApiKey, setXAPI] = useState();
const [name, setName] = useState();
const [symbol, setSymbol] = useState();
const [desc, setDesc] = useState();
const [attr, setAttr] = useState();
const [extUrl, setExtUrl] = useState();
const [maxSup, setMaxSup] = useState();
const [roy, setRoy] = useState();
```

Once done, we associate these variables to their respective input fields. For example, we associate the name field with the name input field, so that the state is updated as soon as the variable is updated.
```react
<input type="text" name="name" value={name} onChange={(e)=>setName(e.target.value)} required />
```
Now, we construct the `handleSubmit` function, which will run on form Sumbit. The API call will take place within this function. We use the `axios` package to handle the API calls(fetch can also be used).

To add the axios package to our project we run the following command:
```bash 
npm install axios
```

`Note: Whenever we add a new package to the project, install and then re-run the server`

This will install the axios package on your system and you will be able to use this inside your react app.
The API we will use for minting the new NFT.

```bash
https://api.shyft.to/sol/v1/nft/create
```
The API accepts form data as input, so after submission we create a new form and `append` all our form data collected from the form created above.

```react
let formData = new FormData();
formData.append("network",network);
formData.append("private_key",privKey);
formData.append("name",network);
formData.append("symbol",symbol);
formData.append("description",desc);
formData.append("attributes",attr);
formData.append("external_url",extUrl);
formData.append("max_supply",maxSup);
formData.append("royalty",roy);
formData.append("file",file);
```
Note that we do not append the api key field as that data is used for authentication purposes.

**Authentication**

To use the SHYFT APIs, we need to pass a special parameter in the header while request. The parameter is known as the 'x-api-key' and serves as an authorization for the API calls in SHYFT APIs. You can obtain your own shyft API key form the [SHYFT](https://shyft.to/get-api-key) website by registering your email with us.
We will use the axios package to make this call.

```react
axios({
        url: "https://api.shyft.to/sol/v1/nft/create",
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          "x-api-key": YOUR X API KEY,
          Accept: "*/*",
          "Access-Control-Allow-Origin": "*",
        },
        data: formData,
      })
        .then((res) => {
          console.log(res);
          // We can create a status variable and render this data in the page, or do anything else
        })
        .catch((err) => {
          console.warn(err);
          //Errors if any
        });
  }
```

So that's pretty much what we need. Once the request has been successfully submitted, we should get a sample response like so
```bash
{
  "success": true,
  "message": "NFT created successfully",
  "result": {
    "txId": "4qUvyoFd7dfbsdRWiXaTV9zdpCJS7ZAzXGQQET1cFcbaXJ1f539MnDbmKaGGxKDbaFjyJjSJ6UvDk5ytRPqfSPAb",
    "mint": "DYitxNvtLxEsn2SChFfHMTCHhcZHgGhFnZeP8zSCof1X",
    "metadata": "8hiAPEukZfWi7sMqZfzyNTmXyR4iGmLb5Z3QNz7CMXe3",
    "edition": "9tV1QAsnbDtuvwZDpukoQzaJds7jHenXHZ5bRCrJ1gnU"
  }
}
```

Congratulations, You have successfully created an NFTs. You can clone and try out this code on your local system, or just write your own from scratch using our step by step approach.

`Note: we have added a few minor css & styling files to our project, all the styling files are present in the resources folder.`

# InnerBeat

## Tools

<ul>
  <li>Api :- <a href="https://github.com/sumitkolhe/jiosaavn-api">JioSaavn unofficial api by Sumit Kolhe</a></li>
  <li>Database :- <a href="https://supabase.com">Supabase</a></li>
  <li>Authentication :- <a href="https://next-auth.js.org">NextAuth.js + Google SignIn</a></li>
</ul>

## Note 
This project utilizes database features, specifically using Supabase. As this is my first time working with databases, there might be unexpected issues or bugs in this aspect of the project. I'm actively learning and improving, but please bear with me as I navigate through this learning curve. Your feedback and contributions are highly appreciated!

## Project Setup

Follow these steps to set up and run the project locally:

### 1: Get Supabase Credentials:

<ul>
  <li>Sign up or log in to <a href="https://supabase.io/">Supabase</a></li>
  <li>Once logged in, navigate to your project dashboard.</li>
  <li>Find your project's API URL and public API key</li>
  <li>Copy these credentials and paste them into `src/utils/supabaseClient.js`:</li>
</ul>

### 2: Set Up Authentication:

<ul>
  <li>Create a `.env.local` file in the root directory of the project.</li>
  <li>Add your Google OAuth credentials to the `.env.local` file:</li>
</ul>

  ```
  GOOGLE_ID=YOUR_GOOGLE_CLIENT_ID
  GOOGLE_SECRET=YOUR_GOOGLE_CLIENT_SECRET
  ```

<ul>
  <li>Make sure to replace `YOUR_GOOGLE_CLIENT_ID` and `YOUR_GOOGLE_CLIENT_SECRET` with your actual credentials.</li>
</ul>

### 3: Install Dependencies:

```
npm install
# or
yarn install
```

### 4: Run the Development Server:

```
npm run dev
# or
yarn dev
```

### 5: Open the Application:

<ul>
  <li>Once the server is running, open your web browser and go to <a href="http://localhost:3000">http://localhost:3000</a>.</li>
</ul>

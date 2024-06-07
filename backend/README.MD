
# Backend

A brief description of what this project does and who it's for


## Installation

Install my-project with npm
 
```bash
  cd folder
  npm install
```
    
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

```env
# NODE BRANCH
NODE_ENV                  = "production" # production OR dev

# GOOGLE OAUTH
GOOGLE_AUTH_CLIENT_ID     = "xXXxxXXxx.apps.googleusercontent.com" # Change This
GOOGLE_AUTH_CLIENT_SECRET = "xXXxxXXxx" # Change This

# JSON WEB TOKEN 
JWT_ACCESS_SECRET         = "xXXxxXXxx" # Change This
JWT_REFRESH_SECRET        = "xXXxxXXxx" # Change This

# DATABASE
DATABASE_URL              = "postgres://postgres:password@host:port/database"

# SUPABASE
SUPABASE_URL              = "https://code.supabase.co"
SUPABASE_PUBLIC_KEY       = "ABCDEFG123"
SUPABASE_STORAGE_BUCKET   = "bucket"
```


## Run Locally

Start the server

```bash
  npm run dev
```


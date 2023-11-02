# Geo Currency Converter

Convert SEK to any country currency instantly.

## Getting Started

Follow these steps to run the project:

1. **Clone or download the repository**

2. **Install dependencies**

   Inside the project root, run:

   ```bash
   npm install 
   ```
   Then, navigate to the `client` directory and run:
   ```bash
   npm install 
   ```
   Finally, go to the `server` directory and run:
   ```bash
   npm install 
   ```
3. **Configure Environment Variables**

    Create a `.env` file in both the `client` and `server` directories and add the       following:
    
    ### Server:

- **PORT**: The port on which the server will run.
- **DATABASE_URL**: [Prisma Connection URL](https://www.prisma.io/docs/reference/database-reference/connection-urls).
- **JWT_SECRET**: Secret key for JWT encoding.
- **FIXER_API_KEY**: API key from [Fixer API Documentation](https://fixer.io/documentation#apikey).
  ### Client:
- **REACT_APP_SERVER_URL**: URL where the server is hosted.
  
   ## Start the project

  Inside the root directory, run:
  
  ```bash
   npm start 
   ```
  

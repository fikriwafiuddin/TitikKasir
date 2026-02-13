// Vercel Serverless Function entry point
// This re-exports the compiled Express app for Vercel to use as a serverless function
import app from "../dist/app.js"

export default app

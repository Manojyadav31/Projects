 * API TESTING APPLICATION *

*Project title and Concept*
A simple, clean, and fully functional API testing tool built as a lightweight web application.  
The goal is to provide an easy-to-use interface for developers and testers to quickly send HTTP requests like (GET, POST, PUT, PATCH, DELETE) and view responses directly in the browser.

This is a standalone, client-side front-end that works entirely in the browser without any server requirements.

*Features implemented in this Frontend Version*
-> Clean and professional UI with subtle, decent colors 
-> Interactive URL input with live proxy URL preview
-> Colored dropdown for HTTP method selection (color changes dynamically based on selected method: GET, POST, PUT, PATCH, DELETE)
-> Support for custom JSON headers and request body (with validation and helpful error messages)
-> Auto-resizing textareas for headers and body
-> Collapsible Response section that opens automatically on request
-> Full CORS handling via public proxy (`corsproxy.io`) – works with most public APIs out of the box
-> No installation needed – just open `index.html` in any modern browser

*Future implementation (Backend updation)*
-> Replace the public CORS proxy with a **custom Node.js/Express backend proxy** for:
-> Greater reliability and no rate limits
-> Support for private APIs and authenticated requests
-> Better error handling and timeout control
-> Ability to handle larger payloads
-> Deploy the full app (frontend + backend) to a hosting platform (e.g., Render, Vercel + Serverless, Railway)
-> Potential additional features:
    -> Request history
    -> Saved collections
    -> Response timing and size info

*Features implemented in this Backend Version*
-> Clean, moderate, and interactive UI
-> Supports GET, POST, PUT, PATCH, DELETE
-> Custom headers and JSON body
-> Pretty-printed responses with click-to-expand for long data (>30 lines)
-> Custom backend proxy – reliable, no third-party limits

*Tech Stack*
-> Front-end: HTML, CSS, Vanilla JS
-> Back-end: Node.js, Express, Axios

*How to run locally*
1. Install Node.js
2. Open terminal in this folder
3. Run:
```bash
npm install
npm start
 

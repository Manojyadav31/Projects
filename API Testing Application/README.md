 * API TESTING APPLICATION *

*Project Title and Concept
A simple, clean, and fully functional API testing tool built as a lightweight web application.  
The goal is to provide an easy-to-use interface for developers and testers to quickly send HTTP requests like (GET, POST, PUT, PATCH, DELETE) and view responses directly in the browser.

This is a standalone, client-side front-end that works entirely in the browser without any server requirements.

*Features implemented in this Frontend Version*
-> Clean and professional UI with subtle, decent colors 
-> Interactive URL input with live proxy URL preview
-> Colored dropdown for HTTP method selection (color changes dynamically based on selected method: GET, POST, PUT, PATCH, DELETE)
-> Support for custom JSON headers and request body (with validation and helpful error messages)
-> Auto-resizing textareas for headers and body
-> Loading spinner during requests
-> Collapsible Response section that opens automatically on request
-> Full CORS handling via public proxy (`corsproxy.io`) – works with most public APIs out of the box
-> No installation needed – just open `index.html` in any modern browser

* Future Improvements (Backend Integration)*
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

Front-end is complete and ready to use as a standalone tool.  
When ready, Backe=end will make it a fully deployable, production-grade API testing application.
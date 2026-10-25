🌸 PetalWish — Cards That Connect 💌
PetalWish is an interactive web application for creating and personalizing greeting cards and invitations for life's special moments. Browse designs for weddings, birthdays, baby celebrations, parties, and other occasions, then customize a design in the Design Studio.

The project combines a responsive frontend with a REST API for user accounts, card templates, saved designs, favorites, and payment records.
✨ Features
- Template gallery: Browse greeting cards and invitations by categories such as Wedding, Birthday, Baby & Kids, and Party.
- Search and filters: Find designs by keywords and template attributes.
- Design Studio: Create and personalize cards using editable design elements.
- User accounts: Register, log in, update profile details, and manage sessions.
- My Designs: Create, edit, duplicate, and manage saved designs.
- Favorites: Save templates for quick access. Guest favorites can be stored locally and synchronized after login.
- Responsive interface: Designed for desktop and mobile screen sizes.
- REST API: Manage accounts, templates, designs, favorites, and payment records through the backend.
- Development mode: Use MongoDB for persistent storage or a temporary in-memory database for local development.
🛠️ Tech Stack
Technology	Purpose
HTML5	Page structure
CSS3	Styling, layout, and responsive presentation
JavaScript	Frontend interactions and Design Studio logic
Node.js	Backend JavaScript runtime
Express.js	REST API and server routing
MongoDB	Persistent data storage
Mongoose	MongoDB object modelling
JWT	User authentication
Zod	Request validation
bcrypt	Password hashing
Google Fonts	Typography


📁 Project Structure
PetalWish/
├── assets/                 # Frontend images and other assets
├── index.html              # Main web page
├── style.css               # Frontend styles
├── script.js               # UI interactions and Design Studio
├── api.js                  # Frontend REST API client
├── run_server.bat          # Windows development startup script
├── server/
│   ├── .env.example        # Example backend configuration
│   ├── package.json        # Backend dependencies and scripts
│   ├── src/
│   │   ├── app.js          # Express application and middleware
│   │   ├── server.js       # Server startup and database connection
│   │   ├── config/         # Environment and database configuration
│   │   ├── models/         # User, template, design, favorite, payment models
│   │   ├── validators/     # Request validation schemas
│   │   ├── middleware/     # Authentication, validation, error handling
│   │   ├── controllers/    # Request handlers
│   │   ├── routes/         # API route definitions
│   │   ├── services/       # Business and database services
│   │   └── data/           # Template catalogue
│   ├── scripts/            # Seeding and development utilities
│   └── tests/              # Backend API tests
└── README.md
🚀 Getting Started
Prerequisites
- Node.js (version 20 or newer is recommended for this project)
- npm (included with Node.js)
- MongoDB Atlas or another MongoDB instance for persistent data
1. Clone the repository
git clone https://github.com/TwinkleRathour/PetalWish.git
cd PetalWish
2. Install backend dependencies
cd server
npm install
3. Configure environment variables
Create a local .env file from the supplied example.

On macOS/Linux:
cp .env.example .env
On Windows Command Prompt:
copy .env.example .env
Open server/.env and configure the required values, including your MongoDB connection string and a strong JWT secret. Use your own credentials; do not commit .env files or secrets to GitHub.
4. Run the application
From the server directory, run with your configured MongoDB database:
npm run dev
To run during development with a temporary in-memory database instead:
npm run dev:memory
The in-memory database is temporary; its data is lost when the server stops.

On Windows, you can also run run_server.bat from the project root. It installs dependencies on first run, starts the server, and opens the local site.

When the server starts, open:

http://localhost:5000
5. (Optional) Seed the template catalogue
From the server directory:
npm run seed
This command inserts or updates the starter template catalogue and builds the configured indexes.
🧭 How to Use PetalWish
1. Open the homepage and browse the template gallery.
2. Select an occasion or search for a suitable design.
3. Preview a template and open it in the Design Studio.
4. Personalize the design using the available editing options.
5. Sign in to save and manage designs and favorites with your account.
6. Reopen saved designs later to continue editing or duplicate them.
The available actions depend on the features enabled in the current application version.
🔌 Backend API
The local API base URL is:
http://localhost:5000/api
The frontend API wrapper in api.js exposes window.PetalWishAPI and communicates with the Express backend.
Area	Capabilities
Health	Check whether the API is running
Authentication	Register, log in, retrieve/update profile, change password, revoke sessions
Templates	Browse, search, filter, sort, and retrieve templates
Designs	Create, read, update, duplicate, and delete a user's designs
Favorites	List, add, remove, and synchronize favorite templates
Payments	Retrieve payment history and payment summaries


Protected endpoints require a valid bearer token. For full route details and MongoDB setup instructions, see [`server/README.md`](server/README.md).
🧪 Testing
The backend includes an API test suite. From the server directory, run:
npm test
The tests use an in-memory database according to the backend test configuration.
🔐 Security Notes
- Passwords are hashed before storage.
- Protected API endpoints use JWT-based authentication.
- Request bodies and parameters are validated by backend schemas.
- Authentication endpoints include rate limiting.
- Security headers and configured CORS policies help reduce common web risks.
- Keep database credentials, secret keys, and real user data out of source control.
- Demo accounts, where enabled for development, are for local testing only. Do not use demo credentials in production.
🔮 Possible Future Enhancements
- Export customized cards as downloadable images or PDFs.
- Add secure shareable invitation links.
- Improve invitation delivery and RSVP workflows.
- Expand accessibility and mobile testing.
- Complete and test an end-to-end payment checkout flow before enabling real payments.
- Deploy the frontend and API with production environment variables, monitoring, and backups.
📸 Screenshots
Add screenshots of the actual application to showcase the homepage, template gallery, and Design Studio. For example, if you save screenshots under assets/images/:
![PetalWish homepage](assets/images/homepage.png)
![Template gallery](assets/images/templates.png)
![Design Studio](assets/images/design-studio.png)
Replace the sample paths with images that exist in the repository.
📄 License
No license is specified in this README. Add a LICENSE file if you intend to publish the project under a particular open-source license.
PetalWish — Turn your special moments into beautiful memories. 🌷

Built with ❤️ for creativity, celebrations, and connection.

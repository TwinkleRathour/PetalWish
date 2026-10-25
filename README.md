# 🌸 PetalWish — Cards That Connect 💌

PetalWish is a web application for creating and personalizing greeting cards and invitations for special occasions. Users can explore templates for weddings, birthdays, baby celebrations, parties, and other events, then customize designs using the Design Studio.

The project combines an interactive frontend with a backend API that supports user authentication, template management, saved designs, favorites, and payment records.

## ✨ Features

- 🎨 **Design Studio:** Create and customize greeting cards and invitations.
- 💍 **Wedding Templates:** Browse wedding invitations, engagement cards, save-the-date cards, RSVP cards, and thank-you cards.
- 🎂 **Birthday Templates:** Explore birthday invitations and greeting cards for different age groups and celebrations.
- 👶 **Baby & Kids:** Find templates for baby showers, first birthdays, baby announcements, and other celebrations.
- 🎉 **Party Templates:** Explore party invitations, graduation cards, anniversaries, and festive celebrations.
- 🔍 **Template Search:** Search for designs and filter templates by available attributes.
- ❤️ **Favorites:** Save preferred templates for quick access.
- 👤 **User Accounts:** Register, log in, and manage profile information.
- 💾 **My Designs:** Create, edit, duplicate, and manage saved designs.
- 📱 **Responsive Interface:** Designed for desktop and mobile screen sizes.
- 🔌 **REST API:** Connect the frontend to backend services for users, templates, designs, and favorites.
- 🗄️ **Database Support:** Use MongoDB for persistent data or an in-memory database for local development.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Structure and content of the website |
| CSS3 | Styling, layouts, animations, and responsive design |
| JavaScript | Frontend interactions and design functionality |
| Node.js | Backend JavaScript runtime |
| Express.js | REST API and server routing |
| MongoDB | Persistent data storage |
| Mongoose | MongoDB object modelling |
| JWT | Authentication and session management |
| Zod | Request validation |
| bcrypt | Password hashing |
| npm | Backend dependency management |
| Google Fonts | Typography |

## 📁 Project Structure

```text
PetalWish/
├── .gitignore
├── .vscode/
│   └── settings.json
├── assets/
│   ├── images/
│   └── templates/
├── index.html
├── style.css
├── script.js
├── api.js
├── run_server.bat
├── README.md
└── server/
    ├── .env.example
    ├── package.json
    ├── package-lock.json
    ├── README.md
    ├── scripts/
    │   ├── dev-memory.js
    │   ├── extract-templates.js
    │   └── seed.js
    ├── src/
    │   ├── app.js
    │   ├── server.js
    │   ├── config/
    │   │   ├── db.js
    │   │   └── env.js
    │   ├── controllers/
    │   │   ├── auth.controller.js
    │   │   ├── design.controller.js
    │   │   ├── favorite.controller.js
    │   │   ├── payment.controller.js
    │   │   └── template.controller.js
    │   ├── data/
    │   │   └── templates.json
    │   ├── middleware/
    │   │   ├── auth.js
    │   │   ├── errorHandler.js
    │   │   ├── rateLimiters.js
    │   │   └── validate.js
    │   ├── models/
    │   │   ├── Design.js
    │   │   ├── Favorite.js
    │   │   ├── Payment.js
    │   │   ├── Template.js
    │   │   ├── User.js
    │   │   └── index.js
    │   ├── routes/
    │   │   ├── auth.routes.js
    │   │   ├── design.routes.js
    │   │   ├── favorite.routes.js
    │   │   ├── index.js
    │   │   ├── payment.routes.js
    │   │   └── template.routes.js
    │   ├── services/
    │   │   ├── demo.service.js
    │   │   ├── payment.service.js
    │   │   ├── template.service.js
    │   │   └── token.service.js
    │   ├── utils/
    │   │   ├── ApiError.js
    │   │   └── response.js
    │   └── validators/
    │       ├── auth.validators.js
    │       ├── common.js
    │       ├── design.validators.js
    │       ├── favorite.validators.js
    │       ├── payment.validators.js
    │       └── template.validators.js
    └── tests/
        ├── auth.test.js
        ├── designs-payments.test.js
        ├── helpers.js
        └── templates-favorites.test.js

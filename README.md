# 🌸 PetalWish

### Cards That Connect 💌

PetalWish is a beautiful and interactive **greeting card and invitation-making website** designed to help users create personalized cards for birthdays, weddings, baby showers, parties, and other special occasions.

The website provides a collection of professionally designed templates that users can explore, customize, save as favorites, and use to create memorable digital invitations and greeting cards.

---

## ✨ Features

* 🎨 **Design Studio** — Create and customize greeting cards and invitations.
* 💍 **Wedding Templates** — Wedding invitations, engagement cards, save-the-date cards, RSVP cards, and thank-you cards.
* 🎂 **Birthday Templates** — Birthday invitations, kids' birthdays, adult birthdays, milestone birthdays, and birthday cards.
* 👶 **Baby & Kids** — Baby shower, gender reveal, first birthday, baptism, and baby announcement templates.
* 🎉 **Party Templates** — Party invitations, graduation, anniversary, celebrations, and holiday parties.
* 🔍 **Template Search** — Search through available card templates.
* ❤️ **Favorites** — Save preferred templates for quick access.
* 👤 **User Profile** — Login/profile interface with options for My Designs, Favorites, and Invitations & RSVPs.
* 📱 **Responsive Design** — Designed to work across desktop and mobile screen sizes.
* 🖼️ **Template Gallery** — Browse different card designs and categories.
* 📤 **Upload Your Own** — Option to work with your own design/content.
* ✨ **Interactive Homepage** — Category sections, trending templates, animations, and interactive card previews.

---

## 🛠️ Technologies Used

| Technology       | Purpose                                             |
| ---------------- | --------------------------------------------------- |
| **HTML5**        | Structure and content of the website                |
| **CSS3**         | Styling, layouts, animations, and responsive design |
| **JavaScript**   | Interactivity and application functionality         |
| **Python**       | Local development server                            |
| **Google Fonts** | Typography and visual design                        |

The project is primarily a client-side web application, with the included `run_server.bat` file using Python's built-in HTTP server to serve the website locally.

---

## 📁 Project Structure

```text
PetalWish/
│
├── assets/
│   ├── images/
│   └── templates/
│
├── .vscode/
│
├── index.html
├── style.css
├── script.js
├── run_server.bat
└── README.md
```

The repository currently includes the main HTML page, stylesheet, JavaScript functionality, asset folders, VS Code configuration, and a Windows batch file for starting the local server.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Ananya-Rastogi/PetalWish.git
```

### 2. Navigate to the Project

```bash
cd PetalWish
```

### 3. Start the Local Server

Make sure **Node.js** (version 20 or newer) is installed on your system.

On Windows, you can run:

```bash
run_server.bat
```

The script installs the server dependencies on first run, starts the PetalWish server (website + API) and opens:

```text
http://localhost:5000
```

If `server/.env` exists, it uses the MongoDB database configured there. Otherwise it uses a temporary in-memory database, and the data is lost when the window closes.

### Backend API (Node.js + Express + MongoDB)

The `server/` folder contains the REST API: JWT login and registration, templates, designs, favorites and payment records. The website talks to it through `api.js`.

```bash
cd server
npm install
cp .env.example .env   # add your MongoDB Atlas URI and a JWT secret
npm run dev            # or: npm run dev:memory (no database needed)
```

See [server/README.md](server/README.md) for the full API reference and the MongoDB Atlas setup.

Demo accounts for testing: `elena@example.com`, `julian@example.com` and `sarah@example.com`, all with the password `petalwish2026`. The demo buttons in the login window use them.

---

## 🎯 How It Works

1. **Explore Templates**
   Browse available greeting cards and invitation designs.

2. **Choose a Category**
   Select from categories such as Wedding, Birthday, Baby & Kids, or Party.

3. **Search Templates**
   Use the search functionality to quickly find a suitable design.

4. **Preview a Template**
   View the design before selecting it.

5. **Customize Your Design**
   Open the Design Studio to personalize your card.

6. **Save Favorites**
   Save designs that you may want to use later.

7. **Create & Share**
   Create a personalized card for your special occasion.

---

## 🎨 Main Categories

### 💒 Wedding

* Wedding Invitations
* Save the Date
* Engagement
* Bridal Shower
* Bachelor/Bachelorette
* Wedding Announcements
* RSVP
* Thank You

### 🎂 Birthday

* Birthday Invitations
* Kids Birthday
* Adult Birthday
* Birthday Cards
* Milestone Birthdays

### 👶 Baby & Kids

* Baby Shower
* First Birthday
* Baptism
* Baby Announcement
* Kids

### 🎉 Party

* Party Invitations
* Graduation
* Anniversary
* Celebration
* Holiday Party

---

## 💡 Why PetalWish?

PetalWish makes creating invitations and greeting cards **simple, creative, and accessible**. Instead of designing a card from scratch, users can start with an existing template and personalize it according to their event.

The goal is to combine **beautiful designs with an easy-to-use interface** so users can focus on celebrating their special moments.

---

## 📸 Screenshots

You can add screenshots of the project here:

```markdown
![PetalWish Homepage](assets/images/homepage.png)

![Template Gallery](assets/images/templates.png)

![Design Studio](assets/images/design-studio.png)
```

---

## 🔮 Future Enhancements

Possible future improvements include:

* 🔐 Real user authentication
* ☁️ Cloud storage for user designs
* 💾 Persistent saving of customized cards
* 📧 Email invitations
* 🔗 Shareable invitation links
* 📱 Progressive Web App (PWA) support
* 🖨️ High-quality card export
* 📄 PDF download
* 🎨 More customization options
* 🗄️ Backend/database integration
* 💳 Premium templates and payment integration

---

## 📄 License

This project is intended for educational and project-development purposes.

---

## 🌷 Project Vision

> **PetalWish — Turn your special moments into beautiful memories. 💌**

Made with ❤️ for celebrations, connections, and unforgettable moments.

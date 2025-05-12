# VISA/Mastercard Validator

## 🎓 About
A nifty little web app I built as part of the CodeCademy Full Stack Engineer course. It validates VISA and Mastercard numbers using the Luhn algorithm - proper useful for checking if a card number is legitimate or not. Built with vanilla JavaScript to show off some pure JS skills (no React in sight!).

## 📸 Screenshots

### Landing Page
![Landing Page](./screenshots/landing.png)
*The main interface - clean and straightforward*

### Validation Success
![Validation Success](./screenshots/success.png)
*When everything's spot on*

### Validation Error
![Validation Error](./screenshots/error.png)
*When something's not quite right*

## 🛠️ Tech Stack
- Node.js + Express for the backend
- Plain old HTML, CSS, and JavaScript for the frontend
- No fancy frameworks - keeping it simple!

## 🚀 Getting Started

1. Clone this repo
2. Pop open your terminal and run `npm install express`
3. Fire up the server with `node server.js`
4. Head to `http://localhost:3000` in your browser

## ✨ Features

- Validates card numbers using the clever Luhn algorithm
- Works with VISA (starts with 4) and Mastercard (starts with 51-55)
- Lovely responsive interface
- Crystal clear feedback when you submit a number

## 📁 Project Structure

```
VISAMastercardValidator/
├── public/              # Frontend bits
│   ├── index.html      # Main page
│   ├── style.css       # Makes it look pretty
│   └── script.js       # Frontend logic
├── src/
│   └── validator.js    # Core validation logic
└── server.js           # Express server
```

## 🧪 Example

Try these numbers:
```
4539677908016808 → VISA: Valid (this one's good)
5795634343313212 → Mastercard: Invalid (this one's dodgy)
```

## 📝 Notes
Built this as part of my CodeCademy Full Stack Engineer course. It's a proper demonstration of DOM manipulation, form handling, and some clever algorithm implementation - all without the help of frameworks. Quite chuffed with how it turned out!

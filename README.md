# 📚 Dictionary App with Word of the Day

A modern, elegant dictionary application built with React and Tailwind CSS that allows users to search for word definitions and features an automatic "Word of the Day" that refreshes daily based on the user's timezone.

## ✨ Features

- 🔍 **Word Search**: Search for any word and get comprehensive definitions, pronunciations, and examples
- 📅 **Word of the Day**: Automatically updates daily with a new curated word based on user's local timezone
- 🌍 **Timezone-Aware**: Uses the user's local date to ensure the Word of the Day is synchronized globally
- 🔊 **Audio Pronunciation**: Listen to correct pronunciations of words (when available)
- 🎨 **Beautiful UI**: Modern, responsive design with gradient backgrounds and smooth animations
- ⚡ **Real-time Updates**: Automatically checks and updates the Word of the Day every minute
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/dictionary-app.git
   cd dictionary-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to see the app in action!

## 📁 Project Structure

```
src/
├── App.jsx                     # Main application component
└── index.js                    # Application entry point
```

## 🛠️ Technologies Used

- **React** - Frontend framework
- **Tailwind CSS** - Utility-first CSS framework
- **Free Dictionary API** - Word definitions and pronunciations
- **JavaScript ES6+** - Modern JavaScript features

## 📖 How It Works

### Word of the Day Algorithm

The Word of the Day feature uses a deterministic algorithm to ensure all users see the same word on the same date:

1. **Date Calculation**: Calculates the number of days since January 1, 2024 (epoch)
2. **Word Selection**: Uses modulo operation to select a word from the curated list
3. **Timezone Handling**: Uses the user's local timezone to determine their current date
4. **Auto-Refresh**: Checks every minute if the date has changed and updates accordingly


### API Integration

The app uses the [Free Dictionary API](https://dictionaryapi.dev/) to fetch word definitions:

```
GET https://api.dictionaryapi.dev/api/v2/entries/en/{word}
```

**Response includes:**
- Word meanings and definitions
- Part of speech (noun, verb, adjective, etc.)
- Phonetic pronunciations
- Audio pronunciation files
- Example sentences
- Synonyms and antonyms (when available)

## 🐛 Troubleshooting

### Word Not Found Error

If a word from the list isn't found in the API:
- Remove the word from the `commonWords` array
- Check spelling and ensure the word exists in the Free Dictionary API

### Word Not Updating

- Check browser console for errors
- Verify your system date and timezone are correct
- Clear browser cache and reload the page

### Audio Not Playing

- Ensure the word has an audio file in the API response
- Check browser audio permissions
- Try a different browser (some browsers block autoplay)

## 📝 API Rate Limits

The Free Dictionary API is free and doesn't require an API key, but please use it responsibly:
- Don't make excessive requests
- Cache responses when possible
- Respect their [terms of service](https://dictionaryapi.dev/)

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- [Free Dictionary API](https://dictionaryapi.dev/) for providing the word definitions
- [Tailwind CSS](https://tailwindcss.com/) for the amazing styling framework
- [React](https://reactjs.org/) for the powerful UI library


## 📊 Performance

- ⚡ Lightning-fast word lookups
- 📦 Minimal bundle size
- 🎨 Smooth animations and transitions
- 📱 Optimized for mobile devices

---

**Made with ❤️ and React**

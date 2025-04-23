# CineSpeak 🎬

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Vercel](https://vercelbadge.vercel.app/api/thanosshawn/cinespeak)](https://cinespeak.vercel.app)

CineSpeak is a dynamic web application that lets users explore, discuss, and analyze movies and web series. Powered by the [OMDb API](http://www.omdbapi.com/) for movie data and [Hugging Face](https://huggingface.co/) for AI-driven sentiment analysis and summarization, CineSpeak offers a seamless, real-time experience built with **React** and **Firebase**.

## 🌟 Features

- **Movie Exploration**: Search and browse movies using the OMDb API.
- **User Messaging**: Engage in real-time discussions about movies.
- **AI-Powered Analysis**: Analyze message sentiment and generate summaries using Hugging Face's BERT and BART models.
- **Real-Time Updates**: Instant updates via Firebase Realtime Database.
- **Responsive Design**: User-friendly interface across devices.

## 🚀 Live Demo

Experience CineSpeak at: [cinespeak.vercel.app](https://cinespeak.vercel.app)

## 🔧 Installation

### Prerequisites
- **Node.js** and **npm** installed
- A **Firebase** project with Realtime Database enabled
- A **Hugging Face** API key
- An **OMDb API** key

### Steps
1. **Clone the Repository**
   ```bash
   git clone https://github.com/thanosshawn/cinespeak.git
   cd cinespeak
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory with the following:
   ```
   REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   REACT_APP_FIREBASE_DATABASE_URL=https://your_project.firebaseio.com
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   REACT_APP_HUGGINGFACE_API_KEY=your_huggingface_api_key
   REACT_APP_OMDB_API_KEY=your_omdb_api_key
   ```

4. **Start the Development Server**
   ```bash
   npm start
   ```
   The app will run at `http://localhost:3000`.

## 🧠 AI Integration

CineSpeak leverages Hugging Face's Inference API for AI-powered features:
- **Sentiment Analysis**: Uses BERT to classify user messages as positive, negative, or neutral.
- **Summarization**: Uses BART to generate concise summaries of long discussions.
- **Workflow**:
  1. Messages are stored in Firebase Realtime Database.
  2. The frontend detects new messages and sends them to Hugging Face's API.
  3. Analysis results are stored in Firebase and displayed in the UI.

This approach avoids Firebase Cloud Functions for cost-effective deployment.

## 📁 Project Structure

```bash
cinespeak/
├── public/                  # Static assets
├── src/
│   ├── components/          # Reusable React components
│   ├── firebase/            # Firebase configuration and utilities
│   ├── utils/               # Helper functions (e.g., API calls)
│   ├── App.js               # Main app component
│   └── index.js             # Entry point
├── .env                     # Environment variables
├── package.json             # Project dependencies
└── README.md                # Project documentation
```

## 🚀 Deployment

To deploy CineSpeak on Vercel:
1. Install the Vercel CLI:
   ```bash
   npm i -g vercel
   ```
2. Run `vercel` in the project root and follow the prompts.
3. Add environment variables in Vercel’s dashboard (same as `.env`).

## 🧪 Testing

Run unit tests with:
```bash
npm test
```
Ensure all tests pass before submitting contributions.

## 🔍 Troubleshooting

- **Firebase Error**: Verify your Firebase Realtime Database rules allow read/write:
  ```json
  {
    "rules": {
      ".read": true,
      ".write": true
    }
  }
  ```
- **Hugging Face API Timeout**: Check your API key and internet connection. Consider caching results for frequent queries.
- **OMDb API Issues**: Ensure your API key is valid and not rate-limited.

## 🤝 Contributing

We welcome contributions! Follow these steps:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit changes (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request with a clear description.

Please adhere to:
- Code style: Use Prettier and ESLint (run `npm run lint`).
- Commit messages: Use clear, concise messages (e.g., `fix: resolve API timeout issue`).

## 📄 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## 📬 Contact

For questions or feedback, open an issue on [GitHub](https://github.com/thanosshawn/cinespeak) or reach out to [thanosshawn](https://github.com/thanosshawn).

---

Built with ❤️ by the CineSpeak team.

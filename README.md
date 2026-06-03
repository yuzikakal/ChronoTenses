# ⏳ Chrono Tenses

An interactive web game for learning English tenses through a time-travel adventure.

![Chrono Tenses Preview](./public/og-image.png)

<div align="center">
Live Web: <a href="https://chrono-tenses.vercel.app" target="_blank"> chrono-tenses.vercel.app </a>
</div>

## ✨ About

Chrono Tenses is an educational browser game built with Next.js where players travel across timelines and repair broken history by mastering English grammar tenses.

Instead of traditional multiple-choice exercises, players actively type the correct answers to restore Chrono Energy and stabilize the timeline.

## 🎮 Features

- Interactive English tense gameplay
- Story-driven tutorial experience
- Real-time answer feedback
- Timeline-based learning system
- Responsive UI for desktop & mobile
- Immersive visual novel inspired presentation
- Persistent game progress using localStorage

## 🧠 Learning Focus

Players learn:

- Present Tenses
- Past Tenses
- Future Tenses
- Grammar consistency
- Contextual sentence understanding

## 🛠 Tech Stack

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=nextjs,ts,js,tailwind,react,arch&theme=dark" alt="Tech Stack" />
  </a>
</div>

- **Framer Motion** (Animation)
- **Lucide React** (Icons)

## 🚀 Getting Started

Clone the repository:

```bash
git clone https://github.com/yuzikakal/ChronoTenses.git
```

Install dependencies:

```bash
npm install 
# or 
bun i
```

Run development server:

```bash
npm run dev 
# or 
bun dev
```

Open your browser to see the result:

```txt
http://localhost:3000
```

## 📂 Project Structure

```txt
app/
 ├── game/
 ├── story/
 └── hooks/
components/
 ├── panel/
 ├── providers/
 └── view/
lib/
 └── aiEngine/
public/
 ├── characters/
 ├── icons/
 ├── music/
 ├── sfx/
 └── tutorial/

```

## 🌌 Gameplay Flow

```txt
Home Page
   ↓
Story
   ↓
Tutorial
   ↓
Module
   ↓
Timeline Repair Gameplay
   ↓
Result Screen
```

## 📸 Screenshots

### Landing Page

<div align="center">

<table>
<tr>
<td align="center" width="50%">

Desktop View

<img src="./public/landingpage_d.png" alt="Desktop Preview" width="100%">

</td>

<td align="center" width="50%">

Mobile View

<img src="public/landingpage_m.png" alt="Mobile Preview" width="70%">

</td>
</tr>
</table>

</div>

### Story Page

<div align="center">

<table>
<tr>
<td align="center" width="50%">

Desktop View

<img src="./public/story_d.png" alt="Desktop Preview" width="100%">

</td>

<td align="center" width="50%">

Mobile View

<img src="public/story_m.png" alt="Mobile Preview" width="70%">

</td>
</tr>
</table>

</div>

### Gameplay Page

<div align="center">

<table>
<tr>
<td align="center" width="50%">

Desktop View

<img src="./public/gameplay_d.png" alt="Desktop Preview" width="100%">

</td>

<td align="center" width="50%">

Mobile View

<img src="public/gameplay_m.png" alt="Mobile Preview" width="70%">

</td>
</tr>
</table>

</div>

## 🔍 SEO

Chrono Tenses includes:

- Sitemap support
- Robots.txt configuration
- Open Graph metadata
- Twitter Cards
- Structured Data (JSON-LD)

## 🌟 Credits & Acknowledgments

While the core game concept, character designs (Chrono), and UI/UX structures are original creations, this project utilizes several royalty-free assets to bring the time-travel environment to life:

- **Environmental Backgrounds:** Sourced from royalty-free illustration platforms (e.g., Freepik).
- **Audio (BGM & SFX):** Sourced from free-to-use and royalty-free audio libraries.

*Massive thanks to the open-source community and free-asset creators for making indie educational projects like this possible!*

## 🤖 AI Co-Creation & Development

This project was developed by leveraging AI assistance (such as Gemini/ChatGPT) for pair programming, code optimization, and architectural brainstorming. 

AI was utilized for:
- Refactoring React states and managing transition flows smoothly.
- Optimizing Tailwind CSS classes for game layouts like scrollbars and buttons.
- Designing prompt frameworks and AI output filter systems for dynamic grammar question evaluation.
- Generating and structuring the core question bank.

*The core game concept, gameplay loop, UI/UX structure, and character illustrations remain original works by the author.*

## 👤 Author

Created by Yuzikakal

- GitHub: https://github.com/yuzikakal
- Instagram  : https://instagram.com/yuzika_kalzamzami
- Facebook   : https://facebook.com/yuzikakal2
- Portofolio : https://yuzika5.wordpress.com

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

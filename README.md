# Shije Website (`shije-website`)

The web frontend for **Shije** — an EdTech platform offering live interactive classes and on-demand lecture recordings.

## Tech Stack
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Streaming**: WebRTC / HLS compatible player

## Project Structure
```
shije-website/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   ├── (dashboard)/
│   │   │   ├── dashboard/page.tsx     # Student hub & upcoming live classes
│   │   │   ├── live/[id]/page.tsx     # Live classroom with chat & stream
│   │   │   └── recordings/[id]/page.tsx # Recording player with chapters
│   │   ├── courses/                   # Course catalog and course detail
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx                   # Landing page
│   ├── components/
│   │   ├── classroom/                 # LiveStreamPlayer, LiveChat
│   │   ├── recordings/                # VideoPlayer, ChapterList
│   │   └── layout/                    # Navbar, Footer
│   ├── lib/                           # API fetcher and client utilities
│   └── types/                         # TypeScript interfaces (Course, LiveClass, Recording)
├── public/                            # Static assets
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Setup environment variables:
   ```bash
   cp .env.example .env.local
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

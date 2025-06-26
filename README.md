# TrackAI

TrackAI is a Next.js web application that allows users to scrape Amazon product data, view live price history, and receive deal alerts. It provides a modern UI for searching, tracking, and analyzing products, leveraging server-side scraping and a MongoDB backend.

## Features

- **Amazon Product Scraping:** Get live product data, including price, images, and availability.
- **Price History Tracking:** Visualize historical price changes for each product.
- **Deal Alerts:** Users can subscribe to products and receive email notifications for price drops or deals.
- **Trending Products:** Discover popular and trending products among users.
- **Modern UI:** Responsive, animated interface with carousels, modals, and interactive cards.

## Tech Stack

- **Frontend:** Next.js (App Router), React, Tailwind CSS, Framer Motion, GSAP
- **Backend:** Node.js, Next.js API routes, Mongoose (MongoDB)
- **Scraping:** Puppeteer, Cheerio, ScraperAPI
- **Email:** Nodemailer
- **Other:** Axios, Headless UI, Lucide React, React Hot Toast

## Getting Started

### Prerequisites

- Node.js 18.x
- MongoDB instance (local or cloud)
- ScraperAPI key (for Amazon scraping)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd trackai
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**
   - Create a `.env.local` file with your MongoDB URI and ScraperAPI key:
     ```
     MONGODB_URI=your_mongodb_uri
     SCRAPER_API_KEY=your_scraperapi_key
     ```

4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## Project Structure

```
app/
  page.jsx                # Landing page with search and trending products
  products/[id]/page.tsx  # Dynamic product details page
  api/                    # API routes for scraping and cron jobs

components/
  HeroCarousel.tsx        # Animated hero section
  ProductCard.tsx         # Product display card
  Modal.tsx               # Email subscription modal
  ...                     # Other UI components

lib/
  scraper/                # Amazon scraping logic
  actions/                # Backend actions (CRUD, email, etc.)
  models/                 # Mongoose models
  nodemailer/             # Email utilities
  utils.ts                # Utility functions

public/assets/            # Icons and images
```

## Key Files & Directories

- **`lib/scraper/index.ts`**: Scrapes Amazon product data using Cheerio and ScraperAPI.
- **`lib/models/product.model.ts`**: Mongoose schema for storing product info and price history.
- **`lib/actions/index.ts`**: Server actions for scraping, storing, and retrieving products, and handling user subscriptions.
- **`app/products/[id]/page.tsx`**: Product details page with price history, stats, and similar products.
- **`components/`**: Modular, reusable UI components.

## API Endpoints

- **`/api/scrape`**: Triggers product scraping.
- **`/api/cron`**: (For scheduled tasks, e.g., updating prices.)

## Customization

- **Styling:** Tailwind CSS is used for rapid UI development.
- **Animation:** Framer Motion and GSAP for smooth transitions and effects.
- **Email:** Configure `lib/nodemailer` for custom email templates and providers.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)

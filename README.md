# Doc-Verse

Doc-Verse is a modern, responsive, and minimalistic web application for managing doctor profiles and appointments. It features dynamic search, filtering, and detailed views with an engaging UI built with React, TypeScript, Tailwind CSS, and Lucide icons.

## Features

- **Doctor Listing:** View a list of doctors with their specialties, experience, fees, and consultation modes.
- **Detail View:** Click on a doctor to view detailed information including clinic details, languages, and introduction.
- **Filtering & Search:** Filter doctors by specialties, consultation mode, and sort by fees or experience.
- **Responsive Design:** Built with Tailwind CSS for a responsive, modern, and minimalistic design.
- **Modern Tooling:** Leveraging Vite for fast development with TypeScript, React, and efficient bundling.

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/Doc-Verse.git
   ```

2. Navigate to the project folder:

   ```bash
   cd Doc-Verse
   ```

3. Install dependencies:

   ```bash
   npm install
   # or with yarn
   yarn install
   ```

### Running the Application

To start the development server:

```bash
npm run dev
# or with yarn
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000) (or the port specified by Vite).

### Building for Production

To build the app for production, run:

```bash
npm run build
# or with yarn
yarn build
```

Then preview the production build:

```bash
npm run preview
# or with yarn
yarn preview
```

## Project Structure

- **`src/`**  
  Contains all the source code.
  - **`components/`**: React components for DoctorCard, DoctorDetails, DoctorList, FilterPanel, SearchBar, etc.
  - **`api/`**: API calls (e.g., fetching doctor data).
  - **`hooks/`**: Custom hooks such as `useSearchParams`.
  - **`types/`**: Type definitions.
  - **`index.css`**: Global Tailwind CSS imports.
  - **`App.tsx`**: Main application and route definitions.
  
- **`index.html`**  
  The HTML template including meta and favicon specifications.

- **`vite.config.ts`**  
  Vite configuration file.

- **`tailwind.config.js`**  
  Tailwind CSS configuration file.

## Customization

- **Favicon:**  
  Change the favicon by replacing the SVG image at `/assets/stethoscope.png` with your preferred blue stethoscope icon.
  
- **Styling:**  
  Tailwind CSS is used for styling. Modify the `tailwind.config.js` or add custom CSS classes in `index.css` as required.

## License

This project is licensed under the Apache License 2.0. See the [LICENSE](./LICENSE) file for details.

## Acknowledgements

- Built with [React](https://reactjs.org/), [Vite](https://vitejs.dev/), [Tailwind CSS](https://tailwindcss.com/), and [Lucide Icons](https://lucide.dev/).
- Data fetching is powered by a campus API mock.

---

Feel free to contribute, report issues, or suggest enhancements to make Doc-Verse even better!
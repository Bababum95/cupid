```
/cupid
├── /public
│   ├── /fonts                     # Static fonts for the project
│   └── favicon.ico                # Site favicon
├── /src
│   ├── /app
│   │   ├── /api                   # API routes
│   │   │   └── route.ts           # Example of a basic API route
│   │   └── /[locale]              # Localized pages
│   │       └── layout.tsx         # Common layout for all pages
│   ├── /components                # React components
│   ├── /graphql                   # GraphQL queries and mutations
│   ├── /i18n                      # Internationalization (i18n)
│   │   ├── /messages              # Localized messages
│   │   ├── config.ts              # i18n configuration
│   │   ├── request.ts             # i18n request functions (might need a more specific name)
│   │   └── routing.ts             # Localized routing
│   ├── /lib                       # Libraries and services
│   │   ├── logger.ts              # Winston logger for the project
│   │   └── shopify.ts             # Shopify integration service
│   ├── /styles                    # Project styles
│   │   ├── /mixins                # SCSS mixins
│   │   └── globals.scss           # Global styles for the entire app
│   ├── /types                     # TypeScript types
│   ├── /utils                     # Utility functions
│   └── middleware.ts              # Middleware for handling requests
├── .env.local                     # Local environment variables
├── .eslintrc.json                 # ESLint configuration
├── .gitignore                     # Files and directories ignored by Git
├── next.config.mjs                # Next.js configuration
├── package.json                   # Project dependencies and scripts
├── README.md                      # Project documentation
└── tsconfig.json                  # TypeScript configuration
```

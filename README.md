```
📂 cupid
├── 📂 public
│   ├── 📂 cookie                            # Cookie preferences localization
│   ├── 📂 fonts                             # Static fonts for the project
│   ├── 📂 images                            #
│   │   ├── 📂 gallery                       #
│   │   ├── 📂 payments                      #
│   │   └── 📂 posters                       #
│   ├── 📂 videos                            #
│   ├── favicon.ico                          # Site favicon
│   ├── robots.txt                           #
│   ├── site.webmanifest                     #
│   └── sitemap.xml                          #
├── 📂 src                                   # Source code
│   ├── 📂 app                               #
│   │   ├── 📂 api                           # API routes
│   │   │   └── route.ts                     # Example of a basic API route
│   │   └── 📂 [locale]                      # Localized pages
│   │       ├── 📂 (about)                   #
│   │       │   ├── 📂 imprint               #
│   │       │   ├── 📂 privacy-policy        #
│   │       │   ├── 📂 refund-policy         #
│   │       │   ├── 📂 terms-of-service      #
│   │       │   └── layout.tsx               #
│   │       ├── 📂 cart                      #
│   │       │   ├── page.module.scss         #
│   │       │   └── page.tsx                 #
│   │       ├── 📂 sex-chocolate             #
│   │       ├── 📂 config.ts                 #
│   │       ├── 📂 layout.tsx                # Common layout for all pages
│   │       ├── 📂 Loading.module.scss       #
│   │       ├── 📂 loading.tsx               #
│   │       ├── 📂 page.module.scss          #
│   │       ├── page.tsx                     #
│   │       ├── config.ts                    #
│   │       └── StoreProvider.tsx            #
│   ├── 📂 components                        # React components
│   ├── 📂 icons                             # SVG icons for the project
│   ├── 📂 graphql                           # GraphQL queries and mutations
│   ├── 📂 hooks                             # Custom hooks
│   ├── 📂 i18n                              # Internationalization (i18n)
│   │   ├── 📂 messages                      # Localized messages
│   │   ├── config.ts                        # i18n configuration
│   │   ├── request.ts                       # i18n request functions (might need a more specific name)
│   │   └── routing.ts                       # Localized routing
│   ├── 📂 lib                               # Libraries and services
│   │   ├── slices.ts                        #
│   │   ├── logger.ts                        # Winston logger for the project
│   │   ├── mongodb.ts                       #
│   │   ├── shopify.ts                       # Shopify integration service
│   │   └── store.ts                         # Redux store for the project
│   ├── 📂 models                            #
│   │   └── Comment.ts                       #
│   ├── 📂 styles                            # Project styles
│   │   ├── 📂 mixins                        # SCSS mixins
│   │   └── globals.scss                     # Global styles for the entire app
│   ├── 📂 types                             # TypeScript types
│   ├── 📂 utils                             # Utility functions
│   └── middleware.ts                        # Middleware for handling requests
├── .env                                     # Local environment variables
├── .eslintrc.json                           # ESLint configuration
├── .gitignore                               # Files and directories ignored by Git
├── next.config.mjs                          # Next.js configuration
├── package.json                             # Project dependencies and scripts
├── README.md                                # Project documentation
└── tsconfig.json                            # TypeScript configuration
```

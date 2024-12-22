Authenticated Todo app with TRPC, Next.js, Prisma, jotai
The app uses optimistic updates for all mutations.
Auth is via link email.

- [Next.js]
- [NextAuth.js]
- [Prisma]
- [Tailwind CSS]
- [tRPC]
- [Jotai]

- Overview
This application is a full-stack Todo app built with Next.js, NextAuth.js for authentication, Prisma for database management, and Jotai for state management. The app allows users to manage their todos and profile information.

- Key Components and File

- _app.tsx: Custom App component for Next.js.
This file sets up the global context for the application, including session management and toast notifications. 
SessionProvider: Wraps the application to provide session context.
Toaster: Provides toast notifications.
api.withTRPC: Wraps the App component to enable tRPC functionality.

- index.tsx: Home page component.
The main page component that displays the todos and profile information.
useSession: Fetches session data to determine if the user is signed in.
useAtom: Manages the state of the profile modal.
Todos and CreateTodo: Display and create todos.
UserProfile: Displays and edits user profile information.


- Todos.tsx: Component to display the list of todos.
useQuery: Fetches all todos from the API.
Todo: Renders each todo item.

- CreateTodo.tsx: Component to create a new todo.
useState: Manages the state of the new todo input.
useMutation: Handles the creation of a new todo with optimistic updates.

- UserProfile.tsx: Component to display and edit user profile information.
useQuery: Fetches user data from the API.
useMutation: Handles updating user profile information.
useState: Manages the state of the form data and edit mode.

- profileatoms.ts: Jotai atom for managing the state of the profile modal.
atom: Defines an atom to manage the state of the profile modal.

- db.ts: Prisma client setup.
PrismaClient: Initializes the Prisma client.
Singleton Pattern: Ensures a single instance of the Prisma client is used.

- auth.ts: NextAuth.js configuration.
PrismaAdapter: Integrates Prisma with NextAuth.js.
EmailProvider: Configures email authentication.
getServerAuthSession: Wrapper for getServerSession to simplify usage.

- trpc.ts: tRPC setup for API routes.
createNextApiHandler: Sets up tRPC API handler.
appRouter: Defines the API routes.
createTRPCContext: Creates the context for each request.

- Prisma Integration
Prisma is used as the ORM to interact with the database. The Prisma client is initialized in db.ts and used throughout the application to perform database operations.
Prisma Schema: Defines the database schema and models.
Prisma Client: Provides methods to interact with the database.
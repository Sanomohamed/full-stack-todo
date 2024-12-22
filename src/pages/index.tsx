// Explanation:
// 1. Imports necessary modules and components, including Head for setting HTML head elements, next-auth for authentication, and Jotai for state management.
// 2. Defines the Home component, which uses the useSession hook to get session data and the useAtom hook to manage the state of the profile modal.
// 3. Renders the main content of the page, including a title, description, and favicon.
// 4. If the user is signed in, displays the Todos and CreateTodo components, and a button to open the profile modal.
// 5. If the user is not signed in, displays a message prompting the user to sign in and a button to sign in.
// 6. If the user is signed in, displays the user's email and a button to sign out.
// 7. If the profile modal is open, displays the UserProfile component and a button to close the modal.

import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import { Todos } from "../components/Todos";
import { CreateTodo } from "../components/CreateTodo";
import { useAtom } from "jotai";
import { isProfileOpenAtom } from "../atoms/profileatoms"; // Import the Jotai atom
import { UserProfile } from "../components/userprofile";

function Home(props) {
  const { data: sessionData } = useSession();

  const [isProfileOpen, setIsProfileOpen] = useAtom(isProfileOpenAtom); // Use the Jotai atom

  return (
    <>
      <Head>
        <title>Full Stack Todo App</title>
        <meta name="description" content="Full Stack Todo App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#0f1235] to-[#090920]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          {sessionData ? (
            <div className="grid grid-cols-1 gap-4 md:gap-8">
              <div className="flex flex-col gap-4 rounded-xl bg-white/10 p-4 text-white">
                <h3 className="text-xl font-bold">Todos</h3>
                <Todos />
                <CreateTodo />
              </div>
              <div className="p-6 bg-white rounded shadow">
                <button
                  onClick={() => setIsProfileOpen(true)} // Open the profile modal
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Open Profile
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <p className="text-center text-l text-white">
                Please sign in to manage your Todos and Profile.
              </p>
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => void signIn()}
              >
                Sign in
              </button>
            </div>
          )}

          {sessionData && (
            <div className="flex flex-col items-center gap-2">
              <p className="text-center text-l text-white">
                Logged in as {sessionData.user?.email}
              </p>
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => void signOut()}
              >
                Sign out
              </button>
            </div>
          )}
        </div>

        {isProfileOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-md">
              <UserProfile />
              <button
                onClick={() => setIsProfileOpen(false)} // Close the profile modal
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}

      </main>
    </>
  );
}

export default Home;
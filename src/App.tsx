import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes";
import { MatchesProvider } from "./context/matches/context";
import { NewsProvider } from "./context/news/context";
import { SportProvider } from ".//context/sport/context";
import { TeamProvider } from "./context/teams/context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className={`w-full mx-auto`}>
      <MatchesProvider>
        <NewsProvider>
          <SportProvider>
            <TeamProvider>
              <RouterProvider router={router} />
            </TeamProvider>
          </SportProvider>
        </NewsProvider>
      </MatchesProvider>
      <ToastContainer />
    </div>
  );
}

export default App;

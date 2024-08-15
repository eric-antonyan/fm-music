import { FC } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
} from "react-router-dom";
import Home from "./screens/Home";
import "./index.css";
import "./App.css";
import Auth from "./screens/Auth";
import LoggedInHome from "./screens/LoggedInHome";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Theme } from "@radix-ui/themes";
import { NextUIProvider } from "@nextui-org/react";
import "@radix-ui/themes/styles.css";
import ProfilePage from "./screens/ProfilePage";
import AuthProvider from "./contexts/UserProvider";
import AccountManage from "./screens/AccountManage";
import SongProvider from "./contexts/SongProvider";
import { AnimatePresence } from "framer-motion";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Favorites from "./screens/Favorites";
import { FavoritesProvider } from "./contexts/FavoritesProvider";
import Playlists from "./screens/Playlists";
import NotFound from "./screens/NotFound";
import PlaylistsProvider from "./contexts/PlaylistsProvider";
import Playlist from "./screens/Playlist";

const AppContent: FC = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
                <Route
                    path="/home"
                    element={
                        <SongProvider>
                            <FavoritesProvider>
                                <PlaylistsProvider>
                                    <LoggedInHome />
                                </PlaylistsProvider>
                            </FavoritesProvider>
                        </SongProvider>
                    }
                />
                <Route path="/home/profile" element={<ProfilePage />} />
                <Route
                    path="/home/favorites"
                    element={
                        <FavoritesProvider>
                            <PlaylistsProvider>
                                <SongProvider>
                                    <Favorites />
                                </SongProvider>
                            </PlaylistsProvider>
                        </FavoritesProvider>
                    }
                />
                <Route
                    path="/home/playlists"
                    element={
                        <FavoritesProvider>
                            <SongProvider>
                                <PlaylistsProvider>
                                    <Playlists />
                                </PlaylistsProvider>
                            </SongProvider>
                        </FavoritesProvider>
                    }
                />
                <Route
                    path="/home/playlists/:identificator"
                    element={
                        <FavoritesProvider>
                            <SongProvider>
                                <PlaylistsProvider>
                                    <Playlist />
                                </PlaylistsProvider>
                            </SongProvider>
                        </FavoritesProvider>
                    }
                />
                <Route
                    path="/home/profile/manage"
                    element={<AccountManage />}
                />
                <Route path="/home/*" element={<NotFound />} />
            </Routes>
        </AnimatePresence>
    );
};

const App: FC = () => {
    const client = new QueryClient();

    return (
        <ChakraProvider>
            <Theme>
                <NextUIProvider>
                    <QueryClientProvider client={client}>
                        <AuthProvider>
                            <Router>
                                <AppContent />
                                <ReactQueryDevtools />
                            </Router>
                        </AuthProvider>
                    </QueryClientProvider>
                </NextUIProvider>
            </Theme>
        </ChakraProvider>
    );
};

export default App;

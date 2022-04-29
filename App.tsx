import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Session } from "@supabase/supabase-js";
import { useState, useEffect, createContext } from "react";
import { Alert } from "react-native";
import "react-native-url-polyfill/auto";
import { ApiError } from "@supabase/supabase-js";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { supabase } from "./lib/supabase";
import Auth from "./components/Auth";
import { TroveContext } from "./context/TroveContext";
import { SessionContext } from "./context/SessionContext";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [session, setSession] = useState<Session | null>(null);
  const [items, setItems] = useState([]);
  const [lists, setLists] = useState([]);
  const [itemsLoading, setItemsLoading] = useState(true);
  const [listsLoading, setListsLoading] = useState(true);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, [session]);

  useEffect(() => {
    if (session) getItems();
  }, [session]);

  useEffect(() => {
    if (session) getLists();
  }, [session]);

  async function getItems() {
    try {
      const user = supabase.auth.user();
      if (!user) throw new Error("No user on the session!");

      let { data, error, status } = await supabase.from("item").select("*");
      // .eq("user_id", user.id)

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setItems(data);
      }
    } catch (error) {
      Alert.alert((error as ApiError).message);
    } finally {
      setItemsLoading(false);
    }
  }

  async function getLists() {
    try {
      const user = supabase.auth.user();
      if (!user) throw new Error("No user on the session!");

      let { data, error, status } = await supabase
        .from("list")
        .select("*")
        .order("name", { ascending: true });
      // .eq("user_id", user.id)

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setLists(data);
      }
    } catch (error) {
      Alert.alert((error as ApiError).message);
    } finally {
      setListsLoading(false);
    }
  }

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        {session && session.user ? (
          <SessionContext.Provider value={session}>
            <TroveContext.Provider
              value={{
                items: items,
                refreshItems: () => getItems(),
                lists: lists,
                refreshLists: () => getLists(),
              }}
            >
              <Navigation colorScheme={colorScheme} />
            </TroveContext.Provider>
          </SessionContext.Provider>
        ) : (
          <Auth />
        )}
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

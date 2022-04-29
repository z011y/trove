import { useState } from "react";
import { ApiError } from "@supabase/supabase-js";

import { supabase } from "../lib/supabase";

export default function useTroveItem() {
  const [items, setItems] = useState([]);
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
        formatItems(data, filter);
      }
    } catch (error) {
      Alert.alert((error as ApiError).message);
    } finally {
      setLoading(false);
    }
  }

  const sortByBrand = (items: any) => {
    let brands = {};
    items.forEach((item: any) => {
      if (item.brand) {
        if (brands[item.brand]) {
          brands[item.brand].push(item);
        } else {
          brands[item.brand] = [item];
        }
      }
    });
    let sortedBrands = Object.keys(brands).sort();
    let sortedItems = [];
    sortedBrands.forEach((brand: string) => {
      sortedItems.push({ title: brand, data: brands[brand] });
    });

    return sortedItems;
  };

  const sortByDate = (items: any, filter: string) => {
    let todayItems: string[] = [];
    let yesterdayItems: string[] = [];
    let lastWeekItems: string[] = [];
    let lastMonthItems: string[] = [];
    let lastYearItems: string[] = [];

    items.forEach((item: any) => {
      let date = new Date(
        filter === "dateAdded" ? item.created_at : item.last_viewed
      );
      let today = new Date();
      let yesterday = new Date(new Date().setDate(today.getDate() - 1));
      let lastWeek = new Date(new Date().setDate(today.getDate() - 7));
      let lastMonth = new Date(new Date().setMonth(today.getMonth() - 1));
      let lastYear = new Date(new Date().setFullYear(today.getFullYear() - 1));

      if (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      ) {
        todayItems.push(item);
      } else if (
        date.getDate() === yesterday.getDate() &&
        date.getMonth() === yesterday.getMonth() &&
        date.getFullYear() === yesterday.getFullYear()
      ) {
        yesterdayItems.push(item);
      } else if (
        date.getDate() >= lastWeek.getDate() &&
        date.getMonth() >= lastWeek.getMonth() &&
        date.getFullYear() >= lastWeek.getFullYear()
      ) {
        lastWeekItems.push(item);
      } else if (
        date.getDate() >= lastMonth.getDate() &&
        date.getMonth() >= lastMonth.getMonth() &&
        date.getFullYear() >= lastMonth.getFullYear()
      ) {
        lastMonthItems.push(item);
      } else if (
        date.getDate() >= lastYear.getDate() &&
        date.getMonth() >= lastYear.getMonth() &&
        date.getFullYear() >= lastYear.getFullYear()
      ) {
        lastYearItems.push(item);
      }
    });

    let sections = [];
    todayItems.length > 0
      ? sections.push({ title: "Today", data: todayItems })
      : null;
    yesterdayItems.length > 0
      ? sections.push({ title: "Yesterday", data: yesterdayItems })
      : null;
    lastWeekItems.length > 0
      ? sections.push({ title: "Last Week", data: lastWeekItems })
      : null;
    lastMonthItems.length > 0
      ? sections.push({ title: "Last Month", data: lastMonthItems })
      : null;
    lastYearItems.length > 0
      ? sections.push({ title: "Last Year", data: lastYearItems })
      : null;

    return sections;
  };

  const formatItems = (
    items: any,
    filter: "dateAdded" | "recentlyViewed" | "byBrand"
  ) => {
    if (filter === "dateAdded" || "recentlyViewed") {
      setItems(sortByDate(items, filter));
    } else {
      setItems(sortByBrand(items));
    }
  };

  return items;
}

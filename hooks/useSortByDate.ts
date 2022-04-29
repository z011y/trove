export default function sortByDate(items: any, filter: string) {
  let todayItems: string[] = [];
  let yesterdayItems: string[] = [];
  let lastWeekItems: string[] = [];
  let lastMonthItems: string[] = [];
  let lastYearItems: string[] = [];
  let olderItems: string[] = [];

  items.forEach((item: any) => {
    let date = new Date(
      filter === "dateAdded" ? item.created_at : item.last_viewed
    );
    let today = new Date();
    let yesterday = new Date(new Date().setDate(today.getDate() - 1));
    let lastWeek = new Date(new Date().setDate(today.getDate() - 7));
    let lastMonth = new Date(new Date().setMonth(today.getMonth() - 1));
    let lastYear = new Date(new Date().setFullYear(today.getFullYear() - 1));
    let lastDayOfPreviousMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      0
    ).getDate();

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
      (date.getDate() >= lastWeek.getDate() &&
        date.getMonth() === lastWeek.getMonth() &&
        date.getFullYear() >= lastWeek.getFullYear()) ||
      (date.getDate() <= lastDayOfPreviousMonth - lastWeek.getDate() &&
        date.getMonth() === lastWeek.getMonth() + 1 &&
        date.getFullYear() >= lastWeek.getFullYear())
    ) {
      lastWeekItems.push(item);
    } else if (
      (date.getDate() >= lastMonth.getDate() &&
        date.getMonth() === lastMonth.getMonth() &&
        date.getFullYear() >= lastMonth.getFullYear()) ||
      (date.getDate() <= lastMonth.getDate() &&
        date.getMonth() === lastMonth.getMonth() + 1 &&
        date.getFullYear() >= lastMonth.getFullYear())
    ) {
      lastMonthItems.push(item);
    } else if (
      (date.getDate() >= lastYear.getDate() &&
        date.getMonth() === lastYear.getMonth() &&
        date.getFullYear() >= lastYear.getFullYear()) ||
      (date.getMonth() !== lastYear.getMonth() &&
        date.getFullYear() >= lastYear.getFullYear())
    ) {
      lastYearItems.push(item);
    } else {
      olderItems.push(item);
    }
  });

  let sections = [];
  todayItems.length > 0
    ? sections.push({ title: "Today", data: [todayItems] })
    : null;
  yesterdayItems.length > 0
    ? sections.push({ title: "Yesterday", data: [yesterdayItems] })
    : null;
  lastWeekItems.length > 0
    ? sections.push({ title: "Last Week", data: [lastWeekItems] })
    : null;
  lastMonthItems.length > 0
    ? sections.push({ title: "Last Month", data: [lastMonthItems] })
    : null;
  lastYearItems.length > 0
    ? sections.push({ title: "Last Year", data: [lastYearItems] })
    : null;
  olderItems.length > 0
    ? sections.push({ title: "Older", data: [olderItems] })
    : null;

  return sections;
}

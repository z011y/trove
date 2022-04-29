export default function useSortByBrand(items: any) {
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
    sortedItems.push({ title: brand, data: [brands[brand]] });
  });

  return sortedItems;
}

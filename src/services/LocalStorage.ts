import AsyncStorage from "@react-native-async-storage/async-storage";
import { Item } from "../helpers/types";

class LocalStorage {
  async initializeItems(itemList: Item[]) {
    if (itemList.length > 0) {
      itemList.splice(0, itemList.length);
    }
    itemList.push(...itemList);
  }

  async setItem(item: Item): Promise<void> {
    return AsyncStorage.setItem(`@item:${item.id}`, JSON.stringify(item));
  }

  async deleteItem(itemId: number): Promise<void> {
    return AsyncStorage.removeItem(`@item:${itemId}`);
  }

  async getAllItems(): Promise<Item[]> {
    return AsyncStorage.getAllKeys()
      .then((keys: string[]) => {
        const fetchKeys = keys.filter((k) => {
          return k.startsWith("@item:");
        });
        return AsyncStorage.multiGet(fetchKeys);
      })
      .then((result) => {
        return result.map((r) => {
          return JSON.parse(String(r[1])) as Item;
        });
      });
  }
}

const localStorage = new LocalStorage();
export default localStorage;

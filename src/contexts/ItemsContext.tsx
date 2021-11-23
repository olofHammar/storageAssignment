import React, { createContext, useState, FC, useEffect } from "react";
import { Item, ItemContextState } from "../helpers/types";
import localStorage from "../services/LocalStorage";
import { tokens } from "../translation/appStructur";
import { translate } from "../translation/translation";

const contextDefaultValues: ItemContextState = {
  items: [],
  saveItem: () => {},
  updateItem: () => {},
  deleteItem: () => {},
};

export const ItemsContext =
  createContext<ItemContextState>(contextDefaultValues);

const ItemsProvider: FC = ({ children }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [updateList, setUpdateList] = useState(false);

  useEffect(() => {
    localStorage.getAllItems().then((itemList) => setItems(itemList));
    setUpdateList(false);
    console.log(items);
  }, [updateList]);

  const saveItem = (newItem: Item) => {
    const itemExists = items.findIndex((n) => newItem.name.toLowerCase() === n.name.toLowerCase());

    if (itemExists < 0) {
      setItems((item) => [...item, newItem]);
      localStorage.setItem(newItem);
      setUpdateList(true);
    } else {
      alert(translate(tokens.screens.itemDetailScreen.AlertItemExistsMsg));
    }
  };

  const updateItem = (newItem: Item) => {
    const itemExists = items.findIndex(
      (n) => newItem.name.toLowerCase() === n.name.toLowerCase() && newItem.id != n.id
    );
    const idx = items.findIndex((n) => newItem.name === n.name);

    if (itemExists < 0) {
      items[idx] = newItem;
      localStorage.setItem(newItem);
      setUpdateList(true);
    } else {
      alert(translate(tokens.screens.itemDetailScreen.AlertItemExistsMsg));
    }
  };

  const deleteItem = (item: Item) => {
    const idx = items.findIndex((n) => n.id === item.id);

    if (idx < 0) {
      alert("Couldn't find item.");
    } else {
      items.splice(idx, 1);
      localStorage.deleteItem(item.id);
      setUpdateList(true);
    }
  };

  return (
    <ItemsContext.Provider
      value={{
        items,
        saveItem,
        updateItem,
        deleteItem,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
};

export default ItemsProvider;

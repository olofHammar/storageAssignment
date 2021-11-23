export type TabScreens = {
  Storage: undefined;
  Account: undefined;
};

export type StackScreens = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ScreenWithTabs: undefined;
  ItemDetailScreen: {
    newItem: boolean;
    itemId: number;
    itemName: string;
    itemType: string;
    itemPrice: string;
  };
};

export interface Item {
  id: number;
  name: string;
  type: string;
  price: number;
}

export type ItemContextState = {
  items: Item[];
  saveItem: (item: Item) => void;
  updateItem: (item: Item) => void;
  deleteItem: (item: Item) => void;
};

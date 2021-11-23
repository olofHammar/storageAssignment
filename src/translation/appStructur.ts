enum LoginScreen {
  LoginBtnText = "login-screen-login-btn-text",
  RegisterBtnText = "login-screen-register-btn-text",
  LoginEmailPlaceholder = "login-screen-email-placeholder",
  LoginPasswordPlaceholder = "login-screen-password-placeholder",
}

enum RegisterScreen {
  BackBtnText = "register-screen-back-btn-text",
  RepeatPasswordPlaceholder = "register-screen-repeat-password-placeholder",
}

enum TabItems {
  StorageItem = "tab-screen-storage-item",
  AccountItem = "tab-screen-account-item",
}

enum StorageScreen {
  EmptyStorageMsg = "storage-screen-empty-storage-msg",
  ItemType = "storage-screen-item-type",
  Price = "storage-screen-item-price",
  StorageBorderTitle = "storage-screen-border-title",
}

enum AccountScreen {
  CurrentUser = "account-screen-current-user",
  SignOutBtnText = "account-screen-sign-out-btn-text",
  AccountBorderTitle = "account-screen-border-title",
}

enum ItemDetailScreen {
  CreateNewItem = "item-detail-screen-create-new-item",
  EditItem = "item-detail-screen-edit-item",
  NamePlaceHolder = "item-detail-screen-name-place-holder",
  SelectItemType = "item-detail-screen-select-item-type",
  CancelBtnText = "item-detail-screen-cancel-btn-text",
  SaveBtnText = "item-detail-screen-save-btn-text",
  DeleteItem = "item-detail-screen-delete-item-text",
  DeleteItemMsg = "item-detail-screen-delete-item-msg",
  DeleteBtnText = "item-detail-screen-delete-btn-text",
  AlertErrorMsg = "item-detail-screen-alert-error-msg",
  AlertEnterAllFieldsMsg = "item-detail-screen-enter-all-fields-msg",
  AlertItemExistsMsg = "item-detail-screen-item-exists-msg",
}

export const tokens = {
  screens: {
    loginScreen: LoginScreen,
    registerScreen: RegisterScreen,
    tabItems: TabItems,
    storageScreen: StorageScreen,
    accountScreen: AccountScreen,
    itemDetailScreen: ItemDetailScreen,
  },
};

import { nanoid } from "nanoid";

import { STORAGE_KEYS } from "../constants/storage-keys";

export function generateUserId() {
  const userId = nanoid();
  localStorage.setItem(STORAGE_KEYS.USER_ID, userId);
  return userId;
}

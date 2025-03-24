import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'ORGANIZE_KEY';

export const storeData = async <T>(value: T) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(KEY, jsonValue);
  } catch (e) {
    console.error(e);
  }
};

export const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error(e);
  }
};

export const removeData = async () => {
  try {
    await AsyncStorage.removeItem(KEY);
  } catch (e) {
    console.error(e);
  }
};

export const removeItem = async <T>(item: T) => {
  try {
    await AsyncStorage.removeItem(KEY);
  } catch (e) {
    console.error(e);
  }
};

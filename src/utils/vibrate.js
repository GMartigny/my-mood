import { notificationAsync } from "expo-haptics";

export default (type) => {
    try {
        notificationAsync(type);
    }
    catch (e) {}
}

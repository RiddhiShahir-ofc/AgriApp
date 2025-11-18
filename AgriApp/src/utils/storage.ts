import AsyncStorage from "@react-native-async-storage/async-storage";

export async function addRole(role: string) {
  const rolesJson = await AsyncStorage.getItem("REGISTERED_ROLES");
  let roles: string[] = rolesJson ? JSON.parse(rolesJson) : [];

  if (!roles.includes(role)) {
    roles.push(role);
    await AsyncStorage.setItem("REGISTERED_ROLES", JSON.stringify(roles));
  }
}

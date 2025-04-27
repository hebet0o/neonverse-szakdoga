import PocketBase from 'pocketbase';

const url = 'https://avatar-builder-neonverse.pockethost.io/'
const pb = new PocketBase(url);

// Load authentication state from cookies
pb.authStore.loadFromCookie(document.cookie);

export async function login(email, password) {
  try {
    const authData = await pb.collection("users").authWithPassword(email, password);

    // Store the token in a cookie
    document.cookie = `pb_auth=${authData.token}; path=/; domain=.vercel.app; secure`;
    console.log("Logged in successfully!");
    return authData;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
}

export function logout() {
  pb.authStore.clear();
  document.cookie = "pb_auth=; path=/; domain=.vercel.app; expires=Thu, 01 Jan 1970 00:00:00 UTC; secure";
  console.log("Logged out successfully!");
}

// Save authentication state to cookies on change
pb.authStore.onChange(() => {
  document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
});

export default pb;
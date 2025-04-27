import PocketBase from 'pocketbase';

const url = 'https://avatar-builder-neonverse.pockethost.io/'
const pb = new PocketBase(url);

// Load authentication state from cookies
pb.authStore.loadFromCookie(document.cookie);

// Save authentication state to cookies on change
pb.authStore.onChange(() => {
  document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
});

export default pb;
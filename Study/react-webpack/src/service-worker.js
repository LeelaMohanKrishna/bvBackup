import { precacheAndRoute } from 'workbox-precaching';

precacheAndRoute(self.__WB_MANIFEST, {
    ignoreURLParametersMatching: [/.*/], // Ignore query parameters
});

precacheAndRoute([{ url: '/', revision: null }]);
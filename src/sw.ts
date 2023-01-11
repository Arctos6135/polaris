import { registerRoute, NavigationRoute } from "workbox-routing";
import {
  precacheAndRoute,
  createHandlerBoundToURL,
  cleanupOutdatedCaches,
} from "workbox-precaching";

declare const self: ServiceWorkerGlobalScope;

precacheAndRoute(self.__WB_MANIFEST);

cleanupOutdatedCaches();

// to allow it to work offline
registerRoute(new NavigationRoute(createHandlerBoundToURL("/")));

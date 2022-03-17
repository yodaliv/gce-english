// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api: 'https://dev.aceit.api.linalgo.com/api/v1',
  storage: {
    accessToken: 'access_token',
    refreshToken: 'refresh_token'
  },
  sentryDSN: 'https://682deeff6222432e859f7446fc45dcb2@o241788.ingest.sentry.io/5249976'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

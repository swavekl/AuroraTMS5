// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,

  // base url for request from client if client running on separate computer
//  origin : 'http://gateway-pc:9001'
  // if running on the same computer
  origin : 'http://localhost:9001'

};

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  pickServer:  'pick.br.scania.com',
  server:  'http://10.8.66.81:8082',
  missingPartServer: 'http://10.8.66.81:8083',
  testServer:  'http://10.8.66.81:8089'
};

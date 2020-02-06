import app from './app';

const appPort = process.env.APP_PORT;
const nodeEnv = process.env.NODE_ENV;

app.listen(appPort, () => console.log(`
  Server running on port ${ appPort } in ${ nodeEnv } mode.
`));

import app from './App';

const APPLICATION_PORT = 8080;

app.listen(APPLICATION_PORT, (err) => {
  if (err) {
    return console.log(err)
  }

  return console.log(`App running on localhost:${APPLICATION_PORT}`);
})
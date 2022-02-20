'use strict';

let express = require(`express`);
const app = express();

app.set(`views`, __dirname + `/templates`);
app.set(`view engine`, `pug`);

app.use(express.static(__dirname + `/public`));

app.use(require(`./routes/main`));
app.use(require(`./routes/auth`));
app.use(require(`./routes/my`));
app.use(require(`./routes/articles`));
app.use(require(`./routes/errors`));

app.listen(8080, () => {
  console.log(`Express server started on port 8080!`);
});

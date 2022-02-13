let express = require('express');
const app = express()

app.use(require('./routes/auth'))
app.use(require('./routes/main'))
app.use(require('./routes/my'))
app.use(require('./routes/articles'))

app.listen(8080, () => {
  console.log('Express server started on port 8080!')
});

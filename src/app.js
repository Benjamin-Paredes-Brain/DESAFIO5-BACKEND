import express from 'express'
import session from 'express-session'
import cookieParse from 'cookie-parser'
import MongoStorage from 'connect-mongo'
import mongoose from 'mongoose'
import handlebars from 'express-handlebars'
import { router as sessionRouter} from './routes/session.router.js'
import { router as usersRouter } from './routes/users.router.js'
import { router as productsRouter } from "./routes/products.router.js"
import { router as cartsRouter } from "./routes/carts.router.js"
import { router as viewsRouter } from "./routes/views.router.js"


const app = express()
app.listen(8080, () => console.log("Server is running in port 8080"))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(process.cwd() + "/public"))
app.engine("handlebars", handlebars.engine({
  defaultLayout: 'main',
  extname: '.handlebars',
  runtimeOptions: {
      allowProtoMethodsByDefault: true,
      allowProtoPropertiesByDefault: true,
  },
}))
app.set("views", process.cwd() + "/src/views")
app.set("view engine", "handlebars")

mongoose.connect('mongodb+srv://Benjamin:1234@firstcluster.0frk82c.mongodb.net/SessionStorage?retryWrites=true&w=majority')
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Error connecting to the database: " + error);
    process.exit(1);
  });

  app.use(session({
    store: new MongoStorage({
        mongoUrl: 'mongodb+srv://Benjamin:1234@firstcluster.0frk82c.mongodb.net/SessionStorage?retryWrites=true&w=majority',
        // mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true }
    }),
    secret: 'CoderSecret',
    resave: false,
    saveUninitialized: false
}))

app.use("/api/sessions", sessionRouter)
app.use(usersRouter)
app.use(productsRouter)
app.use(cartsRouter)
app.use(viewsRouter)
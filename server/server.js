import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import path from 'path';
import { authMiddleware } from './utils/auth';

// import typeDefs and resolvers from schemas
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
    // typeDefs, resolvers
    context: authMiddleware
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// static assets
app.use('/images', express.static(path.join(__dirname, '../client/images')));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

// switch to * at production 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// new apollo server with graph ql schema
const startApolloServer = async (typeDefs, resolvers) => {
    await server.start();
    server.applyMiddleware({ app });
    
    // open db and listen
    db.once('open', () => {
        app.listen(PORT, () => {
          console.log(`API server 🏃 on port ${PORT}!`);
          console.log(`GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
        })
      })
};

// start server
startApolloServer(typeDefs, resolvers);
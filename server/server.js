const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// static assets
app.use('/imgs', express.static(path.join(__dirname, '../client/imgs')));

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
          console.log(`GraphQL available at http://localhost:${PORT}${server.graphqlPath}`);
        })
      })
};

// start server
startApolloServer(typeDefs, resolvers);
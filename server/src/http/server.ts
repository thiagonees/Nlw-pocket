import fastfy from 'fastify';

const app = fastfy();

app.listen({
  port:3333,
}).then(() => {
  console.log('Server is running on port 3333 🚀'); 
})
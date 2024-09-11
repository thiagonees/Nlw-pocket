import fastfy from 'fastify';
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from "fastify-type-provider-zod";

import { createGoalRoute } from './routes/create-goal';
import { createCompletionRoute } from './routes/create-completion';
import { createPendingGoalsRoute } from './routes/get-pending-goals';

const app = fastfy().withTypeProvider<ZodTypeProvider>();

// Add schema validator and serializer
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createGoalRoute)
app.register(createCompletionRoute)
app.register(createPendingGoalsRoute)


app.listen({
  port:3333,
}).then(() => {
  console.log('Server is running on port 3333 🚀'); 
})
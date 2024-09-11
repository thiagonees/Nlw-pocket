import { db } from "../db";
import { goals } from "../db/schema";

interface CreateGoalInterface {
  title: string;
  desiredWeeklyFrequency: number;
}

export async function createGoal({ title, desiredWeeklyFrequency}: CreateGoalInterface) {
  const result = await db.insert(goals).values({ 
    title, 
    desiredWeeklyFrequency 
  })

  const goal = result[0]
  
  return {
    goal,
    //retornar um objeto evita de ter que mudar a estrutura futuramente caso precise adicionar algo mais
  }
}
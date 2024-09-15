import { and, count, eq, gte, lte, sql } from "drizzle-orm";
import { db } from "../db";
import { goalCompletions, goals } from "../db/schema";
import dayjs from "dayjs";

const firstDayOfWeek = dayjs().startOf('week').toDate()
export async function getWeekSummary() {
  const lastDayOfWeek = dayjs().endOf('week').toDate()

  const goalsCreatedUpToWeek = db.$with('goals_created_up_to_week').as(
    db.select({
      id: goals.id, 
      title: goals.title, 
      desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
      createdAt: goals.createdAt,
    })
    .from(goals) 
    .where(lte(goals.createdAt, lastDayOfWeek)) 
  )

  const goalsCompletedInWeek = db.$with('goals_completed_in_week').as(
    db
    .select({
      id: goals.id, 
      title: goals.title, 
      completedAt: goalCompletions.createdAt,
      completedAtDate: sql/*sql*/`
      DATE($(goalsCompletions.createdAt)) 
      `.as('completedAtDate')
    })      // DATE retorna somente a data, excluindo horario, minutos...
    .from(goalCompletions)
    .innerJoin(goals, eq(goals.id, goalCompletions.goalId))
    .where(and(
      gte(goalCompletions.createdAt, firstDayOfWeek), 
      lte(goalCompletions.createdAt, lastDayOfWeek) 
    ))
  )

  const goalsCompletedByWeekDay = db.$with('goals_completed_by_week').as(
    db
    .select({
      completedAtdate: goalsCompletedInWeek.completedAtDate,
      completions: sql/*sql*/`
        
      `
    })      
    .from(goalsCompletedInWeek)
    .groupBy(goalsCompletedInWeek.completedAtDate)
  )

  
  return {
    summary: 'teste',
  }
}

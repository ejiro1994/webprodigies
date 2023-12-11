import {drizzle} from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as dotenv from 'dotenv'
import * as schema from '../../../migrations/schema'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
dotenv.config({path: '.env'})

if (!process.env.DATABASE_URL) {
    console.log('🔴 no database url');
}

const client = postgres(process.env.DATABASE_URL as string)
const db = drizzle(client, {schema})
const migrateDb = async () => {
  try {
    console.log('🟠 Migrating client');
    await migrate(db, {migrationsFolder: 'migrations'})
    console.log('🟢 Successfully migrated')
    
  } catch (error) {
    console.log('🔴 Error migrating client');
    
  }
}
export default db
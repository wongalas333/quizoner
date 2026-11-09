import { neon } from '@neondatabase/serverless';
export default async function handler(req,res){
  const sql=neon(process.env.DATABASE_URL);
  await sql`CREATE TABLE IF NOT EXISTS questions(id serial primary key, question text, created_at timestamptz default now())`;
  if(req.method==='GET'){
    const rows=await sql`SELECT * FROM questions ORDER BY id DESC LIMIT 50`;
    res.status(200).json({ok:true,data:rows});
  } else if(req.method==='POST'){
    const {question}=req.body||{};
    const rows=await sql`INSERT INTO questions(question) VALUES(${question}) RETURNING *`;
    res.status(200).json({ok:true,data:rows[0]});
  } else {
    res.status(405).json({error:'Method not allowed'});
  }
}

import { neon } from '@neondatabase/serverless';
export default async function handler(req,res){
  const sql=neon(process.env.DATABASE_URL);
  await sql`CREATE TABLE IF NOT EXISTS feedback(id serial primary key, nama text, masukan text, created_at timestamptz default now())`;
  if(req.method==='POST'){
    const {nama,masukan}=req.body||{};
    const rows=await sql`INSERT INTO feedback(nama,masukan) VALUES(${nama},${masukan}) RETURNING *`;
    res.status(200).json({ok:true,data:rows[0]});
  } else {
    res.status(405).json({error:'Method not allowed'});
  }
}

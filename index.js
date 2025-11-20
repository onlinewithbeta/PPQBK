import express from "express"

const app = express();



app.use((req,res)=>{
  console.log("active")
  res.status(200).json({message:"avaliable"})
})

const PORT = process.env.PORT||2025;

app.listen(PORT, ()=>{
  console.log(`http://localhost:${PORT}`)
})

import 'dotenv/config'
import app from '@/server'

const port = process.env.PORT || 3000

app.listen(port, (error) => {
  if (error) {
    console.error(error.stack)
  }
  else {
    console.info(`Started on port ${port}`)
  }
})

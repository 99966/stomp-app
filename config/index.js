const host = process.env.HOST || 'localhost'
const env = process.env.NODE_ENV || 'development'
const config = require(`./env/${env}`).default
console.log('node env ',process.env.NODE_ENV)

export default Object.assign(
  {
    env,
    host
  },
  config
)

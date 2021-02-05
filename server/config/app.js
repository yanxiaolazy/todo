module.exports = {
  port: process.env.NODE_ENV !== 'production' ? 5000 : 80,
  host: '0.0.0.0',
  corsConf: {
    origin: '*',
    exposeHeaders: ['www-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: [
      'Content-Type',
      'Authorization',
      'Accept',
      'x-requested-with',
      'Content-Encoding',
      'x-custom-header'
    ]
  }
}
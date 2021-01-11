module.exports = {
  port: 5000,
  host: '127.0.0.1',
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
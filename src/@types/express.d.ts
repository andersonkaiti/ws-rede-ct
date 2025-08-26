interface MulterFile extends Express.Multer.File {
  image_url?: string
}

declare global {
  namespace Express {
    interface Request {
      'svix-id': string
      'svix-timestamp': string
      'svix-signature': string
      file: MulterFile
    }
  }
}

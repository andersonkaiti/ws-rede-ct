import { randomUUID } from 'node:crypto'
import type { Bucket } from '@google-cloud/storage'
import type { Request } from 'express'
import type { FileType } from '../../@types/file.d.ts'
import type { IFirebaseStorageService } from './ifirebase-storage.d.ts'

const IMAGE_PATH_REGEX = /\/images\/.+$/

export class FirebaseStorageService implements IFirebaseStorageService {
  constructor(private readonly bucket: Bucket) {}

  uploadFile(req: Request, fileType: FileType): string {
    if (!req.file) {
      throw new Error('Arquivo não encontrado.')
    }

    const file = req.file
    const author_id = req.body.author_id

    const fileName = `${randomUUID()}-${file?.originalname}`

    const fileRef = this.bucket.file(
      `images/${fileType}/${author_id}/${fileName}`
    )

    const fileStream = fileRef.createWriteStream({
      metadata: {
        contentType: file?.mimetype,
      },
    })

    fileStream.on('error', (error) => {
      console.log(error)
    })

    fileStream.on('finish', async () => {
      await fileRef.makePublic()
    })

    fileStream.end(file?.buffer)

    const downloadUrl = `https://storage.googleapis.com/${this.bucket.name}/${fileRef.name}`

    return downloadUrl
  }

  async updateFile(
    req: Request,
    fileType: FileType
  ): Promise<string | undefined> {
    if (!req.file) {
      throw new Error('Arquivo não encontrado.')
    }

    if (req.file.size === 0) {
      return
    }

    try {
      const filePath = this.getPath(req.body.image_url)

      if (!filePath) {
        throw new Error('Arquivo não encontrado.')
      }

      const [_, newImageUrl] = await Promise.all([
        this.bucket.file(filePath).delete(),
        this.uploadFile(req, fileType),
      ])

      return newImageUrl
    } catch (error) {
      console.error(error)
      throw new Error('Erro ao atualizar o arquivo.')
    }
  }

  async deleteFile(req: Request): Promise<void> {
    if (!req.body.image_url) {
      throw new Error('Arquivo não encontrado.')
    }

    const filePath = this.getPath(req.body.image_url)

    if (!filePath) {
      throw new Error('Arquivo não encontrado.')
    }

    try {
      await this.bucket.file(filePath).delete()
    } catch (error) {
      console.error(error)
      throw new Error('Erro ao deletar o arquivo.')
    }
  }

  getPath(imageUrl: string): string | null {
    const match = imageUrl.match(IMAGE_PATH_REGEX)
    return match ? match[0].slice(1) : null
  }
}

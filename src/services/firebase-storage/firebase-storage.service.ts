import { randomUUID } from 'node:crypto'
import type { Bucket } from '@google-cloud/storage'
import sharp from 'sharp'
import type {
  IDeleteFile,
  IFirebaseStorageService,
  IUpdateFile,
  IUploadFile,
} from './ifirebase-storage.d.ts'

const STORAGE_PATH_REGEX = /https:\/\/storage\.googleapis\.com\/[^/]+\/(.+)$/

export class FirebaseStorageService implements IFirebaseStorageService {
  constructor(private readonly bucket: Bucket) {}

  async uploadFile({ file, folder, id }: IUploadFile): Promise<string> {
    const { buffer, extension, contentType } = await this.processFile(file)

    const fileName = `${randomUUID()}.${extension}`
    const fileRef = this.bucket.file(`${folder}/${id}/${fileName}`)

    return await new Promise((resolve, reject) => {
      const fileStream = fileRef.createWriteStream({
        metadata: {
          contentType,
        },
      })

      fileStream.on('error', reject)

      fileStream.on('finish', async () => {
        try {
          await fileRef.makePublic()
          const downloadUrl = `https://storage.googleapis.com/${this.bucket.name}/${fileRef.name}`
          resolve(downloadUrl)
        } catch (error) {
          reject(error)
        }
      })

      fileStream.end(buffer)
    })
  }

  private async processFile(file: IUploadFile['file']) {
    const isImage = file.mimetype.startsWith('image/')

    if (isImage) {
      return {
        buffer: await sharp(file.buffer).webp().toBuffer(),
        extension: 'webp',
        contentType: 'image/webp',
      }
    }

    return {
      buffer: file.buffer,
      extension: this.getFileExtension(file.originalname),
      contentType: file.mimetype,
    }
  }

  private getFileExtension(filename: string): string {
    const match = filename.match(/\.([^.]+)$/)
    return match ? match[1] : 'bin'
  }

  async updateFile({
    file,
    id,
    fileUrl,
    folder,
  }: IUpdateFile): Promise<string> {
    try {
      const filePath = this.getPath(fileUrl)

      if (!filePath) {
        throw new Error('Arquivo não encontrado.')
      }

      const [_, newImageUrl] = await Promise.all([
        this.bucket.file(filePath).delete(),
        this.uploadFile({
          file,
          id,
          folder,
        }),
      ])

      return newImageUrl
    } catch {
      throw new Error('Erro ao atualizar o arquivo.')
    }
  }

  async deleteFile({ fileUrl }: IDeleteFile): Promise<void> {
    const filePath = this.getPath(fileUrl)

    if (!filePath) {
      throw new Error('Arquivo não encontrado.')
    }

    try {
      await this.bucket.file(filePath).delete()
    } catch {
      throw new Error('Erro ao deletar o arquivo.')
    }
  }

  getPath(fileUrl: string): string | null {
    const match = fileUrl.match(STORAGE_PATH_REGEX)
    return match ? match[1] : null
  }
}

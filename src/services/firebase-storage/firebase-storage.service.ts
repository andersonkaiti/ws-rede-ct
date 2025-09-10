import { randomUUID } from 'node:crypto'
import type { Bucket } from '@google-cloud/storage'
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
    const fileName = `${randomUUID()}-${file?.originalname}`

    const fileRef = this.bucket.file(`${folder}/${id}/${fileName}`)

    return await new Promise((resolve, reject) => {
      const fileStream = fileRef.createWriteStream({
        metadata: {
          contentType: file?.mimetype,
        },
      })

      fileStream.on('error', (error) => {
        console.log(error)
        reject(error)
      })

      fileStream.on('finish', async () => {
        try {
          await fileRef.makePublic()
          const downloadUrl = `https://storage.googleapis.com/${this.bucket.name}/${fileRef.name}`
          resolve(downloadUrl)
        } catch (error) {
          console.error(error)
          reject(error)
        }
      })

      fileStream.end(file.buffer)
    })
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
    } catch (error) {
      console.error(error)
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
    } catch (error) {
      console.error(error)
      throw new Error('Erro ao deletar o arquivo.')
    }
  }

  getPath(fileUrl: string): string | null {
    const match = fileUrl.match(STORAGE_PATH_REGEX)
    return match ? match[1] : null
  }
}

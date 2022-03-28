import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreatedFoldersDto } from './folders.dto'
import { Folders } from './folders.entity'

@Injectable()
export class FoldersService {
  constructor(
    @InjectRepository(Folders)
    private folderRepository: Repository<Folders>
  ) {}

  async getFolders(req, id = null) {
    if (id) return await this.folderRepository.findOne({ where: { id } })
    const { user } = req
    return this.folderRepository.find({ where: { user: user.id } })
  }

  async create(req, body: CreatedFoldersDto) {
    const { user } = req
    const data = {...body} as Folders
    data.user = user.id
    return await this.folderRepository.save(data)
  }
}
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FoldersService } from 'src/folders/folders.service'
import { Repository } from 'typeorm'
import { Todo } from './todoes.entity'

@Injectable()
export class TodoesService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
    private folderService: FoldersService
  ) {}

  async findTodoes(req, query) {
    const { id } = req.user
    let { page, perPage, status, folder } = query
    if (!page) page = 1
    if (!perPage) perPage = 10

    const queryparam = { user: id } as {[code: string]: string}
    if (status) queryparam.status = status
    if (folder) queryparam.folder = folder

    const response = await this.todoRepository.findAndCount({
      take: perPage || 10,
      skip: parseInt(page) === 1 ? 0 : parseInt(perPage) * parseInt(page),
      where: queryparam
    })

    const [results, count] = response
    return {
      next: count > parseInt(perPage) ? true : false,
      prev: parseInt(page) !== 1 ? true : false,
      count,
      results
    }
  }

  async create(req, body) {
    const { id } = req.user
    body.user = id
    return await this.todoRepository.save(body)
  }

  async update(body, id) {
    const { folder } = body
    if (folder) {
      const result = await this.folderService.getFolders(null, folder)
      if (!result) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          message: 'Не найдено'
        }, HttpStatus.BAD_REQUEST)
      }
    }

    const updatedTodo = await this.todoRepository.findOne({ where: { id } })
    if (!updatedTodo) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Не найдено'
      }, HttpStatus.BAD_REQUEST)
    }
    body.id = updatedTodo.id
    return this.todoRepository.save(body)
  }

  async delete(id) {
    const deletedTodo = await this.todoRepository.findOne({ where: { id } })

    if (!deletedTodo) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Не найдено'
      }, HttpStatus.BAD_REQUEST)
    }

    await this.todoRepository.delete(deletedTodo)
    return {
      status: HttpStatus.OK,
      message: 'Удалено'
    }
  }
}
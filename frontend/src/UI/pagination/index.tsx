import { LocationQueryValue, RouterLink, useRoute } from 'vue-router'
import './pagination.sass'

interface IPaginationPrams {
  params: PaginationParam
}

class PaginationParam {
  count: number = 0
  next: boolean = false
  prev: boolean = false
  perPage: number = 9
  page: number = 0

  constructor (count?: number, next?: boolean, prev?: boolean, perPage?: number, page?: number) {
    if (count) this.count = count
    if (next) this.next = next
    if (prev) this.prev = prev
    if (perPage) this.perPage = perPage
    if (page) this.page = page
    else page = 1
  }
}

const Paination = ({ params }: IPaginationPrams): JSX.Element => {
  const route = useRoute()

  if (!params.page) params.page = 1

  const getQueryParam = (page: number): {[x: string]: LocationQueryValue | LocationQueryValue[]} => {
    if (page === params.page) return route.query
    const query = { ...route.query }
    query.page = page.toString()

    return query
  }

  const pages: number[] = []
  const pageLimit = Math.ceil(params.count / (params.perPage))

  for (let i = 1; i <= pageLimit; i++) {
    pages.push(i)
  }

  return (
    <>
      {<div class='default-pagination'>
        <RouterLink
          class={params.prev ? 'default-pagination-arrow prev active' : 'default-pagination-arrow prev'}
          to={{ path: route.path, query: getQueryParam(params.prev ? params.page - 1 : params.page) }}
        >
          <img src={require('@/assets/img/arrow.png')} alt="prev"/>
        </RouterLink>
        {pages.map(page =>
          <RouterLink
            class={params.page === page ? 'default-pagination-page active' : 'default-pagination-page'}
            to={{ path: route.path, query: getQueryParam(page) }}
          >
            {page}
          </RouterLink>
        )}
        <RouterLink
          class={params.next ? 'default-pagination-arrow next active' : 'default-pagination-arrow next'}
          to={{ path: route.path, query: getQueryParam(params.next ? params.page + 1 : params.page) }}
        >
          <img src={require('@/assets/img/arrow.png')} alt="prev"/>
        </RouterLink>
      </div>}
    </>
  )
}

export { Paination, PaginationParam }
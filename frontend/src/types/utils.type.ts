export interface SuccessResponse<Data> {
  message: string
  data: Data
}
export interface ErrorResponse<Data> {
  message: string
  data?: Data
}

// cú pháp `-?` sẽ loại bỏ undefiend của key optional

export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>
}

export type Nameable = {
  name?: string
  full_name?: string
}

export interface SelectOption {
  label: string
  value: string | number
}

export type PaginationParams = {
  page: number
  size: number
}

export type PagingResponse<Data> = {
  data: Data
  totalPages: number
  totalElements: string
}

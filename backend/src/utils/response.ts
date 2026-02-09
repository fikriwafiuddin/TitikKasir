class SuccessResponse {
  success: boolean
  message: string
  data: object
  meta: object
  constructor(message: string, data = {}, meta = {}) {
    this.success = true
    this.message = message
    this.data = data
    this.meta = {
      timestamp: new Date().toISOString(),
      ...meta,
    }
  }
}

class ErrorResponse {
  success: boolean
  message: string
  status: number
  errors: object
  data: object
  meta: object
  constructor(
    message: string,
    status = 500,
    errors = {},
    data = {},
    meta = {},
  ) {
    this.success = false
    this.message = message
    this.status = status
    this.errors = errors
    this.data = data
    this.meta = {
      timestamp: new Date().toISOString(),
      ...meta,
    }
  }
}

export { SuccessResponse, ErrorResponse }

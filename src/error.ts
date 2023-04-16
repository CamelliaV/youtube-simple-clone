class ErrorResponse extends Error {
  status: number
  message: string
  
  constructor(status: number, message: string) {
    super()
    this.status = status
    this.message = message
  }
}

export const createError = (status: number, message: string) => {
  return new ErrorResponse(status, message)
}

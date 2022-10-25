class AppError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = status;
  }
}

module.exports = AppError;

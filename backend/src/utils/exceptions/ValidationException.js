function ValidationException(errors) {
  this.status = 400;
  this.message = 'utils.exceptions.validation-exception';
  this.errors = errors;
}

module.exports = ValidationException;

class response {
  constructor() {
    this.errCode = 1;
    this.errMessage = "Lack of data"
  }

  setResponseSuccess(errMessage) {
    this.errCode = 0;
    this.errMessage = "Data update successfully";
  }

  setResponseFail(errMessage) {
    this.errMessage = errMessage;
  }

  setResponseAll(errCode, errMessage) {
    this.errCode = errCode;
    this.errMessage = errMessage;
  }

  getResponse() {
    return {
      errCode: this.errCode,
      errMessage: this.errMessage
    }
  }
}

export default response;
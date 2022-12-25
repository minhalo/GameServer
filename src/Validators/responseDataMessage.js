class response {
  constructor() {
    this.errCode = 1;
    this.errMessage = "Lack of data"
  }

  setResponseSuccess(errMessage) {
    this.errCode = 0;
    this.errMessage = errMessage;
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

  getResponseLogin(data) {
    let oldData = {
      errCode: this.errCode,
      errMessage: this.errMessage,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken
    }
    let newData = {
      errCode: this.errCode,
      errMessage: this.errMessage,
    }
    let result = data.refreshToken && data.accessToken ? oldData : newData
    return result
  }
}

export default response;
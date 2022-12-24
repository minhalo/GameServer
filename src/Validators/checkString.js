exports.isNumeric = function (num) {
    return (typeof (num) === 'number' || typeof (num) === "string" && num.trim() !== '') && !isNaN(num);
}

exports.isGmail = function (gmail) {
    let email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    let data = email.test(gmail)
    return data
}

exports.isPassword = function (password) {
    let pass = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9]).{8,20}$/
    let data = pass.test(password)
    return data
}

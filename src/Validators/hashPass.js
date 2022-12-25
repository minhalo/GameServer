import bcryptjs from 'bcryptjs';

exports.hash = async (password) => {
    var salt = bcryptjs.genSaltSync(10);
    var hash = bcryptjs.hashSync(password, salt);
    return hash
}

exports.compareHash = async (password, hash) => {
    let checkpoint = bcryptjs.compareSync(password, hash);
    return checkpoint
}
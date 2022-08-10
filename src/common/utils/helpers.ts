import * as bcrypt from 'bcrypt';

export function hashPassword(password: string) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

export function comparePassword(hashedPassword: string, password: string) {
    return bcrypt.compareSync(password, hashedPassword);
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidEmailAndPassword = void 0;
const isValidEmailAndPassword = (email, password) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/;
    return emailRegex.test(email.trim()) && passwordRegex.test(password.trim());
};
exports.isValidEmailAndPassword = isValidEmailAndPassword;

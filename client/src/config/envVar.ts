if (process.env.NODE_ENV === 'development') process.loadEnvFile()
export const {
    EMAIL_USER = '',
    EMAIL_PASS = ''
} = process.env;

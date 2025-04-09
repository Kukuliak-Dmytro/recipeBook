import dotenv from 'dotenv';
dotenv.config();

const parseAllowedOrigins = () => {
    const origins = process.env.ALLOWED_ORIGINS!;
    return origins.split(',').map(origin => origin.trim());
};

// Server configuration
const serverConfig = {
    port: parseInt(process.env.PORT!, 10),
    environment: process.env.NODE_ENV,
    allowedOrigins: parseAllowedOrigins()
};

export default serverConfig;
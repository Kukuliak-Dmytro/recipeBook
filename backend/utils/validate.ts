const requiredEnvironmentVariables = [
    'NODE_ENV',
    'ALLOWED_ORIGINS',
    'API_URL',
    'API_KEY',
]

const validateEnvironmentVariables = () => {
    const missingVariables = requiredEnvironmentVariables.filter(
        (variable) => !process.env[variable]
    )

    if (missingVariables.length > 0) {
        throw new Error(
            `Missing required environment variables: ${missingVariables.join(', ')}`
        )
    }
}

export default validateEnvironmentVariables
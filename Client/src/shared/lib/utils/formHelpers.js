export const getStatus = (value, error) => {
    if (!value) return ''
    if (error) return 'error'
    return 'valid'
}
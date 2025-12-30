export const generateTransactionId = () => {
    return `TX-${Date.now()}-${Math.random().toString(36).slice(2,8).toUpperCase()}`;
};

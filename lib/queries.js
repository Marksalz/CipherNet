// Database queries for CipherNet application

// User management queries
export const createUserQuery = `
    INSERT INTO users (username, password_hash, created_at) 
    VALUES (?, ?, NOW())
`;

export const findUserByUsernameQuery = `
    SELECT id, username, password_hash, created_at 
    FROM users 
    WHERE username = ?
`;

export const checkUserExistsQuery = `
    SELECT COUNT(*) as count 
    FROM users 
    WHERE username = ?
`;

// Cipher/Message related queries
export const getUserCipherKeyQuery = `
    SELECT cipher_key 
    FROM users 
    WHERE username = ?
`;

export const saveDecodedMessageQuery = `
    INSERT INTO decoded_messages (user_id, original_message, decoded_message, decoded_at) 
    VALUES (?, ?, ?, NOW())
`;

export const getUserDecodedMessagesQuery = `
    SELECT original_message, decoded_message, decoded_at 
    FROM decoded_messages 
    WHERE user_id = ? 
    ORDER BY decoded_at DESC
`;

// Database initialization queries
export const createUsersTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`;
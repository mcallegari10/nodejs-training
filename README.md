# NodeJS Training

NodeJS training project with Express, MongoDB and Mongoose

## Security best practices

### Compromised database

- Strongly encrypt passwords with salt and hash (bcrypt)
- Strongly encrypt passwords reset tokens (sha256)

### Brute force attacks

- Use bcrypt (makes login requests slow)
- Implement rate limiting (express-rate-limit)
- Implement maximum login attempts

### XSS attacks

- Store JWT in HTTPOnly cookies
- Sanitize user input data
- Set special HTTP headers (helmet)

### Denial of Service (DOS) attack

- Implement rate limiting (express-rate-limit)
- Limit body payload (body-parser)
- Avoid evil regular expressions

### NoSQL query injection

- Use mongoose for MongoDB
- Sanitize user input data

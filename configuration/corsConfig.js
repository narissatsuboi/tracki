const allowedOrigins = [
    'https://www.yoursite.com',
    'http://127.0.0.1:5000',
    'http://localhost:3500',
    'http://localhost:3000'
];
const corsConfig = {
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"]
};

// const corsConfig = {
//     origin: (origin, callback) => {
//         if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//             callback(null, true)
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     optionsSuccessStatus: 200
// }

module.exports = corsConfig;
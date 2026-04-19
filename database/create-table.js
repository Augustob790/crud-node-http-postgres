import { sql } from './db.js';

// sql `DROP TABLE IF EXISTS videos;`.then(() => {
//   console.log('Table dropped successfully');
// }).catch((error) => {
//   console.error('Error dropping table:', error);
// });

sql `
CREATE TABLE videos (
    id TEXT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    duration INTEGER 
);
`.then(() => {
  console.log('Table created successfully');
}).catch((error) => {
  console.error('Error creating table:', error);
});
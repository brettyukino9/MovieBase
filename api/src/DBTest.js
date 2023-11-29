const db = require('./DBConnect.js'); // Replace with the actual path to your database module

// Test the database connection
const testDatabaseConnection = async () => {
  try {
    // Get the database connection
    const connection = db.getDatabaseConnection();

    // Perform a simple query
    const queryResult = await db.query('SELECT * FROM moviebase.genre');

    // Log the query result
    console.log('Query result:', queryResult);

    // Close the database connection
    db.close();
  } catch (error) {
    console.error('Error testing database connection:', error);
  }
};

// Call the test function
testDatabaseConnection();
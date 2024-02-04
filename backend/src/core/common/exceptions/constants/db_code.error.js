// Database error codes

/**
 * Error code for Foreign Key Constraint Violation.
 * This error occurs when a foreign key constraint is violated in the database.
 */
export const FOREIGN_KEY_CONSTRAINT_VIOLATION = '23503';

/**
 * Error code for Unique Key Constraint Violation.
 * This error occurs when a unique key constraint is violated in the database.
 */
export const UNIQUE_KEY_CONSTRAINT_VIOLATION = '23505';

/**
 * Error code for Check Constraint Violation.
 * This error occurs when a check constraint is violated in the database.
 */
export const CHECK_CONSTRAINT_VIOLATION = '23514';

/**
 * Error code for Not Null Constraint Violation.
 * This error occurs when a not null constraint is violated in the database.
 */
export const NOT_NULL_CONSTRAINT_VIOLATION = '23502';

/**
 * Error code for Data Truncation Error.
 * This error occurs when there is an attempt to insert or update data
 * that exceeds the specified length for a column.
 */
export const DATA_TRUNCATION_ERROR = '22001';

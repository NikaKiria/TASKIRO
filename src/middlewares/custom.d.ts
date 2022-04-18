// Extend express request object to have userEmail property
declare namespace Express {
  export interface Request {
    userEmail?: any;
  }
}

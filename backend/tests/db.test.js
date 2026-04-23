import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { expect } from 'chai';

dotenv.config({ path: '.env' });

describe('Database connection', function () {
  it('connects to MongoDB using MONGODB_URI', async function () {
    this.timeout(45000);
    const uri = process.env.MONGODB_URI;
    expect(uri, 'MONGODB_URI must be set in .env').to.be.a('string').and.not.empty;

    try {
      const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 30000 });
      expect(conn.connection.readyState).to.equal(1);
      await mongoose.disconnect();
    } catch (error) {
      throw new Error(`MongoDB connection failed: ${error.message}`);
    }
  });
});

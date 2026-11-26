import mongoose from "mongoose"

// Shared in-flight connect promise so concurrent requests don't each open a
// connection. Cleared on failure so the next request retries.
let connecting: Promise<typeof mongoose> | null = null

export const connectToDb = async () => {
  // Check the live state instead of a cached flag: a connection can drop
  // (network change, cluster pause) and queries would otherwise just buffer
  // until they time out.
  if (mongoose.connection.readyState === 1) return

  // 0 = disconnected: any earlier promise is stale, so start a fresh connect.
  if (mongoose.connection.readyState === 0) connecting = null

  if (!connecting) {
    connecting = mongoose.connect(process.env.MONGOOSE_URI || '', {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    })
  }

  try {
    await connecting
    console.log("Connected to MongoDB")
  } catch (error) {
    console.error("MongoDB connection error:", error)
    connecting = null
    throw error
  }
}

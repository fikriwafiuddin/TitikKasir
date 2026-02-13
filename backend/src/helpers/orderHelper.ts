import userRepository from "../repositories/userRepository.js"

/**
 * Generate a new Order ID.
 * Format: TR-XXXXXX (e.g., TR-000001)
 */
export const generateNextOrderId = async (userId: string) => {
  const user = await userRepository.findByUserId(userId)

  if (!user) {
    throw new Error("User not found")
  }

  const latestOrderId = user.latest_order_id

  let nextNumber = 1
  if (latestOrderId) {
    const lastNumberMatch = latestOrderId.match(/-(\d+)$/)
    const lastNumber = lastNumberMatch ? parseInt(lastNumberMatch[1], 10) : 0
    nextNumber = lastNumber + 1
  }

  const nextOrderId = `TR-${nextNumber.toString().padStart(6, "0")}`

  return nextOrderId
}

import categoryRepository from "@/repositories/categoryRepository.js"

/**
 * Generate a new SKU for a product.
 * Format: [SKU_PREFIX]-[NUMBER]
 * Example: Kopi -> KOP0-001
 */
export const generateNextProductSku = async (
  userId: string,
  categoryId: number,
) => {
  const category = await categoryRepository.findById(userId, categoryId)

  if (!category) {
    throw new Error("Category not found")
  }

  const { sku_prefix, latest_sku } = category

  // Extract number from latest_sku (format: PREFIX-XXX)
  const latestNumberMatch = latest_sku.match(/-(\d+)$/)
  const lastNumber = latestNumberMatch ? parseInt(latestNumberMatch[1], 10) : 0
  const nextNumber = lastNumber + 1

  // Format with leading zeros (3 digits)
  const nextSku = `${sku_prefix}-${nextNumber.toString().padStart(3, "0")}`

  return { nextSku, nextNumber }
}

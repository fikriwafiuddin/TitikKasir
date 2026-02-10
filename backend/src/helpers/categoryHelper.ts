import prisma from "@/lib/prisma.js"

/**
 * Generate a unique SKU prefix for a category.
 * It takes the first 3 characters of the name and appends a numeric suffix if needed.
 */
export const generateUniqueCategorySkuPrefix = async (
  userId: string,
  name: string,
) => {
  let skuPrefix = name.substring(0, 3).toUpperCase()
  let skuPrefixCount = 0

  while (true) {
    const currentPrefix = skuPrefix + skuPrefixCount
    const category = await prisma.category.findFirst({
      where: {
        user_id: userId,
        sku_prefix: currentPrefix,
      },
    })

    if (!category) {
      return currentPrefix
    }
    skuPrefixCount++
  }
}

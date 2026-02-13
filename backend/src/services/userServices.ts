import userRepository from "../repositories/userRepository.js"

const getByUserId = async (userId: string) => {
  return await userRepository.findByUserId(userId)
}

const updateShopName = async (userId: string, shopName: string) => {
  return await userRepository.update(userId, { shop_name: shopName })
}

const userServices = {
  getByUserId,
  updateShopName,
}

export default userServices

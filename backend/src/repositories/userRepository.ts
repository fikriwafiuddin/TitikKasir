import prisma from "../lib/prisma.js"

const findByUserId = async (userId: string) => {
  return await prisma.user.findUnique({
    where: { user_id: userId },
  })
}

const update = async (userId: string, data: any) => {
  return await prisma.user.update({
    where: { user_id: userId },
    data,
  })
}

const userRepository = {
  findByUserId,
  update,
}

export default userRepository

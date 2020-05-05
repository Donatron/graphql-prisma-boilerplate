import jwt from "jsonwebtoken";

const getUserId = (request, requireAuth = true) => {
  // Authorization for Queries and Mutations lives at request.request.headers
  // For Subscriptions it lives at request.connection.context
  const header = request.request
    ? request.request.headers.authorization
    : request.connection.context.Authorization;

  if (header) {
    const token = header.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.PRISMA_JWT_SECRET);

    return decoded.userId;
  }

  if (requireAuth) {
    throw new Error("Authentication required");
  }

  return null;
};
export { getUserId as default };

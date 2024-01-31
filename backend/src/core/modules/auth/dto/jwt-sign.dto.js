export const JwtPayload = user => ({
    id: user.id,
    role: user.role,
});

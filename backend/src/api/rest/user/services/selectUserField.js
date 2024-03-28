function selectUserField(user) {
  if (!user || user.role === 'MEMBER') {
    return {
      id: true,
      username: true,
      role: true,
      isActive: true,
      createdAt: true,
      updatedAt: true
    };
  }

  return undefined;
}

module.exports = selectUserField;

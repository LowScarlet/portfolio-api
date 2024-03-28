function selectUserProfileField(user) {
  if (!user || user.role === 'MEMBER') {
    return {
      id: true,
      fullName: true,
      bio: true,
      createdAt: true,
      updatedAt: true
    };
  }

  return undefined;
}

module.exports = selectUserProfileField;

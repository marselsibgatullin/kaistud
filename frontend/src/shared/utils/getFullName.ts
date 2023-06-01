export const getFullName = (man?: Record<string, any>) =>
  [man?.lastName, man?.firstName, man?.middleName, man?.patronymic].filter(Boolean).join(" ")
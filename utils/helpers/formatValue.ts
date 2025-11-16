export const formatValue = (value: string | number | string[]) => {
  if (Array.isArray(value)) {
    return value.length > 0 ? value.join(", ") : "Не указано";
  }
  return value || "Не указано";
};

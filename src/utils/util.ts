export function toTitleCase(text: string) {
  return text
    .toLowerCase()
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function mapResponseToClass<T extends object>(
  response: any,
  classType: new () => T,
  customMapping: { [key: string]: string } = {},
): T {
  const instance = new classType();
  Object.keys(instance).forEach((key) => {
    const responseKey = customMapping[key] || key;
    if (responseKey in response) {
      (instance as any)[key] = response[responseKey];
    }
  });

  return instance;
}

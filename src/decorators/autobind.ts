// Autobind Decorator
export function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFN = originalMethod.bind(this);
      return boundFN;
    },
  };
  return adjDescriptor;
}

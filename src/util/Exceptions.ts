export function wrap<
  T extends (...args: any[]) => RT,
  RT = ReturnType<T>,
  RRT = [null, Error] | [RT, null]
>(fn: T): (...args: Parameters<T>) => RRT {
  return (...args) => {
    try {
      return [fn(...args), null] as RRT;
    } catch (error) {
      return [null, error as Error] as RRT;
    }
  };
}

export function wrapConstructor<
  T extends new (...args: any[]) => RT,
  RT = T extends new (...args: any[]) => infer A ? A : never,
  RRT = [null, Error] | [RT, null]
>(fn: T): (...args: ConstructorParameters<T>) => RRT {
  return (...args) => {
    try {
      return [new fn(...args), null] as RRT;
    } catch (error) {
      return [null, error as Error] as RRT;
    }
  };
}

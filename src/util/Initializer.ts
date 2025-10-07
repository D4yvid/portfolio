export function init<
  T,
  ReturnType = T extends new (...args: any[]) => infer RT ? RT : T extends (...args: any[]) => infer RT ? RT : never,
  ParametersOfT = T extends new (...args: (infer PT)[]) => ReturnType ? PT : T extends (...args: (infer PT)[]) => ReturnType ? PT : never
>(..._: ParametersOfT[]): T {
  return null as unknown as ReturnType;
}

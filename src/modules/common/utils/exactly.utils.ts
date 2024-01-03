export type ImplementsExactly<ImplementedClass, TypeToImplement> = {
  [AllowedMethod in keyof TypeToImplement]: AllowedMethod extends keyof ImplementedClass
    ? ImplementedClass[AllowedMethod] extends (
        ...args: infer Args
      ) => infer Return
      ? (...args: Args) => Return
      : ImplementedClass[AllowedMethod]
    : never;
} & {
  [AdditionalMethod in Exclude<
    keyof ImplementedClass,
    keyof TypeToImplement
  >]?: never; // Ensure no additional properties
};

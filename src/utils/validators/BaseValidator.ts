import { ZodObject, ZodRawShape } from 'zod';

export class BaseValidator<TSchema extends ZodObject<ZodRawShape>> {
  constructor(private schema: TSchema) {}

  validateField<K extends keyof TSchema['shape']>(
    field: K,
    value: string
  ): string | null {
    const fieldKey = field as string;
    
    const result = this.schema
      .pick({ [fieldKey]: true } as Record<string, true>)
      .safeParse({ [fieldKey]: value });

    return result.success ? null : result.error.errors[0]?.message;
  }
}

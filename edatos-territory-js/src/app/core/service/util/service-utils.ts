import { plainToInstance } from "class-transformer";
import { OperatorFunction, map } from "rxjs";

/**
 * TODO: Document
 * @param type
 */
export function instantiate<T>(type: { new (): T }): OperatorFunction<object, T> {
    return map((res) => plainToInstance(type, res));
}

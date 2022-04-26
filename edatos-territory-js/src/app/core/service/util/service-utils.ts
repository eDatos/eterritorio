import { plainToInstance } from "class-transformer";
import { OperatorFunction, map } from "rxjs";

/**
 * Converts a plain object to an instance of the given class.
 * @param type Class of the object to be instantiated.
 */
export function instantiate<T>(type: { new (): T }): OperatorFunction<object, T> {
    return map((res) => plainToInstance(type, res));
}

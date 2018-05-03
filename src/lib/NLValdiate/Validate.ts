import 'reflect-metadata';
import { getMetadataKey } from './util';

export function Validate<T extends { new (...args: any[]): {} }>(Target: T): T {
    const newClass = class Validated extends Target {
        constructor(...args: any[]) {
            super(...args);

            const typeMap: { [key: string]: string[] | undefined } =
                Reflect.getMetadata(getMetadataKey(Target.prototype), Target) || {};

            for (const key in this) {
                if (this.hasOwnProperty(key)) {
                    this.validateKey(key, typeMap);
                }
            }

            for (const key in typeMap) {
                if (typeMap.hasOwnProperty(key)) {
                    this.validateKey(key, typeMap);
                }
            }
        }

        private validateKey(key: string, typeMap: { [key: string]: string[] | undefined }): void {
            const value = (this as any)[key];
            const type = typeMap[key];
            console.log(
                'Validating value ->',
                value,
                '\n to match type ->',
                type,
                '\n for key ->',
                key,
                '\n in object ->',
                Target.prototype.constructor.name
            );
            if (null != type && type.indexOf(typeof value) < 0) {
                throw new Error(`${Target.prototype.constructor.name}: ${key} is not a ${type}`);
            }
        }
    };

    Object.defineProperty(newClass, 'name', { value: Target.prototype.constructor.name });
    return newClass;
}

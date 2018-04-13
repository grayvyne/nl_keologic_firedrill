class ValidationError extends Error {}

export function Typeof(value: string | string[]): PropertyDecorator {
    return (target, propertyKey) => {
        if (Array.isArray(value)) {
            target.constructor.prototype[propertyKey] = value;
        } else {
            target.constructor.prototype[propertyKey] = [value];
        }
    };
}

type CustomClassDecorator = <T extends { new (...args: any[]): {} }>(t: T) => T;
export const Validate: CustomClassDecorator = target => {
    const newClass = class Validated extends target {
        constructor(...args: any[]) {
            super(...args);

            for (const key in this) {
                if (this.hasOwnProperty(key)) {
                    const value = this[key];
                    const type = target.prototype[key];
                    if (false === type.includes(typeof value)) {
                        throw new ValidationError(`${target.prototype.constructor.name}: ${key} is not a ${type}`);
                    }
                }
            }
        }
    };

    Object.defineProperty(newClass, 'name', { value: target.prototype.constructor.name });
    return newClass;
};

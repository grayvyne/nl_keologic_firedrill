import 'reflect-metadata';
import { getMetadataKey } from './util';

export function Typeof(...typeStrings: string[]): PropertyDecorator {
    return (target, propertyKey) => {
        const typeMap = Reflect.getMetadata(getMetadataKey(target), target.constructor) || {};
        typeMap[propertyKey] = typeStrings;
        Reflect.defineMetadata(getMetadataKey(target), typeMap, target.constructor);
    };
}

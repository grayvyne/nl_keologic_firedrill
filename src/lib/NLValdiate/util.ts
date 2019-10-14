const METADATA_KEY = 'nl-validate-type-map';

export function getMetadataKey(target: { constructor: Function }): string {
    return target.constructor.toString() + '-' + METADATA_KEY;
}

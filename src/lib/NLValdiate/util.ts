const METADATA_KEY = 'nl-validate-type-map';

export function getMetadataKey(target: { constructor: { name: string } }): string {
    return target.constructor.name + '-' + METADATA_KEY;
}

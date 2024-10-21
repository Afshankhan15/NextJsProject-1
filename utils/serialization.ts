import LZString from 'lz-string'

export const serialize = (o: any) => {
    return LZString.compressToEncodedURIComponent(JSON.stringify(o))
}

export const deserialize = (s: string) => {
    return JSON.parse(LZString.decompressFromEncodedURIComponent(s) || '{}')
}

export default {
    serialize,
    deserialize
}
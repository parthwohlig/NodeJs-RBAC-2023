function deepCloneWithCircular (obj, seenObjects = new WeakMap()) {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }
  if (seenObjects.has(obj)) {
    return '[Circular Reference]'
  }

  if (Array.isArray(obj)) {
    const cloneArray = []
    seenObjects.set(obj, cloneArray)
    for (let i = 0; i < obj.length; i++) {
      cloneArray[i] = deepCloneWithCircular(obj[i], seenObjects)
    }

    return cloneArray
  }

  if (typeof obj === 'object') {
    const cloneObject = {}
    seenObjects.set(obj, cloneObject)

    for (const key in obj) {
      cloneObject[key] = deepCloneWithCircular(obj[key], seenObjects)
    }

    return cloneObject
  }
  return obj
}

const inputArray = [
  1,
  [2, 3],
  4,
  5,
  { a: 7, b: { c: 8, d: [9, 10, { e: [11, 12] }] } },
  13,
  [14],
  { f: 15, g: [16, [17, 18, { h: { i: 19, j: [20] } }]] }
]
const clonedArray = deepCloneWithCircular(inputArray)

clonedArray[1] = 999

console.log('Modified clonedArray:', clonedArray)
console.log('Original inputArray:', inputArray)

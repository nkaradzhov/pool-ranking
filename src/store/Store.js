class DataListener {
  callbacks = {}
  data = null
  constructor(ref) {
    ref.onSnapshot(snapshot => {
      this.data = snapshot.data
        ? snapshot.data()
        : snapshot.docs.map(doc => doc.data())
      Object.values(this.callbacks).forEach(callback => callback(this.data))
    })
  }
  subscribe(callback) {
    callback(this.data)
    this.callbacks[callback] = callback
    return () => {
      delete this.callbacks[callback]
    }
  }
}

class Store {
  cache = {}

  listener(ref) {
    const h = hash(ref)
    let listener = this.cache[h]
    if (!listener) {
      listener = new DataListener(ref)
      this.cache[h] = listener
    }
    return listener
  }
}

const store = new Store()
window.cachedStore = store
export default store

const hash = ref => {
  if (ref.__proto__.constructor.name === 'Query') {
    const parts = [ref._query.path.segments.join('/')]

    if (ref._query.filters.length)
      parts.push(
        'where=' +
          ref._query.filters
            .map(f =>
              f.field.segments
                .join('.')
                .concat(f.op.name)
                .concat(f.value.internalValue)
            )
            .join(',')
      )
    if (ref._query.explicitOrderBy.length)
      parts.push(
        'order=' +
          ref._query.explicitOrderBy
            .map(o => `${o.field.segments.join('.')}:${o.dir.name}`)
            .join(',')
      )
    if (ref._query.limit) parts.push('limit=' + ref._query.limit)

    return parts.join(',')
  }

  return ref.path
}

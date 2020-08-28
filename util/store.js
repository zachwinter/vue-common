export function buildModule ({ state, actions }) {
  return {
    namespaced: true,
    state,
    mutations: _composeMutations(state),
    actions
  }
}

export function bind (prop, localName = null) {
  if (Array.isArray(prop)) {
    return prop.reduce((acc, prop) => {
      acc = { ...acc, ..._bind(prop) }
      return acc
    }, {})
  } else {
    return _bind(prop, localName)
  }
}

export function dualBind (prop, localName = null) {
  if (Array.isArray(prop)) {
    return prop.reduce((acc, prop) => {
      acc = { ...acc, ..._dualBind(prop) }
      return acc
    }, {})
  } else {
    return _dualBind(prop, localName)
  }
}

function _exposeMutations (state) {
  return Object.keys(state).map(key => {
    return { key, list: key.split(/(?=[A-Z])/) }
  }).reduce((acc, { key, list }) => {
    const mutation = _buildMutationString(list)
    acc[mutation] = key
    return acc
  }, {})
}

function _composeMutations (state) {
  const mutations = _exposeMutations(state)
  return Object.keys(mutations).reduce((acc, mutation) => {
    acc[mutation] = function (state, val) {
      state[mutations[mutation]] = val
    }
    return acc
  }, {})
}

function _buildMutationString (list) {
  return list.reduce((acc, val, i) => {
    acc += val.toUpperCase() + (i === list.length - 1 ? '' : '_')
    return acc
  }, 'SET_')
}

function _extract (prop) {
  const split = prop.split('/')
  const [module, key] = split.length == 2 ? split : [null, split[1]]
  const list = key.split(/(?=[A-Z])/)
  const mutation = _buildMutationString(list)
  return { mutation, module, key }
}

function _dualBind (prop, localName) {
  const { mutation, module, key } = _extract(prop)
  return { 
    [localName || key]: {
      get () {
        return module ? this.$store.state[module][key] : this.$store.state[key]
      },

      set (val) {
        return this.$store.commit(`${module}/${mutation}`, val)
      }
    }
  }
}

function _bind (prop, localName) {
  const { module, key } = _extract(prop)

  return {
    [localName || key] () {
      return module ? this.$store.state[module][key] : this.$store.state[key]
    }
  }
}
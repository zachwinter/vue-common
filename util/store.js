function _buildMutationString(list) { // eslint-disable-line
  return list.reduce((acc, val, i) => {  // eslint-disable-line
    return acc + val.toUpperCase() + (i === list.length - 1 ? '' : '_');
  }, 'SET_');
}

function _exposeMutations(state) { // eslint-disable-line
  return Object.keys(state)
    .map((key) => ({ key, list: key.split(/(?=[A-Z])/) }))
    .reduce((acc, { key, list }) => {
      const mutation = _buildMutationString(list);
      acc[mutation] = key;
      return acc;
    }, {});
}

function _extract(prop) { // eslint-disable-line
  const split = prop.split('/');
  const [module, key] = split.length == 2 ? split : [null, split[1]];  // eslint-disable-line
  const list = key.split(/(?=[A-Z])/);
  const mutation = _buildMutationString(list);
  return { mutation, module, key };
}

function _dualBind(prop, localName) { // eslint-disable-line
  const { mutation, module, key } = _extract(prop);
  return {
    [localName || key]: {
      get() {
        return module ? this.$store.state[module][key] : this.$store.state[key];
      },

      set(val) {
        return this.$store.commit(`${module}/${mutation}`, val);
      },
    },
  };
}

function _bind(prop, localName) { // eslint-disable-line
  const { module, key } = _extract(prop);
  return {
    [localName || key]() {
      return module ? this.$store.state[module][key] : this.$store.state[key];
    },
  };
}

function _get(prop, localName) { // eslint-disable-line
  const { module, key } = _extract(prop);
  return {
    [localName || key]() {
      return module ? this.$store.getters[`${module}/${key}`] : this.$store.getters[key];
    },
  };
}

export function get (prop, localName = null) {
  if (Array.isArray(prop)) {
    return prop.reduce((acc, p) => ({ ...acc, ..._get(p) }), {});
  } else {
    return _get(prop, localName)
  }
}

export function composeMutations(state) {
  const mutations = _exposeMutations(state);
  return Object.keys(mutations).reduce((acc, mutation) => {
    acc[mutation] = function (state, val) {  // eslint-disable-line
      state[mutations[mutation]] = val;
    };
    return acc;
  }, {});
}

export function buildModule({ state, actions, getters = null }) {
  return {
    namespaced: true,
    state,
    mutations: composeMutations(state),
    actions,
    getters
  };
}

export function bind(prop, localName = null) {
  if (Array.isArray(prop)) {
    return prop.reduce((acc, p) => ({ ...acc, ..._bind(p) }), {});
  }
  return _bind(prop, localName);
}

export function dualBind(prop, localName = null) {
  if (Array.isArray(prop)) {
    return prop.reduce((acc, p) => ({ ...acc, ..._dualBind(p) }), {});
  }
  return _dualBind(prop, localName);
}

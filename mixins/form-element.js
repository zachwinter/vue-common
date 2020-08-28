import FormElement from '../components/forms/FormElement'

export default {
  props: {
    value: {
      required: true
    },
    label: {
      type: String,
      default: null
    },
    caption: {
      type: String,
      default: null
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ''
    }
  },
  components: { FormElement }
}
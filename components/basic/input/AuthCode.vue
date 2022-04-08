<template>
  <div class="code" v-bind="$attrs">
    <label
      for="code-one"
      class="code-label"
      :class="{ error: !isValid }"
    ><slot /></label>
    <div class="code_group">
      <input
        id="code-one"
        ref="one"
        v-model="$v.one.$model"
        type="number"
        class="code-input"
        :class="{ error: !isValid }"
        min="0"
        max="9"
        @paste="onPaste"
      >
      <span class="code-dash" />
      <input
        id="code-two"
        ref="two"
        v-model="$v.two.$model"
        type="number"
        class="code-input"
        :class="{ error: !isValid }"
        min="0"
        max="9"
      >
      <span class="code-dash" />
      <input
        id="code-three"
        ref="three"
        v-model="$v.three.$model"
        type="number"
        class="code-input"
        :class="{ error: !isValid }"
        min="0"
        max="9"
      >
      <span class="code-dash" />
      <input
        id="code-four"
        ref="four"
        v-model="$v.four.$model"
        type="number"
        class="code-input"
        :class="{ error: !isValid }"
        min="0"
        max="9"
      >
    </div>
  </div>
</template>

<script>
import { required, numeric, minValue, maxValue } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'
export default {
  inheritAttrs: false,
  props: {
    isError: {
      default: false,
      type: Boolean
    }
  },
  watch: {
    one (value) {
      if (value.length !== 0) {
        this.$refs.two.focus()
      }
    },
    two (value) {
      if (this.one.length && value.length !== 0) {
        this.$refs.three.focus()
      } else {
        this.$refs.one.focus()
      }
    },
    three (value) {
      if (this.two.length && value.length !== 0) {
        this.$refs.four.focus()
      } else {
        this.$refs.two.focus()
      }
    },
    four (value) {
      if (this.three.length && value.length === 0) {
        this.$refs.three.focus()
      }
    }
  },
  computed: {
    isValid () {
      return !this.isError
    },
    one: {
      get () {
        return this.VERIFICATION_CODE.one
      },
      set (value) {
        this.$emit('resetVerification')
        if (value.length > 1) {
          this.$store.commit('SET_VERIFICATION_CODE', { one: value[1] })
        } else {
          this.$store.commit('SET_VERIFICATION_CODE', { one: value })
        }
      }
    },
    two: {
      get () {
        return this.VERIFICATION_CODE.two
      },
      set (value) {
        this.$emit('resetVerification')
        if (value.length > 1) {
          this.$store.commit('SET_VERIFICATION_CODE', { two: value[1] })
        } else {
          this.$store.commit('SET_VERIFICATION_CODE', { two: value })
        }
      }
    },
    three: {
      get () {
        return this.VERIFICATION_CODE.three
      },
      set (value) {
        this.$emit('resetVerification')
        if (value.length > 1) {
          this.$store.commit('SET_VERIFICATION_CODE', { three: value[1] })
        } else {
          this.$store.commit('SET_VERIFICATION_CODE', { three: value })
        }
      }
    },
    four: {
      get () {
        return this.VERIFICATION_CODE.four
      },
      set (value) {
        this.$emit('resetVerification')

        if (value.length > 1) {
          console.log('birnima')
          this.$store.commit('SET_VERIFICATION_CODE', {
            four: value[value.length - 1]
          })
        } else {
          console.log('nimadir', value)
          this.$store.commit('SET_VERIFICATION_CODE', { four: value })
        }
      }
    },
    code () {
      const codeString = `${this.one}${this.two}${this.three}${this.four}`
      return codeString
    },
    ...mapGetters(['VERIFICATION_CODE'])
  },
  validations: {
    one: {
      required
      // numeric
      // minValue: minValue(0),
      // maxValue: maxValue(9)
    },
    two: {
      required,
      numeric,
      minValue: minValue(0),
      maxValue: maxValue(9)
    },
    three: {
      required,
      numeric,
      minValue: minValue(0),
      maxValue: maxValue(9)
    },
    four: {
      required,
      numeric,
      minValue: minValue(0),
      maxValue: maxValue(9)
    }
  },
  methods: {
    onPaste (event) {
      const copiedVal = event.clipboardData.getData('text')
      if (copiedVal && copiedVal.length === 4) {
        console.log(copiedVal)
        this.one = copiedVal.split('')[0]
        console.log(this.one)
        this.two = copiedVal.split('')[1]
        console.log(this.two)
        this.three = copiedVal.split('')[2]
        console.log(this.three)
        const four = copiedVal.split('')[3]
        this.four = four
        console.log(this.four)
      }
    },
    reset () {
      this.$refs.one.focus()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';

.code {
  display: grid;
  grid-template-rows: 1.5em auto;
  grid-row-gap: 15px;
  align-items: center;
  width: 100%;

  @media screen and (min-width: 992px) {
    grid-template-rows: auto;
    grid-row-gap: 0;
  }

  &-label {
    font-family: $ff-gilroy;
    font-size: 12px;
    color: $c-green;

    @media screen and (min-width: 992px) {
      display: none;
    }

    &.error {
      color: $c-error;
    }
  }

  &_group {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }

  &-dash {
    display: none;

    @media screen and (min-width: 992px) {
      display: block;
      width: 9px;
      margin: 0px 10px;
      height: 1px;
      background-color: $c-primary;
    }
  }

  &-input {
    box-shadow: 0px 3px 6px #11100029;
    border: 1px solid #e2e2e2;
    border-radius: 7px;
    padding: 5px 10px;
    width: 100%;
    height: 40px;
    background: #ffffff 0% 0% no-repeat padding-box;
    text-align: center;
    font-family: $ff-roboto;
    font-weight: bold;

    @media screen and (min-width: 992px) {
      background: #ffffff 0% 0% no-repeat padding-box;
      box-shadow: 0px 6px 7px #d5d5d51a;
      border: 1px solid #e2e2e2;
      border-radius: 4px;
      height: 50px;
      width: 60px;
    }

    &.error {
      border-color: $c-error;
    }
  }
}
</style>

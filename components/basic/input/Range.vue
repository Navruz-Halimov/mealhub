<template>
  <input
    type="range"
    v-bind="$attrs"
    :value="value"
    @input="$emit('input', $event.target.value)"
  >
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Number]
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~/assets/styles/abstract/var';

  // excess height to improve interactive area / accessibility
  $_height: 29px;
  $_thumb-height: 25px;
  $_track-height: 2px;

  // border
  $_border-width: 2px;

  // colours
  $_upper-color: $orange;
  $_lower-color: $green;
  $_thumb-image: url('../../../static/icons/consumables/dinner.svg') center center no-repeat, #fff;
  $_thumb-image-size: 10px;

  $_upper-background: linear-gradient(to bottom, $_upper-color, $_upper-color) 100% 50% / 100% $_track-height no-repeat transparent;
  $_lower-background: linear-gradient(to bottom, $_lower-color, $_lower-color) 100% 50% / 100% $_track-height no-repeat transparent;

  // Webkit cannot style progress so we fake it with a long shadow
  // on the thumb element
  @function webkit-slider-thumb-shadow($i: 1) {
    $val: #{$i}px 0 0 -#{($_thumb-height - $_track-height) / 2} #{$_upper-color};
    @if $i == 1 {
      @for $k from 2 through 1000 {
        $val: #{$val}, webkit-slider-thumb-shadow($k);
      }
    }
    @return $val;
  }

  input[type="range"] {
    display: block;
    appearance: none;
    width: 100%;
    margin: 0;
    height: $_height;
    overflow: hidden;
    cursor: pointer;

    &:focus {
      outline: none;
    }
  }

  // Webkit
  input[type="range"]::-webkit-slider-runnable-track {
    width: 100%;
    height: $_height;
    background: $_lower-background;
  }

  input[type="range"]::-webkit-slider-thumb {
    position: relative;
    appearance: none;
    height: $_thumb-height;
    width: $_thumb-height;
    background: $_thumb-image;
    background-size: $_thumb-image-size;
    border: {
      width: $_border-width;
      style: solid;
      color: $c-green;
      radius: 100%;
    }
    top: 50%;
    margin-top: (-$_thumb-height/2);
    box-shadow: webkit-slider-thumb-shadow();
    transition: background-color 150ms;
  }

  // Firefox
  input[type="range"]::-moz-range-track,
  input[type="range"]::-moz-range-progress {
    width: 100%;
    height: $_height;
    background: $_upper-background;
  }

  input[type="range"]::-moz-range-progress {
    background: $_lower-background;
  }

  input[type="range"]::-moz-range-thumb {
    appearance: none;
    margin: 0;
    height: $_thumb-height;
    width: $_thumb-height;
    background: $_thumb-image;
    background-size: $_thumb-image-size;
    border: {
      width: $_border-width;
      style: solid;
      color: $c-green;
      radius: 100%;
    }
    transition: background-color 150ms;
  }

  // Internet Exploder
  input[type="range"]::-ms-track {
    width: 100%;
    height: $_height;
    border: 0;
    // color needed to hide track marks
    color: transparent;
    background: transparent;
  }

  input[type="range"]::-ms-fill-lower {
    background: $_lower-background;
  }

  input[type="range"]::-ms-fill-upper {
    background: $_upper-background;
  }

  input[type="range"]::-ms-thumb {
    appearance: none;
    height: $_thumb-height;
    width: $_thumb-height;
    background: $_thumb-image;
    background-size: $_thumb-image-size;
    border: {
      width: $_border-width;
      style: solid;
      color: $c-green;
      radius: 100%;
    }
    transition: background-color 150ms;
    // IE Edge thinks it can support -webkit prefixes
    top: 0;
    margin: 0;
    box-shadow: none;
  }
</style>

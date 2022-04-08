<i18n>
{
  "en": {
    "streetLabel": "St.",
    "houseLabel": "h.",
    "sectionLabel": "sec.",
    "flatLabel": "fl."
  },
  "ru": {
    "streetLabel": "Вул.",
    "houseLabel": "д.",
    "sectionLabel": "кор.",
    "flatLabel": "кв."
  }
}
</i18n>

<template>
  <ul class="places">
    <li v-for="(address, i) in list" :key="i" class="place" :class="{active: CURRENT_ADDRESS.id === address.id}" @click.stop="viewAddress(address.id)">
      <span class="place-icon">
        <img src="~/assets/icons/map1.svg">
      </span>
      <p v-if="address.address && address.address.length !== 0" class="place-text">
        {{ address.address }}
      </p>
      <p v-else class="place-text">
        {{ $t('streetLabel') }} {{ address.street }}, {{ $t('houseLabel') }} {{ address.house }}, {{ $t('sectionLabel') }} {{ address.section }}, {{ $t('flatLabel') }} {{ address.flat }}, {{ address.city }}
      </p>
      <div class="place_actions">
        <span class="place-action" @click.stop="editAddress(address.id)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.405 14.104"><path d="M12.425,5.661,12.062,4.8a15.684,15.684,0,0,0,.771-1.982l-1.12-1.094a15.478,15.478,0,0,0-1.987.8l-.881-.356A15.557,15.557,0,0,0,7.96.226H6.38a14.667,14.667,0,0,0-.83,1.939l-.879.357a16.306,16.306,0,0,0-2.024-.755L1.527,2.862A14.766,14.766,0,0,0,2.34,4.808l-.364.863A16.487,16.487,0,0,0,0,6.535V8.084A15.3,15.3,0,0,0,1.981,8.9l.364.861a15.767,15.767,0,0,0-.772,1.981l1.12,1.1a15.747,15.747,0,0,0,1.986-.8l.881.357a15.451,15.451,0,0,0,.885,1.934H8.026a14.756,14.756,0,0,0,.83-1.939l.882-.357a16.432,16.432,0,0,0,2.021.756l1.12-1.095a14.605,14.605,0,0,0-.814-1.946l.363-.863a16.308,16.308,0,0,0,1.977-.867V6.471A15.322,15.322,0,0,0,12.425,5.661ZM9.512,7.277A2.31,2.31,0,1,1,7.2,5.019,2.288,2.288,0,0,1,9.512,7.277Z" transform="translate(0 -0.226)" /></svg></span>
        <span class="place-action" @click.stop="deleteAddress(address.id)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.405 14.104"><path d="M55.949,1.69h-2.2a1.909,1.909,0,0,0-3.792,0h-2.2A1.613,1.613,0,0,0,46.155,3.3v.083a1.613,1.613,0,0,0,1.018,1.5v7.612A1.613,1.613,0,0,0,48.784,14.1h6.146a1.613,1.613,0,0,0,1.611-1.611V4.881a1.613,1.613,0,0,0,1.018-1.5V3.3A1.613,1.613,0,0,0,55.949,1.69ZM51.858.764a1.147,1.147,0,0,1,1.124.926H50.734A1.147,1.147,0,0,1,51.858.764Zm3.92,11.728a.848.848,0,0,1-.847.847H48.784a.848.848,0,0,1-.847-.847V5h7.84ZM56.8,3.384a.848.848,0,0,1-.847.847H47.766a.848.848,0,0,1-.847-.847V3.3a.848.848,0,0,1,.847-.847h8.183A.848.848,0,0,1,56.8,3.3v.083Z" transform="translate(-46.155 0)" /><path d="M158.457,254.637a.382.382,0,0,0,.382-.382v-4.3a.382.382,0,1,0-.764,0v4.3A.382.382,0,0,0,158.457,254.637Z" transform="translate(-154.803 -242.275)" /><path d="M228.527,254.637a.382.382,0,0,0,.382-.382v-4.3a.382.382,0,1,0-.764,0v4.3A.382.382,0,0,0,228.527,254.637Z" transform="translate(-222.825 -242.275)" /><path d="M298.6,254.637a.382.382,0,0,0,.382-.382v-4.3a.382.382,0,1,0-.764,0v4.3A.382.382,0,0,0,298.6,254.637Z" transform="translate(-290.845 -242.275)" /></svg></span>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['ADDRESSES', 'CURRENT_ADDRESS']),
    list () {
      const l = [...this.ADDRESSES]
      return l.sort((a, b) => b.id - a.id)
    }
  },
  methods: {
    editAddress (addressId) {
      const data = {
        action: 'edit',
        step: 0
      }

      this.$store.commit('SET_CURRENT_ADDRESS', addressId)
      this.$emit('edit-address', data)
    },
    viewAddress (addressId) {
      const data = {
        action: 'edit',
        step: 0
      }

      this.$store.commit('SET_CURRENT_ADDRESS', addressId)
      this.$emit('view-address', data)
    },
    deleteAddress (addressId) {
      this.$emit('toggle-prompt-popup', addressId)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~/assets/styles/abstract/var';

    .place:hover {
      background-color: $orange;
      border-color: $orange;
      color: $c-light;

      img {
        filter: brightness(10);
      }

      .place_actions {
        svg {
          fill: $c-light;
        }
      }

    }

  .places {
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow-y: auto;

    @media screen and (min-width: 992px) {
      border-bottom: 1px solid $c-line;
      margin-bottom: 15px;
    }
    @media screen and (min-width: 992px) and (max-width: 1200px){
      .place {
        flex-wrap: wrap;
        &-icon {
          order: 1;
        }
        &-text {
          order: 3;
        }
        &_actions {
          order: 2;
        }
      }
    }

  }

  .place {
    display: flex;
    align-items: center;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 14px;
    min-height: 5rem;
    border: 1px solid $c-line;
    border-bottom: none;
    color: #777;

    @media screen and (max-width: 991px) {
      border: none;
      border-bottom: 1px solid $c-line;
    }

    &-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 20px;
      flex: 0 0 20px;
      height: 25px;
      margin-left: .5rem;
      margin-right: 1.5rem;

      img {
        width: 100%;
        height: 100%;
        fill: $c-line;
      }
    }

    &-number {
      font-family: $ff-gilroy;
      font-size: 16px;
      font-weight: normal;

      @media screen and (min-width: 992px) {
        font-size: 14px;
      }

      &-text {
        overflow: hidden;
        font-size: 20px;
        font-weight: bold;

        @media screen and (min-width: 992px) {
          font-size: 18px;
        }
      }
    }

    &_actions {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-left: auto;
      width: 7em;
    }

    &-action {
      width: 18px;
      height: 18px;
      cursor: pointer;

      &:last-child {
        margin-left: 10px;
      }

      svg {
        width: 100%;
        height: 100%;
        fill: $c-input-placeholder;

        @media screen and (min-width: 992px) {
          fill: $c-line;
        }
      }
    }
  }
</style>

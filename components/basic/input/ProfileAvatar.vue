<i18n>
{
  "en": {
    "title": "Upload your photo:",
    "desc": "Not more than 5mb, .jpg, .jpeg, .png",
    "formatError": "You tried to load file with incorrect format"
  },
  "ru": {
    "title": "Загрузить свою фотографию:",
    "desc": "Не более 5mb, .jpg, .jpeg, .png",
    "formatError": "Вы попытались загрузить изображение некорректного формата"
  }
}
</i18n>

<template>
  <div class="profileAvatar_wrap">
    <p class="profileAvatar-title">
      {{ $t('title') }}
    </p>
    <label class="profileAvatar">
      <span class="profileAvatar-imgWrap">
        <span class="profileAvatar-img">
          <img
            ref="avatar"
            :src="value ? value : 'icons/consumables/userPlus.svg'"
            alt="Avatar"
            class="rounded wide toll"
          >
        </span>
      </span>
      <div class="profileAvatar_block">
        <p class="profileAvatar-desc text-gray">{{ $t('desc') }}</p>
      </div>
      <input
        class="profileAvatar-input"
        type="file"
        @change="changePhoto($event)"
      >
    </label>
    <span class="profileAvatar-remove" @click.stop="removePhoto">
      <svg viewBox="0 0 6 7" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M5.79506 4.79918L4.09654 3.10065C4.04137 3.04549 4.04137 2.95645 4.09654 2.90128L5.79313 1.20469C6.06896 0.928865 6.06896 0.4827 5.79313 0.206872C5.5173 -0.0689572 5.07114 -0.0689572 4.79531 0.206872L3.09872 1.90249C3.04355 1.95766 2.95451 1.95766 2.89935 1.90249L1.20469 0.207839C0.928865 -0.0679893 0.4827 -0.0679893 0.206872 0.207839C-0.0689572 0.483668 -0.0689572 0.929833 0.206872 1.20566L1.90346 2.90225C1.95863 2.95742 1.95863 3.04646 1.90346 3.10162L0.206872 4.79821C-0.0689572 5.07404 -0.0689572 5.5202 0.206872 5.79603C0.4827 6.07186 0.928865 6.07186 1.20469 5.79603L2.90225 4.09848C2.95742 4.04525 3.04452 4.04525 3.09872 4.09848L4.79531 5.79506C5.07114 6.07089 5.5173 6.07089 5.79313 5.79506C6.06896 5.51924 6.06896 5.07307 5.79313 4.79724L5.79506 4.79918Z"
        />
      </svg>
    </span>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      required: true
    }
  },
  computed: {
    avatar () {
      return this.$refs.avatar
    }
  },
  methods: {
    removePhoto () {
      const cookiz = this.$cookies
      this.$store.dispatch('DELETE_PERSONAL_AVATAR', cookiz)
      this.$parent.profile.photo = ''
      this.$parent.profile.photoFile = ''
    },
    changePhoto (e) {
      const selectedImage = e.target.files[0]
      if (
        selectedImage.type === 'image/jpeg' ||
        selectedImage.type === 'image/png' ||
        selectedImage.type === 'image/svg+xml' ||
        selectedImage.type === 'image/webp'
      ) {
        this.createUrlImage(selectedImage) // For preview
        // this.createBinaryString(selectedImage)// For upload
      } else {
        console.dir(selectedImage)
        alert(this.$t('formatError'))
      }
    },
    createUrlImage (fileObject) {
      const reader = new FileReader()
      const vm = this

      reader.onload = (e) => {
        vm.$parent.profile.photoFile = fileObject
        vm.$emit('input', e.target.result)
      }

      reader.readAsDataURL(fileObject)
    },
    createBinaryString (fileObject) {
      const reader = new FileReader()
      const vm = this

      reader.onload = (e) => {
        const result = e.target.result
        vm.$parent.profile.photoFile = result
      }
      reader.readAsBinaryString(fileObject)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';

.profileAvatar {
  display: flex;
  align-items: center;
  width: 100%;
  cursor: pointer;

  &_wrap {
    position: relative;
  }

  &-imgWrap {
    position: relative;
    min-width: 80px;
    width: 80px;
    min-height: 80px;
    height: 80px;

    @media screen and (min-width: 992px) {
      min-width: 70px;
      width: 70px;
      min-height: 70px;
      height: 70px;
    }
  }

  &-img {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
    height: 90%;
    object-fit: cover;
    overflow: hidden;

    img {
      object-fit: cover;
      width: 55px;
      height: 55px;
    }
  }

  &-remove {
    position: absolute;
    top: 22px;
    left: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px;
    background-color: $light;
    font-family: $ff-gilroy;
    font-weight: bold;
    font-size: 14px;
    color: $c-line;
    cursor: pointer;

    @media screen and (min-width: 992px) {
      transform: translate(-25%, -25%);
    }
    svg {
      width: 8px;
      height: 8px;
      fill: #21a290;
    }
  }

  &_block {
    margin-left: 10px;
    font-family: $ff-gilroy;
  }

  &-title {
    font-size: 14px;
    color: $c-primary;
  }

  &-desc {
    margin-top: 5px;
    font-size: 12px;
    color: #707070;
  }

  &-input {
    display: none;
  }
}
</style>

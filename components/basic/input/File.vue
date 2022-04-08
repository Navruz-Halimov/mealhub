<i18n>
{
  "en": {
    "addImages": "Add images",
    "filesRestrictions": "Allowed no more then {n} files",
    "typesRestrictions": "in {n} formats",
    "sizeRestrictions": " weighing no more than {n} Mb"
  },
  "ru": {
    "addImages": "Прикрепить файлы",
    "filesRestrictions": "Допускается не более {n} файлов",
    "typesRestrictions": "в формате {n}",
    "sizeRestrictions": "весом не более {n} Мб"
  }
}
</i18n>

<template>
  <label
    :class="{
      'error': hasError,
      'file-input_minimized': filesCount > 0,
      'file-input_no-adding': filesCount >= maxFiles
    }"
    class="file-input"
    @click="prevent"
  >
    <div class="file-input__container">
      <div class="file-input__top">
        <div class="file-input__img">
          <img src="@/assets/icons/file-input-logo.svg">
        </div>
        <div class="file-input__info">
          <div class="file-input__title">
            {{ $t('addImages') }}
          </div>
          <div class="file-input__restrictions">
            {{ restrictions }}
          </div>
        </div>
      </div>
      <div
        :class="{ 'files_large': isLarge }"
        class="files"
      >
        <template v-for="(array, arrayIndex) in [initialFiles, files]">
          <div
            v-for="(file, fileIndex) in array"
            :key="`array${arrayIndex}-file${fileIndex}`"
            class="file"
            @click.prevent
          >
            <div class="file__content">
              <div class="file__preview">
                <img v-if="file.img_path" :src="file.img_path">
                <img v-else :src="getFileUrl(file)">
              </div>
              <div class="file__close" @click="deleteFile(array, fileIndex)">
                <img src="~/static/icons/close.svg">
              </div>
            </div>
          </div>
        </template>
        <div v-show="filesCount > 0 && filesCount < maxFiles" class="files__add">
          <svg data-v-4031b9ee="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33.859 33.859"><path data-v-4031b9ee="" d="M21.8,9.833H14.536a.428.428,0,0,1-.428-.428V2.138a2.138,2.138,0,1,0-4.275,0V9.406a.428.428,0,0,1-.428.428H2.138a2.138,2.138,0,1,0,0,4.275H9.406a.428.428,0,0,1,.428.428V21.8a2.138,2.138,0,0,0,4.275,0V14.536a.428.428,0,0,1,.428-.428H21.8a2.138,2.138,0,0,0,0-4.275Zm0,0" transform="translate(16.93) rotate(45)" /></svg>
        </div>
      </div>
    </div>
    <input
      ref="fileinput"
      :accept="types"
      type="file"
      class="file-input__input"
      multiple
      @change="uploadFiles"
    >
  </label>
</template>

<script>
export default {
  props: {
    initialFiles: {
      type: Array,
      default: () => []
    },
    isLarge: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      maxFiles: 6,
      maxSize: 5000,
      types: '.jpg,.jpeg,.png',
      files: [],
      sizeError: false,
      formatError: false,
      lengthError: false,
      error: false
    }
  },
  computed: {
    restrictions () {
      return this.getRestrictions()
    },
    filesCount () {
      return this.files.length + this.initialFiles.length
    },
    hasError () {
      return this.sizeError || this.formatError || this.lengthError
    }
  },
  watch: {
    formatError (value) {
      this.$emit('format-error-changed', value)
    },
    sizeError (value) {
      this.$emit('size-error-changed', value)
    },
    lengthError (value) {
      this.$emit('length-error-changed', value)
    }
  },
  methods: {
    resetErrors () {
      this.sizeError = false
      this.formatError = false
      this.lengthError = false
    },
    getRestrictions () {
      let output = ''
      const types = this.types
        .split(',')
        .join(', ')
      output += this.$tc('filesRestrictions', this.maxFiles) + ' '
      output += this.$tc('typesRestrictions', types) + ' '
      output += this.$tc('sizeRestrictions', this.maxSize / 1000)
      return output
    },
    prevent (event) {
      if (this.filesCount >= this.maxFiles) {
        event.preventDefault()
      }
    },
    deleteFile (array, index) {
      if (array[index].img_path) {
        this.$emit('deleteInitialFile', array, index)
      } else {
        array.splice(index, 1)
      }
      this.resetErrors()
    },
    getFileUrl (file) {
      return URL.createObjectURL(file)
    },
    getFileType (file) {
      return file.type.split('/')[1]
    },
    checkFile (file) {
      if (file.size / 1000 >= this.maxSize) {
        this.sizeError = true
        return false
      }

      const isTypeCorrect = this.types
        .split(',')
        .find(item => item === '.' + this.getFileType(file))

      if (!isTypeCorrect) {
        this.formatError = true
        return false
      }

      return true
    },
    checkFiles (files) {
      let max = files.length
      for (let i = 0; i < max; i++) {
        if (!this.checkFile(files[i])) {
          files.splice(i, 1)
          i--
          max--
        }
      }

      const filesLength = files.length + this.files.length + this.initialFiles.length
      if (filesLength > this.maxFiles) {
        files.splice(this.maxFiles - this.files.length - this.initialFiles.length)
        this.lengthError = true
      }

      return true
    },
    uploadFiles () {
      const files = [...this.$refs.fileinput.files]
      this.$refs.fileinput.value = ''
      this.resetErrors()

      if (this.checkFiles(files)) {
        files.forEach(item => this.files.push(item))
        this.error = this.filesCount > this.maxFiles
      } else {
        this.error = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';

.file-input {
  display: block;
  background: #FFFFFF;
  border: 1px dashed #E2E2E2;
  cursor: pointer;

  &_minimized {
    .file-input {
      &__top {
        display: none;
      }
    }

    .files {
      margin-top: -10px
    }
  }

  &_no-adding {
    cursor: default;
  }

  &.error {
    border-color: $error;
  }

  &__container {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 13px 19px
  }

  &__top {
    display: flex;
  }

  &__img {
    flex: 34px 0 0;
    width: 34px;
    height: 30px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  &__info {
    margin-left: 20px;
  }

  &__title {
    text-align: left;
    font: normal normal 300 14px/14px Gilroy-Light;
    letter-spacing: 0;
    color: $dark;
  }

  &__restrictions {
    text-align: left;
    font: normal normal 300 12px/14px Gilroy-Light;
    letter-spacing: 0;
    color: #afafaf;
    margin-top: 7px;
  }

  &__input {
    display: none;
  }

  .files {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;

    &_large {
      justify-content: flex-start;
      margin: -0.5%;

      .file {
        margin: 0.5%;
        width: 15.6%;
        padding-top: 15.6%;
      }

      .files__add {
        margin: 0.5%;
        width: calc(15.6% - 2px);
        padding-top: calc(15.6% - 2px);
      }

      @media screen and (max-width: 991px) {
        .file {
          margin: 1%;
          width: 48%;
          padding-top: 48%;
        }

        .files__add {
          margin: 1%;
          width: calc(48% - 2px);
          padding-top: calc(48% - 2px);
        }
      }
    }

    &__add {
      position: relative;
      width: 31%;
      padding-top: 31%;
      margin-top: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #f3f3f3;
      border: 1px solid #E2E2E2;
      cursor: pointer;

      svg {
        position: absolute;
        top: 20%;
        left: 20%;
        width: 60%;
        height: 60%;
        fill: #848484;
        transform: rotate(45deg);
      }
    }
  }

  .file {
    position: relative;
    width: 31%;
    padding-top: 31%;
    margin-top: 10px;

    &__content {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }

    &__close {
      position: absolute;
      cursor: pointer;
      top: 5px;
      right: 5px;
      width: 12%;
      padding-top: 12%;

      img {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
      }
    }

    &__preview {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      background-color: #eaeaea;

      &_text {
        overflow: hidden;
        text-overflow: ellipsis;
        margin-left: 14px;
        margin-right: 14px;
      }

      &_pdf {
        overflow: hidden;
        text-overflow: ellipsis;
        margin-left: 14px;
        margin-right: 14px;
        font-size: 20px;
        font-weight: 700;
      }

      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
  }

  @media screen and (max-width: 991px) {
    box-shadow: 0 3px 6px #00000029;
    border-radius: 8px;

    &__title {
      font: normal normal 300 14px/14px Gilroy-Light;
    }

    &__restrictions {
      margin-top: 4px;
      font: normal normal 300 12px/14px Gilroy-Light;
    }

    &__img {
      flex: 45px 0 0;
      width: 45px;
      height: 40px;
    }

    .file {
      width: 48%;
      padding-top: 48%;
    }

    .files {
      &__add {
        width: 48%;
        padding-top: 48%;
      }
    }
  }
}
</style>

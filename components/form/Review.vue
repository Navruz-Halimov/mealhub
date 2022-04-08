<i18n>
{
  "en": {
    "starsError": "You need to select stars amount",
    "titleError": "This Email is not registered",
    "fieldsRequired": "Check all fields",
    "minLength": "Review must be 100+ characters",
    "maxLength": "Maximum 2000 characters",
    "maxLengthTitle": "Maximum 50 characters in title",

    "title": "Add review about catering",
    "titleChange": "Change catering review",
    "titlePlaceholder": "Title",
    "textPlaceholder": "Message",

    "questLabel": "Choose scores",
    "firstLabel": "Food",
    "secondLabel": "Stuff",
    "thirdLabel": "Price/Quality",

    "filesLabel": "Include files",
    "aboutFilesLabel": "Allowed 6 files in formats .jpg, .png with max size 5 MB",

    "saveLabel": "Save",

    "fileFormatError": "You can load only {n} formats",
    "fileSizeError": "Max file size is {n} Mb",
    "filesLengthError": "Max files amount is {n}"
  },
  "ru": {
    "starsError": "Укажите количетсво звезд",
    "titleError": "Данный адрес не зарегистрирован",
    "fieldsRequired": "Заполните все поля",
    "minLength": "Отзыв должен быть 100+ символов",
    "maxLength": "Максимум 2000 символов",
    "maxLengthTitle": "Максимум 50 символов в заголовке",

    "title": "Оставить отзыв о заведении",
    "titleChange": "Изменить отзыв о заведении",
    "titlePlaceholder": "Заголовок",
    "textPlaceholder": "Текст сообщения",

    "questLabel": "Оцените заведение",
    "firstLabel": "Питание",
    "secondLabel": "Обслуживание",
    "thirdLabel": "Цена/Качество",

    "filesLabel": "Прикрепить файлы",
    "aboutFilesLabel": "Допускаеться не более 5 файлов в формате .jpg, .png весом не более 5 MB",

    "saveLabel": "Сохранить",

    "fileFormatError": "Вы можете загрузить только форматы: {n}",
    "fileSizeError": "Максимальный размер файла {n} Мб",
    "filesLengthError": "Максимальное количество файлов: {n}"
  }
}
</i18n>

<template>
  <form v-if="CURRENT_CATERING" class="formReview" @submit.prevent>
    <div class="formReview_body">
      <h1 class="formReview-title">
        {{ review ? $t('titleChange') : $t('title') }}

        <p class="formReview_address-txt">
          {{ CURRENT_CATERING.name }},
          {{ `${CURRENT_CATERING.address.street}, ${CURRENT_CATERING.address.building}, ${CURRENT_CATERING.address.city}` }}
        </p>

        <p v-if="$v.stars.$error" class="formReview-errorTitle">
          {{ $t('starsError') }}
        </p>
        <p v-if="$v.text.$error" class="formReview-errorTitle">
          {{ $t('fieldsRequired') }}
        </p>
        <p v-if="!$v.text.minLength" class="formReview-errorTitle">
          {{ $t('minLength') }}
        </p>
        <p v-if="!$v.text.maxLength" class="formReview-errorTitle">
          {{ $t('maxLength') }}
        </p>
        <p v-if="!$v.title.maxLength" class="formReview-errorTitle">
          {{ $t('maxLengthTitle') }}
        </p>
        <p v-if="fileFormatError" class="review__error">
          {{ $tc('fileFormatError', allowedFileFormats) }}
        </p>
        <p v-if="fileSizeError" class="review__error">
          {{ $tc('fileSizeError', $refs.fileInput.maxSize / 1000) }}
        </p>
        <p v-if="filesLengthError" class="review__error">
          {{ $tc('filesLengthError', $refs.fileInput.maxFiles) }}
        </p>
      </h1>

      <div class="wide reviewFormBody">
        <div class="flex">
          <div class="quad">
            <p class="questLabel">
              {{ $t('questLabel') }}:
            </p>
            <p class="fr_mark">
              <addition-stars
                class="stars mr-1"
                :rate="cuisine_mark"
                @input="set_cuisine_mark"
              />
              {{ $t('firstLabel') }}
            </p>
            <p class="fr_mark">
              <addition-stars
                class="stars mr-1"
                :rate="service_mark"
                @input="set_service_mark"
              />
              {{ $t('secondLabel') }}
            </p>
            <p class="fr_mark">
              <addition-stars
                class="stars mr-1"
                :rate="pricing_mark"
                @input="set_pricing_mark"
              />
              {{ $t('thirdLabel') }}
            </p>
          </div>
          <div class="hex">
            <input
              id="title"
              ref="title"
              v-model="$v.title.$model"
              class="titleInput"
              :placeholder="$t('titlePlaceholder')"
              :class="{error: $v.title.$error}"
            >
            <div class="textareaWrap">
              <textarea
                ref="about_field"
                v-model="text"
                :placeholder="$t('textPlaceholder')"
                class="group-textarea"
                :class="{error: $v.text.$error}"
                @input="$v.text.$touch()"
              />
              <span class="textarea_counter">{{ text.length }}</span>
            </div>
          </div>
        </div>
        <basic-input-file
          ref="fileInput"
          :initial-files="previews"
          is-large
          class="formReview-fileInput"
          @format-error-changed="value => fileFormatError = value"
          @size-error-changed="value => fileSizeError = value"
          @length-error-changed="value => filesLengthError = value"
          @deleteInitialFile="deleteLoadedFile"
        />
      </div>

      <div class="wide flex j_c a_c">
        <template v-if="loaded">
          <button class="mobile formReview-btn eatme-btn-colorful" @click="review ? updateForm() : sendForm()">
            {{ $t('saveLabel') }}
          </button>
          <button class="desktop formReview-btn eatme-btn-red" @click="review ? updateForm() : sendForm()">
            {{ $t('saveLabel') }}
          </button>
        </template>
        <template v-else>
          <button class="mobile formReview-btn eatme-btn-disabled">
            {{ $t('saveLabel') }}
          </button>
          <button class="desktop formReview-btn eatme-btn-disabled">
            {{ $t('saveLabel') }}
          </button>
        </template>
      </div>
    </div>
  </form>
</template>

<script>
import { mapGetters } from 'vuex'
import { required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators'
export default {
  props: {
    review: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      loaded: true,
      title: '',
      text: '',
      cuisine_mark: 0,
      service_mark: 0,
      pricing_mark: 0,
      previews: [],
      uploads: [],
      fileFormatError: false,
      fileSizeError: false,
      filesLengthError: false
    }
  },
  validations: {
    stars: {
      minValue: minValue(3)
    },
    title: {
      maxLength: maxLength(50)
    },
    text: {
      required,
      minLength: minLength(100),
      maxLength: maxLength(2000)
    },
    filesLength: {
      maxValue: maxValue(6)
    }
  },
  computed: {
    ...mapGetters(['CURRENT_CATERING', 'ADD_REVIEW']),
    filesLength () {
      return this.$refs.fileInput.files.length
    },
    allowedFileFormats () {
      return this.$refs.fileInput.types
        .replaceAll(',', ', ')
    },
    stars () {
      return !!this.cuisine_mark + !!this.service_mark + !!this.pricing_mark
    }
  },
  mounted () {
    if (this.review) {
      this.title = this.review.title
      this.text = this.review.review
      this.cuisine_mark = +(this.review.cuisine_mark || this.review.mark)
      this.service_mark = +(this.review.service_mark || this.review.mark)
      this.pricing_mark = +(this.review.pricing_mark || this.review.mark)
      this.previews = [...this.review.images]
      this.uploads = []
    }
  },
  methods: {
    deleteLoadedFile (array, index) {
      array.splice(index, 1)
    },
    resetFields () {
      this.title = ''
      this.text = ''
      this.cuisine_mark = 0
      this.service_mark = 0
      this.pricing_mark = 0
      this.previews = []
      this.uploads = []

      this.$nextTick(() => { this.$v.$reset() })
    },
    closeForm () {
      if (this.review) { this.$parent.$parent.toggleUpdatePopup() } else { this.$parent.$parent.toggleCreatePopup() }
    },

    set_cuisine_mark (val) {
      this.cuisine_mark = val
    },
    set_service_mark (val) {
      this.service_mark = val
    },
    set_pricing_mark (val) {
      this.pricing_mark = val
    },

    onPickImageList () {
      this.$refs.fileInputList.click()
    },
    onImageListPicked (event) {
      const selectedFiles = event.target.files || event.dataTransfer.files

      if (!selectedFiles.length) {
        return
      }
      this.createImage(selectedFiles)
    },
    createImage (files) {
      for (let i = 0; i < files.length; i++) {
        const fileReader = new FileReader()
        fileReader.onload = (e) => {
          this.previews.push(e.target.result)
        }
        fileReader.readAsDataURL(files[i])
        this.uploads.push(files[i])
      }
    },
    async updateLoadedFiles () {
      const cookiz = this.$cookies
      const id = this.CURRENT_CATERING.id
      const reviewID = this.review.id
      const files = this.review.images
      const updatedFiles = this.previews

      for (let i = 0; i < files.length; i++) {
        const fileIndex = updatedFiles.findIndex(item => item.id === files[i].id)

        if (fileIndex !== -1) {
          continue
        }

        const photoID = files[i].id
        await this.$store.dispatch('DELETE_REVIEW_PHOTO', { cookiz, id, reviewID, photoID })
      }
    },
    async updateForm () {
      const form = {
        title: this.title,
        review: this.text,
        cuisine_mark: this.cuisine_mark,
        service_mark: this.service_mark,
        pricing_mark: this.pricing_mark,
        uploads: this.uploads
      }

      const vm = this
      this.$v.$touch()

      if (this.$v.$invalid) {
        console.error('EATME ERROR sendForm')
        return
      }

      this.loaded = false
      const cookiz = vm.$cookies
      const id = vm.CURRENT_CATERING.id
      const reviewID = vm.review.id || vm.$route.params.review
      const uploads = [...this.$refs.fileInput.files]

      try {
        this.$store.commit('SET_CURRENT_REVIEW', form)
        await this.updateLoadedFiles()

        const { data } = await this.$store.dispatch('UPDATE_REVIEW', { cookiz, id, reviewID, uploads })

        if (!data.status) { return }

        vm.$parent.$parent.toggleUpdatePopup && vm.$parent.$parent.toggleUpdatePopup()
        vm.$parent.$parent.toggleSuccessPopup && vm.$parent.$parent.toggleSuccessPopup()
        vm.$parent.$parent.getReview && vm.$parent.$parent.getReview()
        vm.$parent.$parent.getReviews && vm.$parent.$parent.getReviews()

        // Если форма создания - редиректим к списку
        if (!vm.review) {
          vm.$router.push({ path: vm.localePath({ path: `/catering/${vm.$route.params.id}/reviews/` }) })
        }
        vm.resetFields()
        vm.loaded = true
      } catch (err) {
        console.warn(err)
        vm.$store.commit('SET_ERROR_NOTIFY', true)
        vm.loaded = true
      }
    },
    async sendForm () {
      const form = {
        title: this.title,
        review: this.text,
        cuisine_mark: this.cuisine_mark,
        service_mark: this.service_mark,
        pricing_mark: this.pricing_mark,
        uploads: this.$refs.fileInput.files
      }

      const vm = this
      this.$v.$touch()

      if (this.$v.$invalid) {
        console.error('EATME ERROR sendForm')
        return
      }

      this.loaded = false
      const cookiz = vm.$cookies

      this.$store.commit('SET_CURRENT_REVIEW', form)

      try {
        const { data } = await this.$store.dispatch('ADD_REVIEW', { cookiz, id: vm.CURRENT_CATERING.id })

        if (!data.status) { return }

        vm.$parent.$parent.toggleCreatePopup && vm.$parent.$parent.toggleCreatePopup()
        vm.$parent.$parent.toggleSuccessPopup && vm.$parent.$parent.toggleSuccessPopup()
        vm.$parent.$parent.getReviews()

        vm.$router.push({ path: vm.localePath({ path: `/catering/${vm.$router.currentRoute.params.id}/reviews/` }) })
        vm.resetFields()
        vm.loaded = true
      } catch (err) {
        console.warn(err)
        vm.$store.commit('SET_ERROR_NOTIFY', true)
        vm.loaded = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~/assets/styles/abstract/var';
  @import '~/assets/styles/abstract/mixins';
  @import '~/assets/styles/classes/class';
  @import '~/assets/styles/modificator';

  .add_review_icon{
    height: 4rem;
  }

  .questLabel{
    font-size: 14px !important;
    margin-bottom: 2rem;
  }

  @media screen and (max-width: 991px) {

    .desktop{
      display:none;
    }

    .questLabel{
      text-align: center;
      margin-top: 1rem;
      margin-bottom: 1rem;
    }

    .formReview{
      padding:0 !important;

      &_body {
        overflow:auto !important;
        padding-bottom:4rem;
      }

      &_address-txt{
        font-size: 14px !important;
        color:black !important;
      }
      &-title{
        font-size: 20px;
        color:$c-green;
        width: 11em;
        margin-top: 0;
        margin-bottom: 0;
      }

      .titleInput{
        margin-top: 1rem;
      }
      p{
        font-size: 16px;
      }

      /deep/ .stars {
        margin-right: 2rem;
        .star{
          width: 32px;
          min-width: 32px;
          height: 32px;
          flex: 0 0 32px;
        }
      }

      &-fileInput {
        margin-left: 5%;
        margin-right: 5%;
      }
    }

    .upload_box {
      width:90%;
      margin:0 auto;
      padding:1rem 2rem !important;
      border: 2px dashed #dedede !important;

      .text-lg{
        color:$c-green;
      }
    }

    .group-textarea, .upload_box, .titleInput {
      border-radius: 8px;
    }

    .reviewFormBody{

      & > .flex{
        flex-direction:column;
        .quad{
          width:90%;
          margin:auto;
        }
        .hex{
          width:90%;
          margin:auto;
        }
      }

    }
  }

  .addMore{
    border:1px solid #eee;
    color: #ddd;
    font-size: 2rem;
    border-radius: 5px;
  }
  .removePrev {
    b{
      position: absolute;
      top:.25rem;
      right:.25rem;
      border-radius: 1rem;
      padding: 3px;
      background: white;
      color: $c-error;

    }
  }
  .addMore, .removePrev{
    position: relative;
    display: inline-flex;
    margin:0 3px;
    justify-content: center;
    align-items: center;
    width: 15%;
    height: 5rem;

    img{
      width:100%;
      height:100%;
      object-fit: cover;
    }
  }

  .upload_box{
    padding: 2rem 0;
    border: 1px dashed #dedede;
    cursor: pointer;
  }

  .fr_mark{
    font-size: 14px !important;
    display: flex;
    align-items: center;
  }
  .stars{
    margin-bottom: 4px;
    /deep/ .star{
      width: 26px;
      height: 26px;
      flex :0 0 26px;
    }

  }

  .titleInput,
  .group-textarea{
    background: white;
    border: 1px solid #e2e2e2;
    border-radius: 5px;
    width: 100%;
    padding: 1rem;
    box-sizing: border-box;
    margin-bottom: .5rem;
    &.error {
      border-color: $c-error;
    }

    @media screen and (max-width: 991px) {
      box-shadow: 0 3px 6px #00000029;
      border-radius: 8px;
    }
  }
  .titleInput{
    font-size: 14px;
    margin-bottom: 1rem;
  }
  .group-textarea {
    font-size: 14px !important;
    width: 100% !important;
    min-height: 150px;
    resize: none;
  }

  .textareaWrap{
    position:relative;
    .textarea_counter{
      position:absolute;
      bottom:2rem;
      right:1.5rem;
      font-size:.8em;
      background:white;
    }
  }

  .reviewFormBody{
    font-size: 14px !important;

  }

  .requiredLabelWithStar{

    font-size: 14px;

    &::after{
      content: " *";
      display: inline-block;
      color: #eb608f;
      line-height: 1rem;
      font-size: 2rem;
      position: relative;
      top:  .5rem;
      left: .1em;
    }

  }

  .formReview {
    position: relative;
    display: flex;
    border-radius: 7px;
    padding: 70px 15px 10px 15px;
    margin: 0rem;
    width: 100%;
    z-index: 1;

    @media screen and (min-width: 992px) {
      padding: 1rem 5rem;
      width: 100% !important;

      &-fileInput {
        margin-left: 0;
        margin-right: 0;
      }
    }

    &_body {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      height: 100%;

      @media screen and (min-width: 992px) {
        align-items: center;
      }
    }

    &-logo {
      position: absolute;
      top: 0;
      right: 0;
      width: 75px;
      height: 65px;
      transform: translate(-15px, -70%);

      @media screen and (min-width: 992px) {
        display: none;
      }
    }

    &-title {
      font-family: $ff-roboto;
      font-size: 20px;
      font-weight: bold;
      text-align: center;

      @media screen and (min-width: 992px) {
        margin-bottom: 1rem;
        display: block;
        font-size: 22px;

        .formReview_address-txt {
          margin-top: 3rem;
          color:inherit;
        }
      }

      & > p {
        font-family: $ff-gilroy;
        font-size: $fz-md-sm;
        font-weight: 300;
        color: $c-error
      }
      & > p:nth-child(2) {
        margin-top: 1rem;
      }

      .formReview_address-txt {
        margin-top: 3rem;
      }
    }

    &-btn {
      width: 42%;
      font-size: 16px;
      margin-top: 3rem;
    }

    &_links {
      display: flex;
      align-items: center;
      font-size: 16px;

      @media screen and (min-width: 992px) {
        display: none;
      }

      & /deep/ {
        .login {
          position: relative;
          background: none;
          border: none;
          border-radius: 0;
          box-shadow: none;
          font-family: $ff-gilroy;
          font-size: $fz-md-medium;
          font-weight: 300;
          color: $c-primary;
          letter-spacing: 1px;

          @media screen and (min-width: 992px) {
            padding-right: 1em;
            padding-left: 1em;
          }
        }

        .register {
          border: none;

          & > a:first-child {
            display: flex;
            align-items: center;
            border: none;
            text-decoration: none;
            font-family: $ff-gilroy;
            font-size: $fz-md-medium;
            font-weight: 300;
            color: $c-primary;
            letter-spacing: 1px;
          }

          & > *:not(:first-child) {
            display: none;
          }
        }
      }
    }
  }

</style>

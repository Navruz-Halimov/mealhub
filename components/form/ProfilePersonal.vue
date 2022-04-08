<i18n>
{
  "en": {
    "phone": "Phone number",
    "firstNameLabel": "Your first name",
    "firstNamePlaceholder": "Josh",
    "lastNameLabel": "Last name",
    "lastNamePlaceholder": "Smith",
    "emailLabel": "E-mail",
    "genderLabel": "Your gender",
    "currencyLabel": "Your currency",
    "languageLabel": "Language",
    "emailPlaceholder": "Example@site.com",
    "snoteLabel": "Setup notifications",
    "birthdayLabel": "Birthday",
    "saveButton": "Save",
    "dataUpdateSuccess": "Data was saved successfully",
    "largeImageError": "Given image isn't correct",
    "serverError": "Some server error",
    "noDataError": "No error data",
    "male": "Male",
    "female": "Female",
    "unknown": "Not specified",
    "deleteAccount": "Delete account",
    "receiveNewsMessage": "Receive only notifications about news and promotions",
    "receiveSupportMessage": "Receive only support notifications",
    "receiveOrdersMessage": "Receive only notifications about the status of my orders",
    "receiveAllMessage": "Receive all notifications",
    "frontendRequestError": "Frontend error in request",
    "popupErrorMessage": "Fill the full field",
    "errorAvatarText": "No more than 5mb, .jpg, .jpeg, .png",
    "popupSuccessMessage": "Data is updated"

  },
  "ru": {
    "phone": "Номер телефона",
    "firstNameLabel": "Ваше имя",
    "firstNamePlaceholder": "Иван",
    "lastNameLabel": "Фамилия",
    "lastNamePlaceholder": "Иванов",
    "emailLabel": "Почта",
    "genderLabel": "Ваш пол",
    "currencyLabel": "Ваша валюта",
    "languageLabel": "Язык",
    "emailPlaceholder": "Example@site.com",
    "snoteLabel": "Настройка уведомлений",
    "birthdayLabel": "День рождения",
    "saveButton": "Сохранить",
    "dataUpdateSuccess": "Ваши данные успешно сохранены!",
    "largeImageError": "Ваше изображение некорректно",
    "serverError": "Возникла ошибка сервера",
    "noDataError": "Не указаны все данные",
    "male": "Мужской",
    "female": "Женский",
    "unknown": "Не указан",
    "deleteAccount": "Удалить аккаунт",
    "receiveNewsMessage": "Получать только уведомления о новостях и акциях",
    "receiveSupportMessage": "Получать только уведомления от службы поддержки",
    "receiveOrdersMessage": "Получать только уведомления о статусе моих заказов",
    "receiveAllMessage": "Получать все уведомления",
    "frontendRequestError": "Возникла ошибка при запросе",
    "popupErrorMessage": "Заполните все поля",
    "errorAvatarText": "Не более 5mb, .jpg, .jpeg, .png",
    "popupSuccessMessage": "Ваши данные успешно сохранены!"
  }
}
</i18n>

<template>
  <form class="form profile_personal wide " @submit.prevent>
    <div class="desktop flex col wide a_c">
      <p v-if="avatarErrorIsOpen" class="wide text-center red mb-2 text-lg">
        {{
          avatarErrorIsOpen.length ? avatarErrorIsOpen : $t('popupErrorMessage')
        }}
        <br>
        {{ $t('errorAvatarText') }}
      </p>
      <div class="flex w-9 j_b mb-1">
        <div class="w-3">
          <basic-input-profile-avatar
            ref="avatarInput"
            v-model="avatar"
            :class="{ avatarInputError: avatarErrorIsOpen }"
          />
        </div>

        <div class="w-33">
          <basic-input-profile-text
            v-model="$v.firstName.$model"
            class="wide"
            :is-error="$v.firstName.$error"
            :placeholder="$t('firstNamePlaceholder')"
          >
            {{ $t('firstNameLabel') }}
          </basic-input-profile-text>
        </div>

        <div class="w-33">
          <basic-input-profile-text
            v-model="$v.lastName.$model"
            class="wide"
            :is-error="$v.lastName.$error"
            :placeholder="$t('lastNamePlaceholder')"
          >
            {{ $t('lastNameLabel') }}
          </basic-input-profile-text>
        </div>
      </div>
      <div class="flex w-9 j_b mb-2">
        <div class="w-3">
          <basic-input-profile-text
            v-model.trim="$v.email.$model"
            class="wide"
            :is-error="$v.email.$error"
            type="email"
            :placeholder="$t('emailPlaceholder')"
          >
            {{ $t('emailLabel') }}
          </basic-input-profile-text>
        </div>

        <div class="w-33">
          <basic-input-profile-select
            v-model="$v.gender.$model"
            class="wide"
            :options="genders"
            :is-error="$v.gender.$error"
          >
            {{ $t('genderLabel') }}
          </basic-input-profile-select>
        </div>

        <div
          class="w-33 birthdayDatePicker-wrap"
          :class="{ error: $v.birthday.$error }"
        >
          <p class="profileSelect-text birthdayDatePicker-label">
            {{ $t('birthdayLabel') }}
          </p>
          <DatePicker
            v-model="$v.birthday.$model"
            class="birthdayDatePicker"
            type="date"
            :lang="lang"
            format="DD.MM.YYYY"
            :placeholder="defaultDate"
            value-type="DD.MM.YYYY"
            :default-value="new Date()"
            :editable="false"
            :clearable="false"
            :disabled-date="notFuture"
          />
        </div>
      </div>
      <div class="flex w-9 j_i">
        <div class="w-3">
          <basic-input-profile-select
            v-model="currency_code"
            :options="CUR_LIST"
            class="mb-1"
          >
            {{ $t('currencyLabel') }}
          </basic-input-profile-select>
          <basic-input-profile-select
            v-model="language"
            :options="LANG_LIST"
            class="mb-1"
          >
            {{ $t('languageLabel') }}
          </basic-input-profile-select>
        </div>
        <div class="pl-2">
          <p class="profile-checkboxes">
            {{ $t('snoteLabel') }}:
          </p>
          <basic-input-checkbox v-model="receiveAnews" class="mt-1">
            {{ $t('receiveNewsMessage') }}
          </basic-input-checkbox>
          <basic-input-checkbox v-model="receiveAsupport" class="mt-1">
            {{ $t('receiveSupportMessage') }}
          </basic-input-checkbox>
          <basic-input-checkbox v-model="receiveAorders" class="mt-1">
            {{ $t('receiveOrdersMessage') }}
          </basic-input-checkbox>
          <basic-input-checkbox v-model="receiveAall" class="mt-1">
            {{ $t('receiveAllMessage') }}
          </basic-input-checkbox>
        </div>
      </div>
      <div class="relative wide text-center">
        <button v-if="avatarErrorIsOpen" class="form-save eatme-btn-disabled">
          {{ $t('saveButton') }}
        </button>
        <button v-else class="form-save eatme-btn-colorful" @click="submit">
          {{ $t('saveButton') }}
        </button>

        <div
          class="deleteAccount mt-1"
          :style="deleteAccount ? 'color:red !important;' : ''"
          @click="deleteAccount = !deleteAccount"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 9 10"
            :fill="deleteAccount ? 'red' : '#A2A2A2'"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.94778 1.19645H5.38712C5.34846 0.866871 5.19013 0.562955 4.94219 0.342399C4.69425 0.121843 4.37396 0 4.04211 0C3.71027 0 3.38998 0.121843 3.14204 0.342399C2.8941 0.562955 2.73577 0.866871 2.69711 1.19645H1.13645C0.834695 1.19851 0.545971 1.31968 0.333128 1.53359C0.120285 1.74749 0.000554347 2.03682 1.2445e-07 2.33857V2.39745C-0.000106798 2.62676 0.0686862 2.85081 0.197454 3.04055C0.326223 3.23028 0.509026 3.37695 0.722161 3.46154V8.86143C0.72366 9.16367 0.844683 9.45304 1.0588 9.66637C1.27292 9.87969 1.56274 9.99963 1.86499 10H6.22491C6.52789 9.99963 6.81836 9.8791 7.0326 9.66486C7.24684 9.45062 7.36736 9.16015 7.36774 8.85717V3.46012C7.58087 3.37554 7.76368 3.22886 7.89245 3.03913C8.02121 2.84939 8.09 2.62534 8.0899 2.39603V2.33857C8.08933 2.03584 7.96883 1.74566 7.75476 1.53159C7.54069 1.31753 7.25052 1.19702 6.94778 1.19645ZM4.04566 0.539558C4.23407 0.539806 4.41655 0.605429 4.56196 0.725228C4.70738 0.845027 4.80671 1.01158 4.84301 1.19645H3.2483C3.28461 1.01158 3.38394 0.845027 3.52936 0.725228C3.67477 0.605429 3.85725 0.539806 4.04566 0.539558ZM6.82647 8.8593C6.82628 9.0186 6.76292 9.17132 6.65028 9.28396C6.53764 9.3966 6.38492 9.45997 6.22562 9.46015H1.86499C1.70569 9.45997 1.55297 9.3966 1.44033 9.28396C1.32769 9.17132 1.26432 9.0186 1.26414 8.8593V3.54454H6.82576L6.82647 8.8593ZM7.55147 2.39816C7.55128 2.55746 7.48792 2.71018 7.37528 2.82282C7.26264 2.93547 7.10991 2.99883 6.95062 2.99902H1.14283C0.983531 2.99883 0.830811 2.93547 0.71817 2.82282C0.605529 2.71018 0.542163 2.55746 0.541975 2.39816V2.33857C0.542163 2.17928 0.605529 2.02655 0.71817 1.91391C0.830811 1.80127 0.983531 1.73791 1.14283 1.73772H6.94778C7.0269 1.73744 7.10529 1.75277 7.17848 1.78283C7.25166 1.81289 7.3182 1.8571 7.37427 1.91291C7.43035 1.96872 7.47487 2.03505 7.50527 2.10809C7.53568 2.18113 7.55138 2.25946 7.55147 2.33857V2.39745V2.39816Z"
            />
            <path
              d="M2.59228 8.76704C2.66415 8.76704 2.73307 8.73849 2.78389 8.68767C2.83471 8.63685 2.86327 8.56793 2.86327 8.49606V5.44567C2.86327 5.3738 2.83471 5.30488 2.78389 5.25406C2.73307 5.20324 2.66415 5.17468 2.59228 5.17468C2.52041 5.17468 2.45148 5.20324 2.40066 5.25406C2.34984 5.30488 2.32129 5.3738 2.32129 5.44567V8.49606C2.32129 8.56793 2.34984 8.63685 2.40066 8.68767C2.45148 8.73849 2.52041 8.76704 2.59228 8.76704Z"
            />
            <path
              d="M4.0449 8.76704C4.11678 8.76704 4.18571 8.73849 4.23653 8.68767C4.28735 8.63685 4.31589 8.56793 4.31589 8.49606V5.44567C4.31589 5.3738 4.28735 5.30488 4.23653 5.25406C4.18571 5.20324 4.11678 5.17468 4.0449 5.17468C3.97303 5.17468 3.90411 5.20324 3.85329 5.25406C3.80247 5.30488 3.77393 5.3738 3.77393 5.44567V8.49606C3.77393 8.56793 3.80247 8.63685 3.85329 8.68767C3.90411 8.73849 3.97303 8.76704 4.0449 8.76704Z"
            />
            <path
              d="M5.50147 8.76704C5.57334 8.76704 5.64226 8.73849 5.69308 8.68767C5.7439 8.63685 5.77245 8.56793 5.77245 8.49606V5.44567C5.77245 5.3738 5.7439 5.30488 5.69308 5.25406C5.64226 5.20324 5.57334 5.17468 5.50147 5.17468C5.4296 5.17468 5.36068 5.20324 5.30986 5.25406C5.25904 5.30488 5.23047 5.3738 5.23047 5.44567V8.49606C5.23047 8.56793 5.25904 8.63685 5.30986 8.68767C5.36068 8.73849 5.4296 8.76704 5.50147 8.76704Z"
            />
          </svg>
          <div>
            {{ $t('deleteAccount') }}
          </div>
        </div>
      </div>
    </div>

    <div class="mobile wide">
      <p v-if="avatarErrorIsOpen" class="wide text-center red mb-2">
        {{
          avatarErrorIsOpen.length ? avatarErrorIsOpen : $t('popupErrorMessage')
        }}
        <br>
        {{ $t('errorAvatarText') }}
      </p>
      <basic-input-profile-avatar
        ref="avatarInput"
        v-model="avatar"
        :class="{ avatarInputError: avatarErrorIsOpen }"
      />
      <p class="form-phone">
        {{ $t('phone') }}: <span>{{ profile.phone }}</span>
      </p>
      <br>
      <basic-input-profile-text
        v-model.trim="$v.email.$model"
        :is-error="$v.email.$error"
        type="email"
        :placeholder="$t('emailPlaceholder')"
      >
        {{ $t('emailLabel') }}
      </basic-input-profile-text>
      <br>
      <basic-input-profile-text
        v-model="$v.firstName.$model"
        :is-error="$v.firstName.$error"
        :placeholder="$t('firstNamePlaceholder')"
      >
        {{ $t('firstNameLabel') }}
      </basic-input-profile-text>
      <br>
      <basic-input-profile-text
        v-model="$v.lastName.$model"
        :is-error="$v.lastName.$error"
        :placeholder="$t('lastNamePlaceholder')"
      >
        {{ $t('lastNameLabel') }}
      </basic-input-profile-text>
      <br>
      <div class="flex j_b wide">
        <div
          class="w-6 birthdayDatePicker-wrap"
          :class="{ error: $v.birthday.$error }"
        >
          <p class="green text-lg birthdayDatePicker-label">
            {{ $t('birthdayLabel') }}
          </p>
          <DatePicker
            v-model="$v.birthday.$model"
            :default-value="new Date()"
            class="birthdayDatePicker"
            type="date"
            :lang="lang"
            format="DD.MM.YYYY"
            :placeholder="defaultDate"
            value-type="DD.MM.YYYY"
            :editable="false"
            :clearable="false"
            :disabled-date="notFuture"
          />
        </div>
        <div class="w-5 ml-1 genderSection">
          <basic-input-profile-select
            v-model="$v.gender.$model"
            class="wide"
            :options="genders"
            :is-error="$v.gender.$error"
          >
            {{ $t('genderLabel') }}
          </basic-input-profile-select>
        </div>
      </div>
      <br>
      <basic-input-profile-select
        v-model="language"
        :options="LANG_LIST"
        :is-error="$v.language.$error"
      >
        {{ $t('languageLabel') }}
      </basic-input-profile-select>
      <br>
      <basic-input-profile-select
        v-model="currency_code"
        :options="CUR_LIST"
        :is-error="$v.currency_code.$error"
      >
        {{ $t('currencyLabel') }}
      </basic-input-profile-select>
      <br>
      <div>
        <p class="profile-checkboxes green text-lg">
          {{ $t('snoteLabel') }}:
        </p>
        <basic-input-checkbox v-model="receiveAnews" class="moblock">
          {{ $t('receiveNewsMessage') }}
        </basic-input-checkbox>
        <basic-input-checkbox v-model="receiveAsupport" class="mt-1 moblock">
          {{ $t('receiveSupportMessage') }}
        </basic-input-checkbox>
        <basic-input-checkbox v-model="receiveAorders" class="mt-1 moblock">
          {{ $t('receiveOrdersMessage') }}
        </basic-input-checkbox>
        <basic-input-checkbox v-model="receiveAall" class="mt-1 moblock">
          {{ $t('receiveAllMessage') }}
        </basic-input-checkbox>
      </div>

      <div class="relative wide text-center">
        <button v-if="avatarErrorIsOpen" class="form-save eatme-btn-disabled">
          {{ $t('saveButton') }}
        </button>
        <button v-else class="form-save eatme-btn-colorful" @click="submit">
          {{ $t('saveButton') }}
        </button>
      </div>

      <div class="wide">
        <br>
        <br>
        <br>
        <br>
        <div
          class="deleteAccount mt-1"
          :style="deleteAccount ? 'color:red !important;' : ''"
          @click="deleteAccount = !deleteAccount"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 9 10"
            :fill="deleteAccount ? 'red' : '#A2A2A2'"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.94778 1.19645H5.38712C5.34846 0.866871 5.19013 0.562955 4.94219 0.342399C4.69425 0.121843 4.37396 0 4.04211 0C3.71027 0 3.38998 0.121843 3.14204 0.342399C2.8941 0.562955 2.73577 0.866871 2.69711 1.19645H1.13645C0.834695 1.19851 0.545971 1.31968 0.333128 1.53359C0.120285 1.74749 0.000554347 2.03682 1.2445e-07 2.33857V2.39745C-0.000106798 2.62676 0.0686862 2.85081 0.197454 3.04055C0.326223 3.23028 0.509026 3.37695 0.722161 3.46154V8.86143C0.72366 9.16367 0.844683 9.45304 1.0588 9.66637C1.27292 9.87969 1.56274 9.99963 1.86499 10H6.22491C6.52789 9.99963 6.81836 9.8791 7.0326 9.66486C7.24684 9.45062 7.36736 9.16015 7.36774 8.85717V3.46012C7.58087 3.37554 7.76368 3.22886 7.89245 3.03913C8.02121 2.84939 8.09 2.62534 8.0899 2.39603V2.33857C8.08933 2.03584 7.96883 1.74566 7.75476 1.53159C7.54069 1.31753 7.25052 1.19702 6.94778 1.19645ZM4.04566 0.539558C4.23407 0.539806 4.41655 0.605429 4.56196 0.725228C4.70738 0.845027 4.80671 1.01158 4.84301 1.19645H3.2483C3.28461 1.01158 3.38394 0.845027 3.52936 0.725228C3.67477 0.605429 3.85725 0.539806 4.04566 0.539558ZM6.82647 8.8593C6.82628 9.0186 6.76292 9.17132 6.65028 9.28396C6.53764 9.3966 6.38492 9.45997 6.22562 9.46015H1.86499C1.70569 9.45997 1.55297 9.3966 1.44033 9.28396C1.32769 9.17132 1.26432 9.0186 1.26414 8.8593V3.54454H6.82576L6.82647 8.8593ZM7.55147 2.39816C7.55128 2.55746 7.48792 2.71018 7.37528 2.82282C7.26264 2.93547 7.10991 2.99883 6.95062 2.99902H1.14283C0.983531 2.99883 0.830811 2.93547 0.71817 2.82282C0.605529 2.71018 0.542163 2.55746 0.541975 2.39816V2.33857C0.542163 2.17928 0.605529 2.02655 0.71817 1.91391C0.830811 1.80127 0.983531 1.73791 1.14283 1.73772H6.94778C7.0269 1.73744 7.10529 1.75277 7.17848 1.78283C7.25166 1.81289 7.3182 1.8571 7.37427 1.91291C7.43035 1.96872 7.47487 2.03505 7.50527 2.10809C7.53568 2.18113 7.55138 2.25946 7.55147 2.33857V2.39745V2.39816Z"
            />
            <path
              d="M2.59228 8.76704C2.66415 8.76704 2.73307 8.73849 2.78389 8.68767C2.83471 8.63685 2.86327 8.56793 2.86327 8.49606V5.44567C2.86327 5.3738 2.83471 5.30488 2.78389 5.25406C2.73307 5.20324 2.66415 5.17468 2.59228 5.17468C2.52041 5.17468 2.45148 5.20324 2.40066 5.25406C2.34984 5.30488 2.32129 5.3738 2.32129 5.44567V8.49606C2.32129 8.56793 2.34984 8.63685 2.40066 8.68767C2.45148 8.73849 2.52041 8.76704 2.59228 8.76704Z"
            />
            <path
              d="M4.0449 8.76704C4.11678 8.76704 4.18571 8.73849 4.23653 8.68767C4.28735 8.63685 4.31589 8.56793 4.31589 8.49606V5.44567C4.31589 5.3738 4.28735 5.30488 4.23653 5.25406C4.18571 5.20324 4.11678 5.17468 4.0449 5.17468C3.97303 5.17468 3.90411 5.20324 3.85329 5.25406C3.80247 5.30488 3.77393 5.3738 3.77393 5.44567V8.49606C3.77393 8.56793 3.80247 8.63685 3.85329 8.68767C3.90411 8.73849 3.97303 8.76704 4.0449 8.76704Z"
            />
            <path
              d="M5.50147 8.76704C5.57334 8.76704 5.64226 8.73849 5.69308 8.68767C5.7439 8.63685 5.77245 8.56793 5.77245 8.49606V5.44567C5.77245 5.3738 5.7439 5.30488 5.69308 5.25406C5.64226 5.20324 5.57334 5.17468 5.50147 5.17468C5.4296 5.17468 5.36068 5.20324 5.30986 5.25406C5.25904 5.30488 5.23047 5.3738 5.23047 5.44567V8.49606C5.23047 8.56793 5.25904 8.63685 5.30986 8.68767C5.36068 8.73849 5.4296 8.76704 5.50147 8.76704Z"
            />
          </svg>
          <div>
            {{ $t('deleteAccount') }}
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

export default {
  components: { DatePicker },
  props: {
    profile: {
      type: Object
    }
  },
  data () {
    return {
      avatarErrorIsOpen: false,
      lang: {
        formatLocale: {
          firstDayOfWeek: 1
        }
      }
    }
  },
  computed: {
    avatar: {
      get () {
        return this.profile.photo
          ? this.profile.photo
          : '/icons/consumables/userPlus.svg'
      },
      set (imageUrl) {
        this.avatarErrorIsOpen = false
        this.profile.photo = imageUrl
        let blob = null
        const xhr = new XMLHttpRequest()
        xhr.open('GET', imageUrl, true)
        xhr.responseType = 'blob'
        xhr.onload = () => {
          blob = xhr.response
          console.warn('blob.size', blob.size >> 20)
          if (blob.size >> 20 >= 5) {
            this.avatarErrorIsOpen = this.$t('largeImageError')
            window.scrollTo(0, 0)
          }
        }
        xhr.send()
      }
    },
    firstName: {
      get () {
        if (this.profile.name === 'null') {
          return ''
        }
        return this.profile.name || ''
      },
      set (value) {
        this.profile.name = value
      }
    },
    lastName: {
      get () {
        if (this.profile.surname === 'null') {
          return ''
        }
        return this.profile.surname || ''
      },
      set (value) {
        this.profile.surname = value
      }
    },
    email: {
      get () {
        return this.profile.email
      },
      set (value) {
        this.profile.email = value
      }
    },
    gender: {
      get () {
        const g = this.profile.gender
        if (g) {
          return { value: g, name: this.$t(g) }
        } else {
          return null
        }
      },
      set (g) {
        this.profile.gender = g.value
      }
    },
    birthday: {
      get () {
        let date = this.profile.birthday
        console.warn('birthday', date)
        if (date) {
          date = date.split('-')
          date.reverse()
          date = date.join('.')
          return date
        } else {
          return ''
        }
      },
      set (value) {
        let date = value.split('.')
        date.reverse()
        date = date.join('-')
        this.profile.birthday = date
      }
    },

    receiveAnews: {
      get () {
        return this.profile.receive_news || false
      },
      set (value) {
        this.profile.receive_news = value
        this.profile.receive_all = false
      }
    },
    receiveAsupport: {
      get () {
        return this.profile.receive_support || false
      },
      set (value) {
        this.profile.receive_support = value
        this.profile.receive_all = false
      }
    },
    receiveAorders: {
      get () {
        return this.profile.receive_orders || false
      },
      set (value) {
        this.profile.receive_orders = value
        this.profile.receive_all = false
      }
    },
    receiveAall: {
      get () {
        if (
          this.profile.receive_news &&
          this.profile.receive_support &&
          this.profile.receive_orders
        ) {
          this.clearNoteCheckboxes()
          return this.profile.receive_all || true
        } else {
          return this.profile.receive_all || false
        }
      },
      set (value) {
        this.clearNoteCheckboxes()
        this.profile.receive_all = value
      }
    },

    deleteAccount: {
      get () {
        return this.profile.is_deleted || false
      },
      set (value) {
        this.profile.is_deleted = value
      }
    },

    language: {
      get () {
        const langcode = this.profile.language
        const foundItem = this.LANG_LIST.find((item) => {
          if (item.code === langcode) {
            return true
          }
        })

        if (!this.$_.isNil(foundItem)) {
          return foundItem
        }

        return { code: null, name: '' }
      },
      set (item) {
        this.profile.language = item.code
      }
    },
    currency_code: {
      get () {
        const curcode = this.profile.currency_code
        const foundItem = this.CUR_LIST.find((item) => {
          if (item.code === curcode) {
            return true
          }
        })

        if (!this.$_.isNil(foundItem)) {
          return foundItem
        }

        return { code: null, name: '' }
      },
      set (item) {
        this.profile.currency_code = item.code
      }
    },

    genders: {
      get () {
        return [
          {
            value: 'male',
            name: this.$t('male')
          },
          {
            value: 'female',
            name: this.$t('female')
          },
          {
            value: 'unknown',
            name: this.$t('unknown')
          }
        ]
      }
    },
    defaultDate () {
      let datestring = new Date().toLocaleDateString()
      if (~datestring.indexOf('/')) {
        datestring = datestring.split('/')
        datestring.forEach((e, i) => {
          if (e.length < 2) {
            datestring[i] = '0' + e
          }
        })
        datestring = datestring[1] + '.' + datestring[0] + '.' + datestring[2]
      }
      return datestring
    },
    LANG_LIST: {
      get () {
        return this.$store.getters.LANGUAGES
      }
    },
    CUR_LIST: {
      get () {
        return this.$store.getters.CURRENCIES
      }
    }
  },
  async created () {
    const cookiz = this.$cookies
    await this.$store.dispatch('GET_LANGUAGES', cookiz)
    await this.$store.dispatch('GET_CURRENCIES', cookiz)
    this.profile.language =
      this.profile.language ||
      (this.LANG_LIST && this.LANG_LIST[0] && this.LANG_LIST[0].code) ||
      ''
    this.profile.currency_code =
      this.profile.currency_code ||
      (this.CUR_LIST && this.CUR_LIST[0] && this.CUR_LIST[0].code) ||
      ''
    this.profile.gender = this.profile.gender || ''
  },
  validations: {
    firstName: {
      required,
      alpharu: val => /^[\wа-яё ]*$/i.test(val)
    },
    lastName: {
      required,
      alpharu: val => /^[\wа-яё ]*$/i.test(val)
    },
    email: {
      email,
      required
    },
    gender: {
      required
    },
    birthday: {
      required
    },
    language: {
      required
    },
    currency_code: {
      required
    }
  },
  methods: {
    notFuture (date) {
      return date > new Date(new Date().setHours(0, 0, 0, 0))
    },
    clearNoteCheckboxes () {
      this.profile.receive_news = false
      this.profile.receive_support = false
      this.profile.receive_orders = false
      this.profile.receive_all = true
    },

    async submit () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.$store.commit('SET_ERROR_NOTIFY', this.$t('popupErrorMessage'))
        return
      }

      console.warn('submit', this.profile)

      this.profile.photo &&
        this.$store.commit('SET_PERSONAL_DATA', { photo: this.profile.photo })
      this.profile.photoFile &&
        this.$store.commit('SET_PERSONAL_DATA', {
          photoFile: this.profile.photoFile
        })
      this.profile.name &&
        this.$store.commit('SET_PERSONAL_DATA', {
          name: this.profile.name || ''
        })
      this.profile.surname &&
        this.$store.commit('SET_PERSONAL_DATA', {
          surname: this.profile.surname || ''
        })
      this.profile.email &&
        this.$store.commit('SET_PERSONAL_DATA', { email: this.profile.email })

      this.profile.gender &&
        this.$store.commit('SET_PERSONAL_DATA', { gender: this.profile.gender })
      this.profile.birthday &&
        this.$store.commit('SET_PERSONAL_DATA', {
          birthday: this.profile.birthday
        })
      this.profile.language &&
        this.$store.commit('SET_PERSONAL_DATA', {
          language: this.profile.language
        })
      this.profile.currency_code &&
        this.$store.commit('SET_PERSONAL_DATA', {
          currency_code: this.profile.currency_code
        })

      this.profile.receive_news !== null &&
        this.$store.commit('SET_PERSONAL_DATA', {
          receive_news: this.profile.receive_news
        })
      this.profile.receive_support !== null &&
        this.$store.commit('SET_PERSONAL_DATA', {
          receive_support: this.profile.receive_support
        })
      this.profile.receive_orders !== null &&
        this.$store.commit('SET_PERSONAL_DATA', {
          receive_orders: this.profile.receive_orders
        })
      this.profile.receive_all !== null &&
        this.$store.commit('SET_PERSONAL_DATA', {
          receive_all: this.profile.receive_all
        })

      try {
        const res = await this.$store.dispatch(
          'UPDATE_PERSONAL_DATA',
          this.$cookies
        )

        if (res.data && res.data.status === 'success') {
          this.$store.commit(
            'SET_SUCCESS_NOTIFY',
            this.$t('popupSuccessMessage')
          )
          return
        }

        let errm = ''

        if (res.status === 422) {
          errm = '422'
          if (res.data) {
            errm = this.$t('serverError')

            if (res.data.errors) {
              for (const i in res.data.errors) {
                errm = res.data.errors[i]
                break
              }

              errm = errm[0] || errm
            }
          } else {
            errm = this.$t('noDataError')
          }
        }

        console.warn('UPDATE_PERSONAL_DATA error', errm)
        this.$parent.errorPopupIsOpen = errm
      } catch (e) {
        this.$parent.errorPopupIsOpen = this.$t('frontendRequestError')
      }
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/abstract/var';
.avatarInputError {
  border: 1px dashed $c-error !important;
  padding: 8px 10px 5px;
  border-radius: 5px;
}

.genderSection {
  @media screen and (max-width: 991px) {
    min-width: 14.75rem;
  }
}
.genderSection .vs__dropdown-menu {
  left: -2px !important;
}

.moblock {
  box-shadow: 0px 3px 6px #11100029;
  border: 1px solid #e2e2e2;
  border-radius: 7px;
  padding: 5px 10px 5px 5px;
  width: 100%;
  font-size: 14px;
  align-items: initial !important;
}
.birthdayDatePicker .mx-input {
  box-shadow: 0px 3px 6px #11100029;
  border: 1px solid #e2e2e2;
  border-radius: 7px;
  padding: 5px 10px;
  width: 100%;
  height: 40px;
  font-size: 14px;

  @media screen and (min-width: 992px) {
    box-shadow: 0px 6px 7px #d5d5d51a;
    border: 1px solid #e2e2e2;
    border-radius: 4px;
  }
}
.birthdayDatePicker .mx-icon-calendar {
  @media screen and (max-width: 991px) {
    right: 12px;
  }
}
.profile_personal .vs__dropdown-menu > .vs__dropdown-option--highlight {
  &:not(.vs__dropdown-option--selected) {
    background: $hover !important;
    color: $dark !important;
  }
}
.profile_personal .vs__dropdown-menu > .vs__dropdown-option--selected {
  background: #f3bd44 !important;
  color: white;
}
.profile_personal {
  padding-top: 0 !important;
}
</style>
<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';

.deleteAccount {
  text-decoration: underline;
  display: flex;
  align-items: baseline;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  div {
    margin-left: 3px;
  }
  &:hover {
    text-decoration: none;
  }
  @media screen and (max-width: 991px) {
    border-top: 1px solid #888;
    padding: 1rem 1rem;
  }
  @media screen and (min-width: 992px) {
    position: absolute;
    right: 1rem;
    bottom: 0;
  }
}

.profile-checkboxes {
  font-family: $ff-gilroy;
  font-size: 14px;
  margin-bottom: 2rem;
}

.birthdayDatePicker {
  margin-top: 5px;
  @media screen and (max-width: 991px) {
    width: 100% !important;
  }
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media screen and (min-width: 992px) {
    position: absolute;
    padding: 15px 20px;
  }

  & > *:not(:first-of-type) {
    margin-top: 10px;
  }

  &-phone {
    align-self: flex-start;
    display: block;
    margin-top: 5px;
    font-family: $ff-gilroy;
    font-size: 14px;

    @media screen and (min-width: 992px) {
      display: none;
    }

    span {
      margin-left: 5px;
      font-size: 16px;
    }
  }

  &-save {
    margin-top: 40px;
  }
}
</style>
<style lang="scss">
@import '~/assets/styles/abstract/var';

.birthdayDatePicker-wrap.error .birthdayDatePicker-label {
  color: $c-error;
}
.birthdayDatePicker-wrap.error .birthdayDatePicker .mx-input {
  border-color: $c-error;
}

.form .profileText-text {
  font-size: 14px !important;
}
.form .profileSelect-text {
  font-size: 14px !important;
}
</style>

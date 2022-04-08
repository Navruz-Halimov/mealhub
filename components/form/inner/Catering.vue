<i18n>
{
  "en": {
    "youChose" : "You chose a:",
    "place": "available",
    "restaurantLabel": "Restaurant",
    "reviewsLabel": "Reviews",
    "noPlace": "unavailable"
  },
  "ru": {
    "youChose" : "Вы выбрали:",
    "place": "Доступны",
    "noPlace": "нет",
    "restaurantLabel": "Ресторан",
    "reviewsLabel": "Отзывы"
  }
}
</i18n>

<template>
  <div class="catering-info">
    <p class="catering-info__title">
      {{ $t('youChose') }}
    </p>
    <p class="catering-info__name">
      {{ $t('restaurantLabel') }} {{ CURRENT_CATERING.name }}
    </p>
    <p class="catering-info__address">
      {{
        `${CURRENT_CATERING.address.street}, ${CURRENT_CATERING.address.building}, ${CURRENT_CATERING.address.city}`
      }}
    </p>

    <div class="reviews flex j_c a_c wide mt-1">
      <div class="flex a_c">
        <b class="mr-05 roboto">
          {{ CURRENT_CATERING.rating }}
        </b>
        <addition-stars :rate="CURRENT_CATERING.rating" />
        <p class="cateringMenu_rate-review ml-1">
          {{ $t('reviewsLabel') }}:
          <span class="green">{{ CURRENT_CATERING.reviewsCount }}</span>
        </p>
        <p class="desktop more_seats ml-1">
          <span class="more_seats-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15.328"
              height="10"
              viewBox="0 0 15.328 10"
            >
              <defs>
                <style>
                  .a {
                  fill: #5c5c5c;
                  }
                </style>
              </defs>
              <path
                class="a"
                d="M345.279,85.333a.925.925,0,0,0-.911.938v4.062h-2.125a.938.938,0,0,0,0,1.875h1.518v2.5h-.911a.313.313,0,0,0,0,.625h2.428a.313.313,0,0,0,0-.625h-.911v-2.5h.911a.925.925,0,0,0,.911-.937v-5A.925.925,0,0,0,345.279,85.333Z"
                transform="translate(-330.861 -85.333)"
              />
              <path
                class="a"
                d="M3.946,90.333H1.821V86.271a.925.925,0,0,0-.911-.937A.925.925,0,0,0,0,86.271v5a.925.925,0,0,0,.911.937h.911v2.5H.911a.313.313,0,0,0,0,.625H3.339a.313.313,0,0,0,0-.625H2.428v-2.5H3.946a.938.938,0,0,0,0-1.875Z"
                transform="translate(0 -85.333)"
              />
              <path
                class="a"
                d="M112.193,152.02a2.41,2.41,0,0,0,2.5,0,1.558,1.558,0,0,1,.9-.258.318.318,0,0,0,.331-.3v-.911a1.273,1.273,0,0,0-1.322-1.214h-6.612a1.273,1.273,0,0,0-1.323,1.214v.911a.318.318,0,0,0,.331.3,1.55,1.55,0,0,1,.9.258,2.4,2.4,0,0,0,2.494,0,1.69,1.69,0,0,1,.574-.23v4.828h-1.323a.3.3,0,1,0,0,.607h3.306a.3.3,0,1,0,0-.607h-1.322v-4.826A1.708,1.708,0,0,1,112.193,152.02Z"
                transform="translate(-103.631 -147.225)"
              />
            </svg>
          </span>
          {{ CURRENT_CATERING.free_tables > 0 ? $t('place') : $t('noplace') }}
        </p>
      </div>
    </div>
    <div class="mobile flex j_c a_c wide mt-1">
      <p class="more_seats ml-2">
        <span class="more_seats-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15.328"
            height="10"
            viewBox="0 0 15.328 10"
          >
            <defs>
              <style>
                .a {
                fill: #5c5c5c;
                }
              </style>
            </defs>
            <path
              class="a"
              d="M345.279,85.333a.925.925,0,0,0-.911.938v4.062h-2.125a.938.938,0,0,0,0,1.875h1.518v2.5h-.911a.313.313,0,0,0,0,.625h2.428a.313.313,0,0,0,0-.625h-.911v-2.5h.911a.925.925,0,0,0,.911-.937v-5A.925.925,0,0,0,345.279,85.333Z"
              transform="translate(-330.861 -85.333)"
            />
            <path
              class="a"
              d="M3.946,90.333H1.821V86.271a.925.925,0,0,0-.911-.937A.925.925,0,0,0,0,86.271v5a.925.925,0,0,0,.911.937h.911v2.5H.911a.313.313,0,0,0,0,.625H3.339a.313.313,0,0,0,0-.625H2.428v-2.5H3.946a.938.938,0,0,0,0-1.875Z"
              transform="translate(0 -85.333)"
            />
            <path
              class="a"
              d="M112.193,152.02a2.41,2.41,0,0,0,2.5,0,1.558,1.558,0,0,1,.9-.258.318.318,0,0,0,.331-.3v-.911a1.273,1.273,0,0,0-1.322-1.214h-6.612a1.273,1.273,0,0,0-1.323,1.214v.911a.318.318,0,0,0,.331.3,1.55,1.55,0,0,1,.9.258,2.4,2.4,0,0,0,2.494,0,1.69,1.69,0,0,1,.574-.23v4.828h-1.323a.3.3,0,1,0,0,.607h3.306a.3.3,0,1,0,0-.607h-1.322v-4.826A1.708,1.708,0,0,1,112.193,152.02Z"
              transform="translate(-103.631 -147.225)"
            />
          </svg>
        </span>
        {{ CURRENT_CATERING.free_tables > 0 ? $t('place') : $t('noplace') }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';

.catering-info {
  color: $dark;
  font-size: 14px;
  line-height: 17px;

  &__title {
    margin-top: 1rem;
    margin-bottom: 0;
  }

  &__name,
  &__address {
    // margin-top: 3px;
    //font-size: 12px;
    //font-weight: normal;
  }

  .reviews {
    margin-top: 3px;
  }
}
</style>

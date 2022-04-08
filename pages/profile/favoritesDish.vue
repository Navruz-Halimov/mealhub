<i18n>
{
  "en": {
    "title": "Dishes",
    "phone": "Phone number",
    "popupErrorMessage": "Oops,error occured when deleting Your Favorites",
    "popupSuccessDeleteMessage": "Deleted successfuly",
    "popupDeleteMessage": "Are you sure you want to delete?",
    "formEditAddressTitle": "Edit address",
    "favoriteDeleted":"Successfully Deleted!",
    "mobileMenuLabelFavorite": "Catering points",
    "mobileMenuLabelFavoriteMeal": "Dishes",
    "Promo":"Sale",
    "Price":"Price",
    "linkCopied": "Dish link copied",
    "linkCopiedError": "An error occurred while trying to share a dish",
    "deleteOldCart": "Cannot add dishes from different establishments to the basket. Delete dishes from another establishment?"
  },

  "ru": {
    "title": "Избранные блюда",
    "phone": "Номер телефона",
    "popupErrorMessage": "К сожалению, при удалении избранного произошла ошибка",
    "popupSuccessDeleteMessage": "Успешно удалено!",
    "popupDeleteMessage": "Вы уверены, что хотите удалить?",
    "formEditAddressTitle": "Изменение адреса доставки",
    "favoriteDeleted":"Успешно удалено!",
    "mobileMenuLabelFavorite": "Избранные заведения",
    "mobileMenuLabelFavoriteMeal": "Избранные блюда",
    "Promo":"Акция",
    "Price":"Цена",
    "linkCopied": "Ссылка на блюдо скопирована",
    "linkCopiedError": "Ошибка при попытке поделиться блюдом",
    "deleteOldCart": "Нельзя добавить в корзину блюда из разных заведений. Удалить блюда из другого заведения?"
  }
}
</i18n>

<template>
  <main class="main favoritesDish_page">
    <div class="main_body">
      <div class="menucontainernew">
        <MainActions
          :current-action="''"
          class="gbadfgadfgadsg desktop"
          @select-action="selectOrdersMenuAction"
        />
        <nav class="main_menu">
          <div class="main_menu-back">
            <addition-back />
          </div>
          <menu-favorites-view :active-link="activeLink" />
        </nav>
      </div>

      <!-- SECTION FOR MOBILE -->
      <section v-if="isMobile" class="favoritesDish mobile">
        <div class="favoritesDish-back">
          <addition-back :stricted="true" @click-handler="goToBack" />
        </div>
        <header v-if="currentStep === 0" class="favoritesDish_header">
          <h1 class="favoritesDish-title mt-3">
            {{ $t('title') }}
          </h1>
        </header>
        <div class="flex wide j_c">
          <div class="flex mobile_nav">
            <button
              class="eatme-btn-grey roboto half"
              @click="$router.push(localePath('/profile/favorites'))"
            >
              {{ $t('mobileMenuLabelFavorite') }}
            </button>
            <button class="eatme-btn-orange roboto half">
              {{ $t('mobileMenuLabelFavoriteMeal') }}
            </button>
          </div>
        </div>
        <div class="favoritesDish_info-details">
          <span class="ml-2 flex_inline">
            <u>{{ $t('Price') }}</u>
            <menu-eatmefilter
              class="text-sm"
              :field="'price'"
              :flagasc="isSortAsc"
              :flagdesc="isSortDesc"
              :asc="sortAsc"
              :desc="sortDesc"
            />
          </span>
          <span class="ml-2 flex_inline">
            <u>{{ $t('Promo') }}</u>
            <menu-eatmefilter
              class="text-sm promo"
              :field="'price'"
              :flagasc="isSortAsc"
              :flagdesc="isSortDesc"
              :asc="sortAsc"
              :desc="sortDesc"
            />
          </span>
          <BasicInputCateringMenuSearch
            v-model="search"
            class="favoritesDish_info-search"
          />
        </div>
        <div v-if="!favoritesDish.length >= 1" class="favoritesDish__empty">
          Здесь будут блюда, которые Вам нравятся
        </div>
        <article v-else class="favoritesDish__mobile-card-wrapper">
          <div class="favoritesDish__mobile-card-inner">
            <div
              v-for="(favorites, index) of filteredFavoritesDish"
              :key="favorites.dish"
              class="favoritesDish__mobile-card"
            >
              <div class="favoritesDish__mobile-card-header">
                <div class="favoritesDish__mobile-image">
                  <img
                    :src="favorites && favorites.image"
                    :alt="favorites & favorites.name"
                    @click="changeCurrentDish(favorites, index)"
                  >
                  <div class="favoritesDish__mobile-actions">
                    <div class="favoritesDish__mobile-heart">
                      <svg
                        width="12"
                        height="11"
                        viewBox="0 0 12 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M0 3.42388C0 4.95988 0.311008 5.15088 1.52701 6.36588L5.435 10.2179C6.425 10.7719 7.22399 9.53188 7.78299 8.97288C9.16333 7.72103 10.4557 6.37551 11.651 4.94588C11.8833 4.48586 11.9931 3.97376 11.97 3.45895C11.9469 2.94413 11.7915 2.44395 11.5189 2.00663C11.2462 1.56931 10.8656 1.20958 10.4135 0.962134C9.96147 0.714688 9.45329 0.587862 8.93799 0.593879C7.29799 0.593879 6.91298 1.74188 5.95898 2.38088C5.57798 2.12588 3.37298 -0.844119 0.932983 1.38088C0.366111 1.91319 0.0310622 2.64688 0 3.42388Z"
                          fill="#F3BD44"
                        />
                      </svg>
                    </div>
                    <div
                      class="favoritesDish__mobile-share"
                      @click.stop="copyDishLink(favorites)"
                    >
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30Z"
                          fill="white"
                          fill-opacity="0.8"
                        />
                        <path
                          d="M15 29.5C23.0081 29.5 29.5 23.0081 29.5 15C29.5 6.99187 23.0081 0.5 15 0.5C6.99187 0.5 0.5 6.99187 0.5 15C0.5 23.0081 6.99187 29.5 15 29.5Z"
                          stroke="#24A391"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M16.385 11.714L13.685 13.614C13.9033 14.0205 14.018 14.4745 14.019 14.9359V14.96C14.0203 15.1888 13.9914 15.4167 13.933 15.638C13.8813 15.8431 13.8065 16.0417 13.71 16.23L16.461 18.082L16.515 18.026C16.8953 17.6463 17.4041 17.4229 17.941 17.3998C18.4779 17.3767 19.0039 17.5556 19.4154 17.9012C19.8269 18.2469 20.094 18.7341 20.164 19.2669C20.234 19.7997 20.1018 20.3394 19.7936 20.7796C19.4853 21.2198 19.0233 21.5285 18.4987 21.6448C17.974 21.7612 17.4249 21.6768 16.9594 21.4082C16.4939 21.1397 16.1459 20.7065 15.9841 20.1941C15.8223 19.6816 15.8583 19.1271 16.085 18.64L13.334 16.788C13.289 16.84 13.242 16.888 13.193 16.94C12.7988 17.3342 12.2965 17.6026 11.7496 17.7113C11.2028 17.8201 10.636 17.7642 10.121 17.5508C9.60589 17.3375 9.16563 16.9761 8.8559 16.5126C8.54616 16.049 8.38086 15.504 8.38086 14.9465C8.38086 14.389 8.54616 13.8439 8.8559 13.3803C9.16563 12.9168 9.60589 12.5555 10.121 12.3421C10.636 12.1287 11.2028 12.0728 11.7496 12.1816C12.2965 12.2903 12.7988 12.5588 13.193 12.953C13.229 12.989 13.2624 13.026 13.293 13.064L16.038 11.139C15.8407 10.6444 15.834 10.0942 16.0192 9.59488C16.2043 9.09561 16.5681 8.6828 17.0402 8.43641C17.5123 8.19001 18.0589 8.12755 18.5744 8.26114C19.0899 8.39473 19.5374 8.71489 19.8304 9.15955C20.1233 9.60421 20.2409 10.1417 20.1602 10.6681C20.0795 11.1944 19.8064 11.6721 19.3937 12.0086C18.9811 12.3452 18.4581 12.5166 17.9263 12.4897C17.3945 12.4627 16.8916 12.2394 16.515 11.8629C16.469 11.8169 16.425 11.769 16.383 11.719L16.385 11.714ZM19.085 18.499C18.8428 18.257 18.5242 18.1065 18.1834 18.0731C17.8427 18.0397 17.5009 18.1254 17.2163 18.3157C16.9317 18.5061 16.7219 18.7892 16.6226 19.1168C16.5233 19.4445 16.5407 19.7965 16.6718 20.1127C16.8029 20.429 17.0396 20.69 17.3416 20.8514C17.6436 21.0127 17.9922 21.0644 18.328 20.9975C18.6638 20.9307 18.966 20.7495 19.1832 20.4848C19.4003 20.2201 19.519 19.8883 19.519 19.546C19.5193 19.3514 19.4811 19.1588 19.4066 18.9791C19.3321 18.7994 19.2228 18.6362 19.085 18.499ZM19.085 9.29895C18.8438 9.05788 18.5265 8.90791 18.1871 8.87458C17.8477 8.84124 17.5073 8.92661 17.2238 9.11615C16.9403 9.3057 16.7312 9.5877 16.6324 9.91407C16.5335 10.2404 16.5508 10.591 16.6814 10.906C16.812 11.221 17.0478 11.481 17.3486 11.6417C17.6494 11.8024 17.9966 11.8537 18.3311 11.7871C18.6655 11.7204 18.9665 11.5399 19.1828 11.2762C19.399 11.0125 19.5172 10.682 19.517 10.341C19.5172 10.1474 19.4792 9.95568 19.405 9.77686C19.3309 9.59804 19.2221 9.43561 19.085 9.29895ZM13.012 16.099C13.1033 15.951 13.1787 15.7937 13.237 15.6299C13.3115 15.4089 13.3493 15.1772 13.349 14.944C13.349 14.898 13.349 14.8523 13.349 14.8069C13.3063 14.4177 13.175 14.0435 12.965 13.713C12.7011 13.3364 12.3232 13.0547 11.8869 12.9094C11.4507 12.7641 10.9793 12.7629 10.5423 12.9059C10.1054 13.049 9.72594 13.3287 9.46008 13.7039C9.19423 14.079 9.056 14.5297 9.06583 14.9894C9.07566 15.4491 9.23303 15.8934 9.51468 16.2569C9.79633 16.6203 10.1873 16.8836 10.63 17.0078C11.0727 17.1321 11.5436 17.1107 11.9733 16.9468C12.4029 16.783 12.7685 16.4854 13.016 16.098L13.012 16.099Z"
                          fill="#24A391"
                          stroke="#24A391"
                          stroke-width="0.5"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div class="favoritesDish__mobile-func">
                  <div class="favoritesDish__mobile-func-top">
                    <div
                      class="favoritesDish__mobile-title"
                      @click="changeCurrentDish(favorites, index)"
                    >
                      {{ (favorites && favorites.name) || '' }}
                    </div>
                    <delete-icon
                      bg-color="#a2a2a2"
                      icon-width="10"
                      icon-height="10"
                      @click.native="togglePromptPopup(favorites.dish)"
                    />
                  </div>
                  <div class="favoritesDish__mobile-func-bottom">
                    <div class="favoritesDish__mobile-add">
                      <div class="favoritesDish__mobile-counter">
                        <img
                          src="/icons/catering/new/arrow-grey.svg"
                          alt=""
                          class="favoritesDish__mobile-arrow left"
                          @click="
                            CART_ITEMS.find(el => el.dish_id === favorites.dish)
                              ? dishMinus(favorites.dish)
                              : ''
                          "
                        >
                        <div class="favoritesDish__mobile-count">
                          {{ countInCart(favorites.dish) }}
                        </div>
                        <img
                          src="/icons/catering/new/arrow-grey.svg"
                          alt=""
                          class="favoritesDish__mobile-arrow"
                          @click="dishPlus(favorites.dish)"
                        >
                      </div>
                    </div>
                    <button
                      v-show="findItemInCart(favorites.dish)"
                      class="cateringMenuDishes_item-delete dishbtn eatme-btn-orange"
                      @click="
                        togglePromptPopupDish()
                        removeItemId = favorites.dish
                      "
                    >
                      <img
                        class=""
                        src="~/static/icons/catering/icons4_trush-basket-white.svg"
                        alt=""
                      >
                    </button>
                    <button
                      v-show="!findItemInCart(favorites.dish)"
                      class="cateringMenuDishes_item-add dishbtn"
                      @click="addDish(favorites)"
                    >
                      <img
                        class=""
                        src="~/static/icons/catering/new/plus-green.svg"
                        alt=""
                      >
                    </button>
                    <div class="favoritesDish__mobile-price">
                      <span>
                        ₽
                      </span>
                      {{ parseInt(favorites.price) }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="favoritesDish__mobile-card-body">
                <div class="favoritesDish__mobile-meta">
                  <div class="favoritesDish__mobile-meta-heading">
                    {{ favorites && favorites.catering }},
                  </div>
                  <div class="favoritesDish__mobile-meta-text">
                    {{ favorites && favorites.address }}
                  </div>
                </div>
                <home-icon
                  class="favorites__card-home"
                  icon-width="10"
                  icon-height="10"
                  bg-color="#a2a2a2"
                  :link="`/catering/${favorites.catering_id}`"
                />
              </div>
            </div>
          </div>
          <!-- /.favoritesDish__mobile-card-inner -->
        </article>
      </section>
      <!-- SECTION FOR DESKTOP -->
      <section class="favoritesDish desktop">
        <header class="favoritesDish_header">
          <h1 class="favoritesDish-title">
            {{ $t('title') }}
          </h1>
          <div class="favoritesDish_info">
            <div class="favoritesDish_info-inner">
              <p class="favoritesDish-id">
                ID: {{ PERSONAL_DATA.id }}
              </p>
              <p
                v-if="~PERSONAL_DATA.phone.indexOf('+7')"
                class="favoritesDish-phone ml-1"
              >
                {{ $t('phone') }}:
                <span>{{ PERSONAL_DATA.phone.slice(0, 2) }}</span>
                {{ parsePhone(PERSONAL_DATA.phone, 2) }}
              </p>
              <p v-else class="favoritesDish-phone ml-1">
                {{ $t('phone') }}:
                <span>{{ PERSONAL_DATA.phone.slice(0, 3) }}</span>
                {{ parsePhone(PERSONAL_DATA.phone) }}
              </p>
            </div>
            <div class="favoritesDish_info-details">
              <span class="ml-2 flex_inline">
                <u>{{ $t('Price') }}</u>
                <menu-eatmefilter
                  class="text-sm"
                  :field="'price'"
                  :flagasc="isSortAsc"
                  :flagdesc="isSortDesc"
                  :asc="sortAsc"
                  :desc="sortDesc"
                />
              </span>
              <span class="ml-2 flex_inline">
                <u>{{ $t('Promo') }}</u>
                <menu-eatmefilter
                  class="text-sm promo"
                  :field="'price'"
                  :flagasc="isSortAsc"
                  :flagdesc="isSortDesc"
                  :asc="sortAsc"
                  :desc="sortDesc"
                />
              </span>
              <BasicInputCateringMenuSearch
                v-model="search"
                class="favoritesDish_info-search"
              />
            </div>
          </div>
        </header>
        <div v-if="!favoritesDish.length >= 1" class="favoritesDish__empty">
          Здесь будут блюда, которые Вам нравятся
        </div>
        <article v-else class="favoritesDish__card-wrapper">
          <div class="favoritesDish__card-inner">
            <div
              v-for="(favorites, index) of filteredFavoritesDish"
              :key="favorites.dish"
              class="favoritesDish__card"
            >
              <div class="favoritesDish__card-item">
                <div class="favoritesDish__card-header">
                  <img
                    :src="favorites && favorites.image"
                    :alt="favorites && favorites.name"
                    @click="changeCurrentDish(favorites, index)"
                  >
                  <div class="favoritesDish__card-actions-outer">
                    <div class="favoritesDish__card-actions">
                      <div
                        class="favoritesDish__card-action share"
                        @click.stop="copyDishLink(favorites)"
                      >
                        <svg
                          width="13"
                          height="15"
                          viewBox="0 0 13 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M8.38501 4.71396L5.68503 6.61396C5.90333 7.02047 6.01803 7.47453 6.01901 7.93595V7.95996C6.0203 8.18876 5.99139 8.41674 5.93301 8.63797C5.88128 8.8431 5.80648 9.04168 5.71002 9.22995L8.46103 11.082L8.51501 11.026C8.89532 10.6463 9.40409 10.4229 9.94098 10.3998C10.4779 10.3767 11.0039 10.5556 11.4154 10.9012C11.8269 11.2469 12.094 11.7341 12.164 12.2669C12.234 12.7997 12.1018 13.3394 11.7936 13.7796C11.4853 14.2198 11.0233 14.5285 10.4987 14.6448C9.97402 14.7612 9.42485 14.6768 8.95938 14.4082C8.49391 14.1397 8.14595 13.7065 7.9841 13.1941C7.82225 12.6816 7.85825 12.1271 8.08502 11.64L5.33401 9.78797C5.28901 9.83997 5.24202 9.88798 5.19302 9.93998C4.79876 10.3342 4.29645 10.6026 3.74963 10.7113C3.20281 10.8201 2.63605 10.7642 2.12097 10.5508C1.60589 10.3375 1.16563 9.97615 0.855896 9.51258C0.546161 9.04901 0.380859 8.504 0.380859 7.94648C0.380859 7.38895 0.546161 6.84392 0.855896 6.38034C1.16563 5.91677 1.60589 5.55548 2.12097 5.34211C2.63605 5.12873 3.20281 5.07285 3.74963 5.18158C4.29645 5.29032 4.79876 5.55878 5.19302 5.95298C5.22902 5.98898 5.26236 6.02597 5.29303 6.06397L8.03802 4.13895C7.84074 3.64435 7.83402 3.09416 8.01917 2.59488C8.20431 2.09561 8.56813 1.6828 9.04019 1.43641C9.51225 1.19001 10.0589 1.12755 10.5744 1.26114C11.0899 1.39473 11.5374 1.71489 11.8304 2.15955C12.1233 2.60421 12.2409 3.14175 12.1602 3.66809C12.0795 4.19444 11.8064 4.67213 11.3937 5.00864C10.9811 5.34515 10.4581 5.51657 9.92633 5.48966C9.39452 5.46274 8.89162 5.23941 8.51501 4.86295C8.46902 4.81695 8.42503 4.76897 8.38303 4.71897L8.38501 4.71396ZM11.085 11.499C10.8428 11.257 10.5242 11.1065 10.1834 11.0731C9.8427 11.0397 9.50091 11.1254 9.21631 11.3157C8.93171 11.5061 8.7219 11.7892 8.62262 12.1168C8.52334 12.4445 8.54071 12.7965 8.67181 13.1127C8.80292 13.429 9.03963 13.69 9.34161 13.8514C9.64359 14.0127 9.99218 14.0644 10.328 13.9975C10.6638 13.9307 10.966 13.7495 11.1832 13.4848C11.4003 13.2201 11.519 12.8883 11.519 12.546C11.5193 12.3514 11.4811 12.1588 11.4066 11.9791C11.3321 11.7994 11.2228 11.6362 11.085 11.499ZM11.085 2.29895C10.8438 2.05788 10.5265 1.90791 10.1871 1.87458C9.84771 1.84124 9.50725 1.92661 9.22375 2.11615C8.94026 2.3057 8.73125 2.5877 8.63235 2.91407C8.53346 3.24044 8.55079 3.59099 8.6814 3.90601C8.812 4.22103 9.04779 4.48104 9.3486 4.6417C9.64941 4.80235 9.99664 4.85373 10.3311 4.78708C10.6655 4.72044 10.9665 4.53988 11.1828 4.27619C11.399 4.01249 11.5172 3.682 11.517 3.34098C11.5172 3.14739 11.4792 2.95568 11.405 2.77686C11.3309 2.59804 11.2221 2.43561 11.085 2.29895ZM5.01202 9.09897C5.10325 8.95095 5.17867 8.79373 5.23703 8.62995C5.31148 8.40891 5.34931 8.17721 5.34903 7.94397C5.34903 7.89797 5.34903 7.85228 5.34903 7.80695C5.30635 7.41772 5.17498 7.04347 4.96503 6.71296C4.70112 6.33644 4.32316 6.05474 3.88693 5.90943C3.4507 5.76412 2.97931 5.7629 2.54233 5.90595C2.10535 6.049 1.72594 6.32875 1.46008 6.70389C1.19423 7.07904 1.056 7.52969 1.06583 7.98938C1.07566 8.44907 1.23303 8.89343 1.51468 9.25687C1.79633 9.62031 2.18734 9.88358 2.63004 10.0078C3.07273 10.1321 3.54365 10.1107 3.97327 9.94684C4.40289 9.78302 4.76845 9.48542 5.01602 9.09797L5.01202 9.09897Z"
                            fill="#24A391"
                            stroke="#24A391"
                            stroke-width="0.5"
                          />
                        </svg>
                      </div>
                      <delete-icon
                        :has-position="true"
                        bg-color="#a2a2a2"
                        icon-width="10"
                        icon-height="10"
                        @click.native="togglePromptPopup(favorites.dish)"
                      />
                    </div>
                  </div>
                </div>
                <!-- end of header -->
                <div class="favoritesDish__card-body">
                  <div
                    class="favoritesDish__card-title"
                    @click="changeCurrentDish(favorites, index)"
                  >
                    {{ (favorites && favorites.name) || '' }}
                  </div>
                  <div class="favoritesDish__card-func">
                    <div class="favoritesDish__card-counter">
                      <img
                        src="/icons/catering/new/arrow-grey.svg"
                        alt=""
                        class="favoritesDish__card-arrow left"
                        @click="
                          CART_ITEMS.find(el => el.dish_id === favorites.dish)
                            ? dishMinus(favorites.dish)
                            : ''
                        "
                      >
                      <div class="favoritesDish__card-count">
                        {{ countInCart(favorites.dish) }}
                      </div>
                      <img
                        src="/icons/catering/new/arrow-grey.svg"
                        alt=""
                        class="favoritesDish__card-arrow right"
                        @click="dishPlus(favorites.dish)"
                      >
                    </div>
                    <button
                      v-show="findItemInCart(favorites.dish)"
                      class="cateringMenuDishes_item-delete dishbtn eatme-btn-orange"
                      @click="
                        togglePromptPopupDish()
                        removeItemId = favorites.dish
                      "
                    >
                      <img
                        class=""
                        src="~/static/icons/catering/icons4_trush-basket-white.svg"
                        alt=""
                      >
                    </button>
                    <button
                      v-show="!findItemInCart(favorites.dish)"
                      class="cateringMenuDishes_item-add dishbtn"
                      @click="addDish(favorites)"
                    >
                      <img
                        class=""
                        src="~/static/icons/catering/new/plus-green.svg"
                        alt=""
                      >
                    </button>
                    <div class="favoritesDish__card-price">
                      <span>
                        ₽
                      </span>
                      {{ parseInt(favorites.price) }}
                    </div>
                  </div>
                  <div class="favoritesDish__card-meta">
                    <div class="favoritesDish__card-meta-inner">
                      <div class="favoritesDish__card-meta-heading">
                        {{ favorites && favorites.catering }}
                      </div>
                      <div class="favoritesDish__card-meta-text">
                        {{ favorites && favorites.address }}
                      </div>
                    </div>
                    <home-icon
                      class="favorites__card-home"
                      icon-width="10"
                      icon-height="10"
                      bg-color="#a2a2a2"
                      :link="`/catering/${favorites.catering_id}`"
                    />
                  </div>
                </div>
              </div>
              <!-- /.favoritesDish__card -->
            </div>
          </div>
        </article>
      </section>

      <div class="main_news">
        <MainNews />
      </div>
    </div>

    <form-dish-popups
      v-if="currentDish"
      :current-dish.sync="currentDish"
      :prev-dish="prevDish"
      :next-dish="nextDish"
      :clear-card="clearCardStatus"
      :favorites-dish="dish"
      @prev-click="redirectToPrev"
      @next-click="redirectToNext"
      @dish-deleted="deleteDish"
      @update-dish="updateCurrentDish"
    />
    <!-- PROMPT POPUP -->
    <div v-if="successPromptIsOpen" class="addresses_popup">
      <popup-delete
        @close-popup="togglePromptPopup"
        @delete="deleteFavoritesDish"
      >
        {{ $t('popupDeleteMessage') }}
      </popup-delete>
    </div>
    <!-- Delete and add if different restaurant -->
    <div v-if="isPopupDeleteOldCartDish" class="popup">
      <popup-delete
        @close-popup="isPopupDeleteOldCartDish = false"
        @delete="
          $store.dispatch('ADD_ITEM_IN_BASKET', {
            cookiz: $cookies,
            dishID: currentDishID || currentDish.id,
            quantity: 1,
            clearOldCart: true
          })
          isPopupDeleteOldCartDish = false
        "
      >
        {{ $t('deleteOldCart') }}
      </popup-delete>
    </div>
    <!-- delete current from basket -->
    <div v-if="successPromptDishIsOpen" class="popup">
      <popup-delete
        @close-popup="togglePromptPopupDish"
        @delete="
          $store
            .dispatch('DELETE_ITEM_IN_BASKET', {
              cookiz: $cookies,
              dishID: removeItemId
            })
            .then(() => {
              $store.commit('SET_SUCCESS_NOTIFY', $t('favoriteDeleted'))
            })
        "
      >
        {{ $t('popupDeleteMessage') }}
      </popup-delete>
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  layout: 'primary',
  middleware: 'auth-home',
  data () {
    return {
      isSortAsc: '',
      isSortDesc: '',
      search: '',
      currentStep: 0,
      successPromptIsOpen: false,
      successPromptDishIsOpen: false,
      favoritesDish: [],
      dishID: null,
      removeItemId: null,
      isPopupDeleteOldCartDish: false,
      currentDishID: '',
      currentDish: '',
      prevDish: null,
      nextDish: null,
      currentCategoryId: null,
      currentCategory: null,
      previewOpenData: false,
      dish: {},
      clearCardStatus: false
    }
  },

  beforeRouteLeave (to, from, next) {
    this.$store.commit('CLEAR_NOTIFICATIONS')
    this.$store.dispatch('CLOSE_GLOBAL_POPUPS')

    next()
  },

  computed: {
    ...mapGetters([
      'PERSONAL_DATA',
      'IS_AUTHORIZATION',
      'CART_ITEMS',
      'CURRENT_CATERING_MENU_DISHES'
    ]),
    activeLink () {
      return 'favoritesDish'
    },
    filteredFavoritesDish () {
      return this.favoritesDish.filter((favorite) => {
        return favorite.name.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },

  beforeCreate () {
    this.$nextTick(() => this.$nuxt.$loading.start())
  },
  async created () {
    await this.$store.dispatch('GET_PERSONAL_DATA', this.$cookies)
    this.getFavoritesDish()
  },
  async mounted () {
    await this.tryFinishLoading()
  },
  methods: {
    async redirectToNext () {
      if (this.nextDish === null) {
        return
      }

      const index = this.favoritesDish.findIndex(
        item => +item.dish === +this.nextDish
      )
      await this.changeCurrentDish(this.favoritesDish[index], index)
    },
    async redirectToPrev () {
      if (this.prevDish === null) {
        return
      }

      const index = this.favoritesDish.findIndex(
        item => +item.dish === +this.prevDish
      )
      await this.changeCurrentDish(this.favoritesDish[index], index)
    },
    deleteDish () {
      this.$nextTick(async () => {
        await this.clearCurrentDish()
      })
      this.getFavoritesDish()
    },
    async changeCurrentDish (dish, index) {
      if (!dish) {
        this.clearCurrentDish()
        return
      }
      this.dish = dish
      const cookiz = this.$cookies
      const cateringId = dish.catering_id
      const categoryId = dish.category
      const dishId = dish.dish
      const { data } = await this.$store.dispatch('GET_CURRENT_DISH', {
        cookiz,
        cateringId,
        categoryId,
        dishId
      })
      console.warn('&&& changeCurrentDish', data.item, cateringId, categoryId)
      this.currentDish = data.item
      this.currentDish.category_id = categoryId
      this.currentDish.catering_id = cateringId

      this.prevDish = index > 0 ? this.favoritesDish[index - 1].dish : null
      this.nextDish =
        index < this.favoritesDish.length - 1
          ? this.favoritesDish[index + 1].dish
          : null
    },
    updateCurrentDish () {
      const index = this.favoritesDish.findIndex(
        item => this.currentDish.id === item.dish
      )
      if (
        index !== -1 &&
        this.currentDish.catering_id === this.CART_ITEMS[0].catering_id
      ) {
        this.changeCurrentDish(this.favoritesDish[index], index)
      } else {
        this.clearCardStatus = true
      }
    },
    previewImg (value) {
      this.previewOpenData = value || null
    },
    clearCurrentDish () {
      this.currentDish = null
      this.prevDish = null
      this.nextDish = null
    },
    closeDishPopup () {
      this.clearCurrentDish()
    },
    sortAsc () {
      this.isSortAsc = this.isSortAsc ? '' : 'price'
      this.isSortDesc = ''
      this.filteredFavoritesDish.sort((a, b) => a.price - b.price)
    },
    sortDesc () {
      this.isSortAsc = ''
      this.isSortDesc = this.isSortDesc ? '' : 'price'
      this.filteredFavoritesDish.sort((a, b) => b.price - a.price)
    },
    addDish (dish) {
      this.currentDishID = dish.dish
      if (this.IS_AUTHORIZATION) {
        this.$store
          .dispatch('ADD_ITEM_IN_BASKET', {
            cookiz: this.$cookies,
            dishID: dish.dish,
            clearOldCart: !!this.CART_ITEMS.find(
              el => el.catering_id === dish.catering_id
            ),
            quantity: 1
          })
          .then((data) => {
            if (data) {
              if (data.status === 'error') {
                this.isPopupDeleteOldCartDish = dish.dish
              }
            }
            if (typeof data === 'string') {
              this.isPopupDeleteOldCartDish = dish.dish
            }
          })
      } else {
        this.loginUserTypes()
      }
    },
    findItemInCart (itemId) {
      const foundItem = this.CART_ITEMS.find((item) => {
        if (item.dish_id === itemId) {
          return true
        }
      })

      if (!this.$_.isNil(foundItem)) {
        return true
      } else {
        return false
      }
    },
    countInCart (dishID) {
      const q = this.CART_ITEMS.find(item => item.dish_id === dishID)
      return (q && q.quantity) || 0
    },
    dishMinus (dishID) {
      this.currentDishID = dishID
      if (this.IS_AUTHORIZATION) {
        const cookiz = this.$cookies
        this.$store.dispatch('MINUS_DISH_COUNT', { cookiz, dishID })
      } else {
        this.loginUserTypes()
      }
    },
    dishPlus (dishID) {
      this.currentDishID = dishID
      if (this.IS_AUTHORIZATION) {
        const cookiz = this.$cookies
        this.$store
          .dispatch('PLUS_DISH_COUNT', { cookiz, dishID })
          .then((data) => {
            if (data) {
              if (data.status === 'error') {
                // Если есть блюда из других ресторанов
                this.isPopupDeleteOldCartDish = true
              }
            }
            if (typeof data === 'string') {
              this.isPopupDeleteOldCartDish = true
            }
          })
      } else {
        this.loginUserTypes()
      }
    },
    copyDishLink (dish) {
      const cateringId = dish.catering_id
      const categoryId = dish.category

      const path =
        window.location.origin +
        this.localePath({
          path: `/catering/${cateringId}/menu/${categoryId}/${dish.dish}`
        })

      navigator.clipboard
        .writeText(path)
        .then(() => {
          this.$store.commit('SET_SUCCESS_NOTIFY', this.$t('linkCopied'))
        })
        .catch((err) => {
          console.error('copyDishLink', err)
          this.$store.commit('SET_ERROR_NOTIFY', this.$t('linkCopiedError'))
        })
    },
    async getFavoritesDish () {
      await this.$store
        .dispatch('fetchFavoritesDish', this.$cookies)
        .then((res) => {
          if (res && res.data) {
            this.favoritesDish = res.data.data
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    deleteFavoritesDish () {
      this.$store
        .dispatch('deleteFavoritesDish', {
          id: this.dishID,
          cookie: this.$cookies
        })
        .then((res) => {
          if (res && res.data && res.data.status === 'success') {
            this.getFavoritesDish()
            this.$store.commit('SET_SUCCESS_NOTIFY', this.$t('favoriteDeleted'))
          } else {
            this.$store.commit('SET_ERROR_NOTIFY', this.$t('popupErrorMessage'))
          }
        })
        .catch((err) => {
          console.log(err)
          this.$store.commit('SET_ERROR_NOTIFY', this.$t('popupErrorMessage'))
        })
    },
    redirectHome (cateringId) {
      return this.$router.push(`/catering/${cateringId}`)
    },
    togglePromptPopup (id) {
      this.dishID = id
      this.successPromptIsOpen = !this.successPromptIsOpen
    },
    togglePromptPopupDish () {
      this.successPromptDishIsOpen = !this.successPromptDishIsOpen
    },
    tryFinishLoading () {
      if (this.PERSONAL_DATA) {
        setTimeout(() => this.$nuxt.$loading.finish(), 1000)
      }
    },

    goToBack () {
      console.warn(this.currentStep)
      if (this.currentStep > 0) {
        this.selectStep(--this.currentStep)
      } else {
        this.$router.back()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';
@import '~/assets/styles/classes/class';
@import '~/assets/styles/abstract/mixins';
.main_menu {
  display: flex !important;
  flex-direction: column !important;
  height: 100% !important;
  flex: 1 0 17vw !important;
}

.menucontainernew {
  grid-area: menu !important;
  display: flex !important;
  flex-direction: column !important;
}

.gbadfgadfgadsg {
  height: 5rem !important;
  margin-bottom: 5px !important;
  width: 98% !important;
}

@media screen and (max-width: 991px) {
  .main_menu {
    display: none !important;
  }

  .main_body {
    min-height: 100vh;
    min-height: calc(var(--vh) * 100);
    height: auto;
  }
}

.main_menu-back {
  position: relative;
  top: 0;
  left: 10px;

  @media screen and (max-width: 991px) {
    position: absolute;
    top: 10px;
    font-size: 14px !important;
  }
}

.popupMap_body {
  position: relative;
}
.map_incdec {
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  font-size: 2rem;
  z-index: 90;
  display: flex;
  flex-direction: column;
  border: 1px solid $c-line;
}
.map_incdec-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 75px;
  width: 75px;
  padding: 1.5rem;
  font-size: 3rem;
  background: $light;
  &:first-child {
    border-bottom: 1px solid $c-line;
  }
}

.favoritesDish {
  position: relative;
  grid-area: body;
  grid-template-rows: auto 1fr;
  grid-row-gap: 20px;
  justify-items: center;
  background-color: $c-light;
  height: 100%;
  width: 100%;
  padding: 10px 20px;

  @media screen and (min-width: 992px) {
    border-radius: $br-block-desktop;
    padding: 20px 15px 20px 20px;
    border-radius: 4px;
  }

  &.mobile {
    display: grid;
    min-height: 100vh;
    min-height: calc(var(--vh) * 100);

    @media screen and (min-width: 992px) {
      display: none;
    }
  }
  &.desktop {
    display: none;

    @media screen and (min-width: 992px) {
      display: grid;
    }
    .favoritesDish {
      &__card-wrapper {
        width: 100%;
        margin-left: auto;
        margin-right: auto;
        overflow-y: auto;
      }
      &__card-inner {
        display: flex;
        align-items: stretch;
        flex-wrap: wrap;
      }
      &__card {
        padding-left: 5px;
        padding-right: 5px;
        overflow: hidden;
        margin-bottom: 10px;
        &-item {
          transition: all 0.3s ease;
          overflow: hidden;
          border-radius: 5px;
          border: 1px solid $c-line;
          height: 100%;
          &:hover {
            border: 1px solid $orange;
            box-shadow: rgba(149, 157, 165, 0.2) 0 0 15px;
          }
        }
        @media (min-width: 986px) {
          flex: 0 0 auto;
          width: 50%;
        }
        @media (min-width: 1200px) {
          flex: 0 0 auto;
          width: 33.33%;
        }
        @media (min-width: 1400px) {
          flex: 0 0 auto;
          max-width: 25%;
        }
        @media (min-width: 1920px) {
          flex: 0 0 auto;
          max-width: 16.66667%;
        }
        &-header {
          position: relative;
          max-height: 110px;
          height: 100%;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            cursor: pointer;
          }
        }
        &-actions-outer {
          display: flex;
          justify-content: space-between;
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }
        &-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          margin: 10px 10px 0 10px;
        }
        &-action {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 29px;
          height: 29px;
          background: rgba(255, 255, 255, 0.8);
          cursor: pointer;
          border-radius: 50%;
          border: 1px solid $bgc-green;
          transition: all 0.3s ease;
          &:hover {
            background-color: $light;
          }
        }
        &-body {
          padding-top: 10px;
        }
        &-title {
          font-family: $ff-gilroy;
          font-size: 14px;
          font-weight: 300;
          color: $dark;
          word-wrap: break-word;
          min-height: 3em;
          line-height: 20px;
          font-size: 14px;
          line-height: 17px;
          padding: 0 10px;
          @include textWrapper(3);
        }
        &-counter {
          display: flex;
          align-items: center;
        }
        &-count {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background-image: url('/icons/catering/new/dinner-grey.svg');
          background-repeat: no-repeat;
          background-size: cover;
          font-family: $ff-roboto;
          font-weight: 700;
          font-size: 12px;
          color: $dark;
        }
        &-arrow {
          margin-top: 5px;
          margin-left: 3px;
          flex: 0 0 15px;
          width: 15px;
          height: 20px;
          object-fit: contain;
          cursor: pointer;
          &.left {
            margin-left: 0;
            margin-right: 3px;
            transform: rotate(180deg);
          }
        }
        &-func {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid $c-line;
          padding-bottom: 5px;
          padding-left: 10px;
          padding-right: 10px;
        }
        &-add {
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          padding: 0;
          background-color: $light;
          cursor: pointer;
          img {
            height: 31px;
            flex: 0 0 31px;
            width: 31px;
          }
        }
        &-price {
          white-space: nowrap;
          margin-left: 1rem;
          font-family: $ff-roboto;
          font-weight: 700;
          font-size: 14px;
          color: #21bc96;
          span {
            font-family: $ff-gilroy-reg;
            font-weight: 700;
          }
        }
        &-meta {
          padding: 10px 11px 10px 10px;
          font-size: 12px;
          font-family: $ff-gilroy-reg;
          color: $dark;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          &-heading {
            font-weight: 700;
          }
          &-text {
            font-weight: 300;
          }
        }
      }
    }
  }

  &_header {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-bottom: 10px;
  }

  &-title {
    width: 75%;
    font-family: $ff-roboto;
    font-size: 22px;
    font-weight: bold;
    color: $c-green;
    text-align: center;
    margin-bottom: 10px;
    @media screen and (min-width: 992px) {
      color: $c-primary;
      width: auto;
    }
  }

  &_info {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    &-inner {
      display: flex;
      font-family: $ff-gilroy;
      font-size: 14px;
      // color: $c-green;
    }
    &-details {
      display: flex;
      align-items: center;
      .promo {
        margin-right: 20px;
      }
    }
    &-search {
      max-width: 200px;
      width: 100%;
    }
    @media screen and (min-width: 1090px) {
      &-search {
        max-width: 259px !important;
      }
    }
    @media screen and (min-width: 992px) {
      font-size: 14px;
      color: $c-primary;
    }
  }

  &-phone {
    display: none;
    margin-left: 10px;

    @media screen and (min-width: 992px) {
      display: inline-block;
    }
  }

  &-icon {
    margin-top: 10px;
    width: 60px;
    height: 60px;
    svg {
      fill: $c-green;
    }
    @media screen and (min-width: 992px) {
      display: none;
    }

    svg {
      width: 100%;
      height: 100%;
      fill: $c-green;
    }
  }

  &-id {
    display: none;

    @media screen and (min-width: 992px) {
      display: block;
    }
  }
  // card wrapper
  &__empty {
    font-family: $ff-gilroy;
    font-size: 14px;
    line-height: 17px;
    color: #c4c4c4;
    font-weight: 400;
  }
}

.favoritesDish.mobile {
  min-height: auto;
  .favoritesDish {
    &_info-details {
      width: 100%;
      justify-content: flex-end;
      @media (max-width: 968px) {
        max-width: 800px !important;
      }
      @media (max-width: 768px) {
        max-width: 700px !important;
      }
      @media (max-width: 576px) {
        max-width: 350px !important;
      }
    }
    &_header {
      margin: 0;
    }
    &-back {
      position: absolute;
      top: 10px;
      left: 10px;

      @media screen and (min-width: 992px) {
        display: none;
      }

      & /deep/ {
        .link-back {
          font-size: 14px;

          &-icon {
            flex: 0 0 15px;
            width: 15px;
            height: 10px;
          }
        }
      }
    }
    &__mobile-card {
      background: $light;
      border: 1px solid $c-line;
      border-radius: 6px;
      overflow: hidden;
      margin-bottom: 15px;
      @media (max-width: 968px) {
        max-width: 800px !important;
      }
      @media (max-width: 768px) {
        max-width: 700px !important;
      }
      @media (max-width: 576px) {
        max-width: 350px !important;
      }
    }
    &__mobile-card-header {
      display: flex;
      position: relative;
      width: 100%;
    }
    &__mobile-image {
      img {
        width: 100px;
        height: 100px;
        object-fit: cover;
        border-radius: 5px 0px 0px 5px;
        cursor: pointer;
      }
    }
    &__mobile-actions {
      display: flex;
      align-items: center;
      position: absolute;
      top: 0;
      margin-top: 8px;
      margin-left: 8px;
    }
    &__mobile-heart {
      background: rgba(255, 255, 255, 0.8);
      border: 1px solid $orange;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
    &__mobile-share {
      background: rgba(255, 255, 255, 0.8);
      border: 1px solid $bgc-green;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 6px;
      cursor: pointer;
    }
    &__mobile-func-top {
      display: flex;
      justify-content: space-between;
    }
    &__mobile-func-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &__mobile-func {
      padding-top: 10px;
      padding-left: 10px;
      padding-right: 10px;
      display: flex;
      flex-direction: column;
      width: 100%;
      justify-content: space-between;
    }
    &__mobile-title {
      font-family: $ff-gilroy;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 17px;
      color: $dark;
      margin-right: 10px;
    }
    &__mobile-delete {
      flex-shrink: 0;
      background: rgba(255, 255, 255, 0.8);
      border: 1px solid $c-icon-grey;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      transition: all 0.3s ease;
      display: inline-block;
      text-align: center;
      cursor: pointer;
      svg {
        width: 10px;
        height: 10px;
        fill: $c-icon-grey;
        vertical-align: middle;
        fill: $c-icon-grey;
        transition: all 0.3s ease;
      }
      &:hover {
        background-color: $light;
        border: 1px solid $c-icon-hover;
        svg {
          fill: $c-icon-hover;
        }
        background-color: $light;
        box-shadow: rgba(149, 157, 165, 0.5) 0px 0px 15px;
      }
    }
    &__mobile-counter {
      display: flex;
      align-items: center;
    }
    &__mobile-count {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background-image: url('/icons/catering/new/dinner-grey.svg');
      background-repeat: no-repeat;
      background-size: cover;
      font-family: $ff-roboto;
      font-weight: 700;
      font-size: 12px;
      color: $dark;
    }
    &__mobile-arrow {
      margin-top: 5px;
      margin-left: 3px;
      flex: 0 0 15px;
      width: 15px;
      height: 20px;
      object-fit: contain;
      cursor: pointer;
      &.left {
        margin-left: 0;
        margin-right: 3px;
        transform: rotate(180deg);
      }
    }
    &__mobile-price {
      white-space: nowrap;
      margin-left: 1rem;
      font-family: $ff-roboto;
      font-weight: 700;
      font-size: 14px;
      color: $bgc-green;
      span {
        font-family: $ff-gilroy-reg;
        font-weight: 700;
      }
    }
    &__mobile-card-body {
      border-top: 1px solid $c-line;
      padding-top: 10px;
      padding-bottom: 10px;
      margin-left: 10px;
      margin-right: 10px;
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &__mobile-meta {
      font-size: 12px;
      font-family: $ff-gilroy-reg;
      color: $dark;
      &-heading {
        display: inline-block;
        font-weight: 700;
      }
      &-text {
        display: inline-block;
        font-weight: 300;
      }
    }
    &__mobile-home {
      height: 20px;
      width: 20px;
      background: rgba(255, 255, 255, 0.8);
      border: 1px solid $c-icon-grey;
      border-radius: 50%;
      text-align: center;
      display: inline-block;
      cursor: pointer;
      transition: all 0.3s ease;
      svg {
        fill: $c-icon-grey;
        width: 10px;
        height: 10px;
        display: inline-block;
        vertical-align: middle;
      }
      &:hover {
        border: 1px solid $c-icon-hover;
        svg {
          fill: $c-icon-hover;
        }
        box-shadow: rgba(149, 157, 165, 0.5) 0px 0px 15px;
      }
    }
  }
  .mobile_nav {
    width: 100%;
    @media (max-width: 968px) {
      max-width: 800px !important;
    }
    @media (max-width: 768px) {
      max-width: 700px !important;
    }
    @media (max-width: 576px) {
      max-width: 350px !important;
    }
    .eatme-btn-orange {
      width: 50%;
      border-radius: 6px;
      font-family: $ff-roboto;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
    .eatme-btn-grey {
      width: 50%;
      border-radius: 6px;
      font-family: $ff-roboto;
      box-shadow: 0px 3px 6px #11100029;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      background: white;
      color: #c9c9c9 !important;
    }
  }
}
</style>

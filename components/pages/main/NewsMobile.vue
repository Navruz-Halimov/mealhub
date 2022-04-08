<template>
  <div v-if="isMobile" class="mobile__news">
    <div class="news__list">
      <vue-slick-carousel v-bind="settings">
        <div v-for="i in list" :key="i" class="el">
          <img :src="`/images/news/${i}.jpg`" alt="" class="news__img">
        </div>
      </vue-slick-carousel>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      settings: {
        arrows: true,
        dots: false,
        slidesToShow: 2,
        centerPadding: '10px',
        centerMode: true,
        autoplay: true,
        responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 5
            }
          },
          {
            breakpoint: 945,
            settings: {
              slidesToShow: 4
            }
          },
          {
            breakpoint: 756,
            settings: {
              slidesToShow: 3
            }
          },
          {
            breakpoint: 476,
            settings: {
              slidesToShow: 2
            }
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el {
  display: flex;
  align-items: center;
}
.mobile__news {
  .news__list {
    margin-top: 15px;
  }
  .news__img {
    height: 112px;
    object-fit: cover;
    border-radius: 8px;
    width: 95%;
    @media screen and (max-width: 450px) {
      width: 98%;
    }
  }
}

.slick-slider {
  & /deep/ {
    .slick-prev {
      background-image: url('/icons/catering/new/arrow-green.svg');
      background-position: center;
      background-repeat: no-repeat;
      background-size: 5px 10px;
      left: 5px;
      transform: rotateY(180deg);
      &::before {
        content: '' !important;
        position: absolute !important;
        width: 32px !important;
        height: 116px !important;
        background: rgba(255, 255, 255, 0.58);
        // z-index: 111 !important;
        display: block !important;
        top: -48px;
        left: 0;
      }
    }

    .slick-next {
      background: url('/icons/catering/new/arrow-green.svg');
      background-position: center;
      background-repeat: no-repeat;
      background-size: 5px 10px;
      right: 5px;
      &::before {
        content: '' !important;
        position: absolute !important;
        width: 32px !important;
        height: 116px !important;
        background: rgba(255, 255, 255, 0.58);
        display: block !important;
        top: -48px;
        right: -6px;
      }
    }
    .slick-arrow.slick-prev {
      top: 39%;
    }
    .slick-arrow {
      top: 50%;
      z-index: 2;
      opacity: 0.75;
      width: 25px !important;
      height: 25px !important;
      border-radius: 50%;
      background-color: #fff;
      border: 0.5px solid #24a391;
      &::before {
        display: none;
      }
    }
  }
}
</style>

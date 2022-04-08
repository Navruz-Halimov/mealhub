import axios from 'axios'
import apiAddress from '~/plugins/api-address'

const state = () => ({
  currentCateringReviews: [],
  currentCateringReviewsDetails: {},
  currentReview: {},
  currentReviewComments: {},
  currentComment: {}
})

const getters = {
  CURRENT_CATERING_REVIEWS: state => state.currentCateringReviews,
  CURRENT_CATERING_REVIEWS_DETAILS: state => state.currentCateringReviewsDetails,
  CURRENT_REVIEW: state => state.currentReview,
  CURRENT_REVIEW_COMMENTS: state => state.currentReviewComments,
  CURRENT_COMMENT: state => state.currentComment
}

const mutations = {
  SET_CURRENT_CATERING_REVIEWS: (state, newReviews) => {
    state.currentCateringReviews = [...newReviews]
  },
  SET_CURRENT_CATERING_REVIEWS_DETAILS: (state, item) => {
    state.currentCateringReviewsDetails = item
  },
  SET_CURRENT_REVIEW: (state, review) => {
    state.currentReview = review
  },
  SET_CURRENT_REVIEW_COMMENTS: (state, c) => {
    state.currentReviewComments = c
  },
  SET_CURRENT_COMMENT: (state, comment) => {
    state.currentComment = comment
  }
}

const actions = {
  // all review
  async GET_CURRENT_CATERING_REVIEWS ({ commit }, { cookiz, id, q, limit, page }) {
    let res

    const params = {
      limit: limit || 50,
      page: page || 1,
      q: q || ''
    }

    try {
      res = await axios.get(`${apiAddress(this)}/catering/${id}/review/get-list`, {
        params,
        headers: {
          Authorization: cookiz.get('user_token')
        }
      })
      const data = res.data

      if (data && data.status === 'success') {
        commit('SET_CURRENT_CATERING_REVIEWS_DETAILS', data)
        commit('SET_CURRENT_CATERING_REVIEWS', data.items)
      } else {
        throw new Error(data)
      }
    } catch (err) {
      console.error('GET_CURRENT_CATERING_REVIEWS', err)
      return new Promise(resolve => resolve(err))
    }

    return res
  },
  // Single review
  async GET_CURRENT_CATERING_REVIEW ({ commit }, { cookiz, id, q, reviewID, limit, page }) {
    let res

    let params = {
      limit: limit || 15,
      page: page || 1
    }
    if (q) {
      params = {
        ...params,
        q
      }
    }

    try {
      res = await axios.get(`${apiAddress(this)}/catering/${id}/review/view/${reviewID}`, {
        params,
        headers: {
          Authorization: cookiz.get('user_token')
        }
      })
      const data = res.data

      if (data && data.status === 'success') {
        commit('SET_CURRENT_REVIEW', data.item)
        if (data.comments) {
          commit('SET_CURRENT_REVIEW_COMMENTS', data.comments)
        }
      } else {
        throw new Error(data)
      }
    } catch (err) {
      console.error('GET_CURRENT_CATERING_REVIEW', err)
      return new Promise(resolve => resolve(err))
    }

    return res
  },

  async ADD_REVIEW ({ getters, commit }, { cookiz, id }) {
    let res

    const formData = {
      title: getters.CURRENT_REVIEW.title || '',
      review: getters.CURRENT_REVIEW.review || '', // text of review
      cuisine_mark: getters.CURRENT_REVIEW.cuisine_mark || '1',
      service_mark: getters.CURRENT_REVIEW.service_mark || '1',
      pricing_mark: getters.CURRENT_REVIEW.pricing_mark || '1'
    }

    const temp = new FormData()

    for (let i = 0; i < getters.CURRENT_REVIEW.uploads.length; i++) {
      const file = getters.CURRENT_REVIEW.uploads[i]
      temp.append('uploads[' + i + ']', file)
    }

    for (const k in formData) {
      temp.append(k, formData[k])
    }

    try {
      res = await axios.post(`${apiAddress(this)}/catering/${id}/review/create`, temp, {
        headers: {
          Authorization: cookiz.get('user_token'),
          'Content-Type': 'multipart/form-data'
        }
      })
      const data = res.data

      if (data && data.status === 'success') {
        commit('SET_CURRENT_REVIEW', data.item)
      } else {
        throw new Error(data)
      }
    } catch (err) {
      console.error('ADD_REVIEW', err)
      return new Promise(resolve => resolve(err))
    }

    return res
  },
  async UPDATE_REVIEW ({ getters, commit }, { cookiz, id, reviewID, uploads }) {
    let res

    const formData = {
      title: getters.CURRENT_REVIEW.title || '',
      review: getters.CURRENT_REVIEW.review || '', // text of review
      cuisine_mark: getters.CURRENT_REVIEW.cuisine_mark || '1',
      service_mark: getters.CURRENT_REVIEW.service_mark || '1',
      pricing_mark: getters.CURRENT_REVIEW.pricing_mark || '1'
    }

    const temp = new FormData()

    for (let i = 0; i < uploads.length; i++) {
      const file = uploads[i]
      temp.append('uploads[' + i + ']', file)
    }

    for (const k in formData) {
      temp.append(k, formData[k])
    }

    try {
      res = await axios.post(`${apiAddress(this)}/catering/${id}/review/update/${reviewID}`, temp, {
        headers: {
          Authorization: cookiz.get('user_token'),
          'Content-Type': 'multipart/form-data'
        }
      })
      const data = res.data

      if (data && data.status === 'success') {
        commit('SET_CURRENT_REVIEW', data.item)
      } else {
        throw new Error(data)
      }
    } catch (err) {
      console.error('UPDATE_REVIEW', err)
      return new Promise(resolve => resolve(err))
    }

    return res
  },
  async DELETE_REVIEW ({ commit, actions }, { cookiz, id, reviewID }) {
    let res

    try {
      res = await axios.post(`${apiAddress(this)}/catering/${id}/review/remove/${reviewID}`, null, {
        headers: {
          Authorization: cookiz.get('user_token')
        }
      })
      const data = res.data

      if (data && data.status === 'success') {
        commit('SET_CURRENT_REVIEW', {})
      } else {
        throw new Error(data)
      }
    } catch (err) {
      console.error('DELETE_REVIEW', err)
      return new Promise(resolve => resolve(err))
    }

    return res
  },

  async DELETE_REVIEW_PHOTO ({ commit, getters }, { cookiz, id, reviewID, photoID }) {
    let res

    try {
      res = await axios.post(`${apiAddress(this)}/catering/${id}/review/${reviewID}/remove-photo/${photoID}`, null, {
        headers: {
          Authorization: cookiz.get('user_token')
        }
      })
      const data = res.data

      if (data && data.status === 'success') {
        const newimages = getters.CURRENT_REVIEW.images || []
        const removeIndex = newimages.findIndex(
          item => +item.id === +photoID
        )
        console.warn('CURRENT_REVIEW', getters.CURRENT_REVIEW)
        console.warn('removeIndex', removeIndex)

        const newreview = { ...getters.CURRENT_REVIEW, ...{ images: newimages } }
        commit('SET_CURRENT_REVIEW', newreview)
      } else {
        throw new Error(data)
      }
    } catch (err) {
      console.error('DELETE_REVIEW', err)
      return new Promise(resolve => resolve(err))
    }

    return res
  },

  async LIKE_REVIEW ({ getters, commit }, { cookiz, id, reviewID }) {
    let res

    try {
      res = await axios.post(`${apiAddress(this)}/catering/${id}/review/like/${reviewID}`, null, {
        headers: {
          Authorization: cookiz.get('user_token')
        }
      })
      const data = res.data

      if (data.status !== 'success') {
        throw new Error(data)
      }
    } catch (err) {
      return new Promise(resolve => resolve(err))
    }

    return res
  },

  async ADD_REVIEW_COMMENT ({ getters, commit }, { cookiz, id, reviewID }) {
    let res

    const formData = {
      comment: getters.CURRENT_COMMENT.comment || ''
    }

    try {
      res = await axios.post(`${apiAddress(this)}/catering/${id}/review/${reviewID}/comment/create`, formData, {
        headers: {
          Authorization: cookiz.get('user_token')
        }
      })
      const data = res.data

      if (data && data.status === 'success') {
        commit('SET_CURRENT_COMMENT', data.item)
      } else {
        throw new Error(data)
      }
    } catch (err) {
      console.error('ADD_REVIEW_COMMENT', err)
      return new Promise(resolve => resolve(err))
    }

    return res
  },
  async UPDATE_REVIEW_COMMENT ({ getters, commit }, { cookiz, id, reviewID, commentID }) {
    let res

    const formData = {
      comment: getters.CURRENT_COMMENT.comment || ''
    }

    try {
      res = await axios.post(`${apiAddress(this)}/catering/${id}/review/${reviewID}/comment/update/${commentID}`, formData, {
        headers: {
          Authorization: cookiz.get('user_token')
        }
      })
      const data = res.data

      if (data && data.status === 'success') {
        commit('SET_CURRENT_REVIEW', data.item)
      } else {
        throw new Error(data)
      }
    } catch (err) {
      console.error('UPDATE_REVIEW_COMMENT', err)
      return new Promise(resolve => resolve(err))
    }

    return res
  },
  async DELETE_REVIEW_COMMENT ({ commit, actions }, { cookiz, id, reviewID, commentID }) {
    let res

    try {
      res = await axios.post(`${apiAddress(this)}/catering/${id}/review/${reviewID}/comment/remove/${commentID}`, null, {
        headers: {
          Authorization: cookiz.get('user_token')
        }
      })
      const data = res.data

      if (data && data.status === 'success') {
        commit('SET_CURRENT_COMMENT', {})
      } else {
        throw new Error(data)
      }
    } catch (err) {
      console.error('DELETE_REVIEW_COMMENT', err)
      return new Promise(resolve => resolve(err))
    }

    return res
  }

}

const moduleStore = {
  state, getters, mutations, actions
}

export default moduleStore

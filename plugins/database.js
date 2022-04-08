import Database from '~/database/index'

export default ({ $http }, inject) => {
  inject('database', new Database($http))
}

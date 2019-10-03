import axios from 'axios'


const service = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? '/api'
      : `http://${window.location.hostname}:5000/api`,

  withCredentials: true,
})

const errHandler = err => {
  console.error(err)
  if (err.response && err.response.data) {
    console.error('API response', err.response.data)
    throw err.response.data.message
  }
  throw err
}

export default {
  service: service,

  // This method is synchronous and returns true or false
  // To know if the user is connected, we just check if we have a value for localStorage.getItem('user')
  isLoggedIn() {
    return localStorage.getItem('user') != null
  },

  // This method returns the user from the localStorage
  // Be careful, the value is the one when the user logged in for the last time
  getLocalStorageUser() {
    return JSON.parse(localStorage.getItem('user'))
  },

  // This method signs up and logs in the user
  signup(userInfo) {
    return service
      .post('/signup', userInfo)
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        localStorage.setItem('user', JSON.stringify(res.data))
        return res.data
      })
      .catch(errHandler)
  },

  login(email, password) {
    return service
      .post('/login', {
        email,
        password,
      })
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        localStorage.setItem('user', JSON.stringify(res.data))
        return res.data
      })
      .catch(errHandler)
  },

  logout() {
    localStorage.removeItem('user')
    return service.get('/logout')
  },

  getTables() {
    return service
      .get('/tables')
      .then(res => res.data)
      .catch(errHandler)
  },

  getOpenTables() {
    return service
      .get('/tables?state=open')
      .then(res => res.data)
      .catch(errHandler)
  },

  getOpenTable(tableId) {
    return service
      .get('/tables/' + tableId + '?state=open')
      .then(res => res.data)
      .catch(errHandler)
  },
  getClosedTable(tableId) {
    return service
      .get('/tables/' + tableId + '?state=closed')
      .then(res => res.data)
      .catch(errHandler)
  },

  getArchivedTables() {
    return service
      .get('/tables?state=archived')
      .then(res => res.data)
      .catch(errHandler)
  },

  getTableId(tableId) {
    return service
      .get('/tables/' + tableId)
      .then(res => res.data)
      .catch(errHandler)
  },

  addTable(body) {
    return service
      .post('/tables', body)
      .then(res => res.data)
      .catch(errHandler)
  },

  archiveAndAddTable(body) {
    return service
      .post('/tables/archive-and-add-table', body)
      .then(res => res.data)
      .catch(errHandler)
  },

  editTable(tableId, body) {
    // console.log('EDIT TABLE API', tableId, body)
    return service
      .put('/tables/' + tableId, body)
      .then(res => res.data)
      .catch(errHandler)
  },

  startTrackingTable(tableId, body) {
    // console.log('EDIT TABLE API', tableId, body)
    return service
      .put('/tables/' + tableId + '/startTracking', body)
      .then(res => res.data)
      .catch(errHandler)
  },

  stopTrackingTable(tableId, body) {
    // console.log('EDIT TABLE API', tableId, body)
    return service
      .put('/tables/' + tableId + '/stopTracking', body)
      .then(res => res.data)
      .catch(errHandler)
  },

  deleteTable(tableId) {
    return service
      .delete('/tables/' + tableId)
      .then(res => res.data)
      .catch(errHandler)
  },
  getDishes() {
    return service
      .get('/dishes')
      .then(res => res.data)
      .catch(errHandler)
  },
  getActiveDishes() {
    return service
      .get('/dishes?active=true')
      .then(res => res.data)
      .catch(errHandler)
  },

  getDish(dishId) {
    return service
      .get('/dishes/' + dishId)
      .then(res => res.data)
      .catch(errHandler)
  },

  addDish() {
    return service
      .post('/dishes')
      .then(res => res.data)
      .catch(errHandler)
  },

  //incorrect route
  editDish(dishId, body) {
    return service
      .put('/dishes/' + dishId, body)
      .then(res => res.data)
      .catch(errHandler)
  },

  toggleActiveDish(dishId) {
    return service
      .put('/dishes/' + dishId + '/toggle-active')
      .then(res => res.data)
      .catch(errHandler)
  },

  deleteDish(dishId) {
    return service
      .delete('/dishes/' + dishId)
      .then(res => res.data)
      .catch(errHandler)
  },

  getSecret() {
    return service
      .get('/secret')
      .then(res => res.data)
      .catch(errHandler)
  },

  addPicture(file) {
    const formData = new FormData()
    formData.append('picture', file)
    return service
      .post('/endpoint/to/add/a/picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => res.data)
      .catch(errHandler)
  },
}

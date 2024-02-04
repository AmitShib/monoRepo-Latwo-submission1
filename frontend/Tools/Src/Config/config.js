const config = {
    restBE: {
      baseUrl: 'http://172.25.176.1:3000'  /*'http://localhost:5001'*/,
      subRoutes: {
        users: '/users',
        diners:'/diners',
        tables: '/tables',
        orders: '/orders',
        restaurants: '/restaurants',
        merge: '/merge',
        closeTable: '/close-table',
        history: '/history',
        dishes: '/dishes'
      }
    },
    userAdminType: 'Admin'
  }
  export default config
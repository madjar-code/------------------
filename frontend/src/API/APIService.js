export default class APIService {

  static async getCurrentUser(authTokens) {
    let response = await fetch('/api/users/current/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access)
      }
    })
    let data = await response.json()

    if (response.status === 200) {
      return data
    }
  }

  static async getCurrentProfiles(authTokens) {
    let response = await fetch('/api/CVs/current/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access)
      }
    })
    let data = await response.json()

    if (response.status === 200) {
      return data
    }
  }

  static async getCurrentRoutes(authTokens) {
    let response = await fetch('/api/routes/current/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access)
      }
    })
    let data = await response.json()

    if (response.status === 200) {
      return data
    }
  }

  static async getTargets() {
    let response = await fetch('/api/routes/targets/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    let data = await response.json()

    if (response.status === 200) {
      return data
    }
  }

  static async getRouteTypes() {
    let response = await fetch('/api/routes/route-types/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    let data = await response.json()

    if (response.status === 200) {
      return data
    }
  }
  static async changePassword(credentials, authTokens) {
    let response = await fetch('/api/users/change_password/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access)
      },
      body: JSON.stringify(credentials)
    })
    let data = await response.json()
    if  (response.status === 200){
      return response.status
    }
    return data
  }

  static async changeEmail(credentials, authTokens) {
    let response = await fetch('/api/users/change_email/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access)
      },
      body: JSON.stringify(credentials)
    })
    let data = await response.json()
    if (response.status === 200){
      return response.status
    }
    return data
  }

  static async getOneProfile(id) {
    let response = await fetch(`/api/CVs/${id}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    let data = await response.json()

    if (response.status === 200) {
      return data
    }
  }

  static async getOneRoute(id) {
    let response = await fetch(`/api/routes/${id}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    let data = await response.json()

    if (response.status === 200) {
      return data
    }
  }

  static async deleteCV(id) {
    await fetch(`/api/CVs/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
  }

  static async deleteRoute(id) {
    await fetch(`/api/routes/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
  }

  static async validateCV(credentials) {
    let response = await fetch(`api/CVs/validate/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials)
    })
    let data = await response.json()
    if  (response.status === 200 || response.status === 201){
      return response.status
    }
    return data
  }

  static async validateEdu(credentials) {
    let response = await fetch(`api/edu/validate/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials)
    })
    let data = await response.json()
    if  (response.status === 200 || response.status === 201){
      return response.status
    }
    return data
  }
  
  static async validateJob(credentials) {
    let response = await fetch(`api/jobs/validate/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials)
    })
    let data = await response.json()
    if  (response.status === 200 || response.status === 201){
      return response.status
    }
    return data
  }

  static async validateJobLink(credentials) {
    let response = await fetch(`api/jobs/link/validate/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials)
    })
    let data = await response.json()
    if  (response.status === 200 || response.status === 201){
      return response.status
    }
    return data
  }

  static async validateJob(credentials) {
    let response = await fetch(`api/jobs/validate/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials)
    })
    let data = await response.json()
    if  (response.status === 200 || response.status === 201){
      return response.status
    }
    return data
  }
  
  static async createCV(credentials) {
    let response = await fetch(`api/CVs/create/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials)
    })
    return response.json()
  }

  static async createEdu(credentials) {
    let response = await fetch(`api/edu/create/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials)
    })
    return response.json()
  }

  static async createJob(credentials) {
    let response = await fetch(`api/jobs/create/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials)
    })
    return response.json()
  }

  static async createRoute(credentials) {
    let response = await fetch(`api/routes/create/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials)
    })
    return response.json()
  }
}
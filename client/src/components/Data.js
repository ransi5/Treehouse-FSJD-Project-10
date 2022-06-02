// import dependencies
import Cookies from 'js-cookie'

// `Data` class initiated
export default class Data {
//  `api` method to make api request to server
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = 'http://localhost:5000/api' + path;
//  `options` variable contains preflight header values sent with fetch request
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }
//  sets the `basic Authorization` header to be sent with request
// also sets and updates the `token` cookie value for future requests requiring server side authentication
    if (requiresAuth) {
      const encodedCredentials = credentials ? btoa(`${credentials.emailAddress}:${credentials.password}`) : Cookies.get('token') ? Cookies.get('token').slice(6) : null;
      if (Cookies.get('token') && Cookies.get('token') === `Basic ${encodedCredentials}`) {
        options.headers.Authorization = Cookies.get('token');
      } else {
        options.headers.Authorization = `Basic ${encodedCredentials}`;
        Cookies.set('token', `Basic ${encodedCredentials}`, { expires: 1 })

      }
    }

    return fetch(url, options);
  }
//  `getCourses` method fetches all courses from server and processes response for further processing at the component
  async getCourses() {
    const courses = await this.api(`/courses`, 'GET', null, false, null);
    if (courses.status === 200) {
      return courses.json().then(data => data);
    }
    else if (courses.status === 401) {
      return courses.json()
        .then(data => data)
    } else if (courses.status === 400) {
      return courses.json()
      .then(data => data)
    } else if (courses.status === 404) {
      return courses.json()
        .then(data => data)
    } else {
      throw new Error();
    }
  }
//  `createCourse` component sends POST request to create and new course and processed response
//  for further actions dependant on response
  async createCourse(course) {
    const response = await this.api('/courses', 'POST', course, true);
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then(data => {
        return data;
      });
    }
    else {
      throw new Error();
    }
  }

//  `getCourse` method gets detailed course information requested by user and processes response for further action
  async getCourse(id) {
    const courses = await this.api(`/courses/${id}`, 'GET', null, false, null);
    if (courses.status === 200) {
      return courses.json().then(data => data);
    }
    else if (courses.status === 401) {
      return courses.json().then(data => data)
    } else if (courses.status === 400) {
      return courses.json().then(data => data)
    } else if (courses.status === 404) {
      return courses.json().then(data => data)
    }else if (courses.status === 500) {
      return courses.json().then(data => data)
    } else {
      throw new Error();
    }
  }

//  `updateCourse` method sends PUT request to update course information requested by user
// if the course is owned by user and processes response for further action
  async updateCourse(id, course) {
    const response = await this.api(`/courses/${id}`, 'PUT', course, true);
    if (response.status === 204) {
      return [];
    } else if (response.status === 400) {
      return response.json().then(data => {
        return data;
      });
    } else if (response.status === 403) {
      return response.json().then(data => {
        return data;
      });
    } else if (response.status === 404) {
      return response.json().then(data => {
        return data;
      });
    } else if (response.status === 500) {
      return response.json().then(data => {
        return data;
      });
    } else {
      throw new Error();
    }
  }

// delete course method to send delete course api request to server and process reponse for further action
  async deleteCourse(id) {
    const response = await this.api(`/courses/${id}`, 'DELETE', null, true);
    if (response.status === 204) {
      return [];
    } else if (response.status === 400) {
      return response.json().then(data => {
        return data;
      });
    } else if (response.status === 403) {
      return response.json().then(data => {
        return data;
      })
    } else if (response.status === 500) {
      return response.json().then(data => {
        return data;
      });
    } else {
      throw new Error();
    }
  }

// `getUser` method called during sign in get authenticated user and processes response for further action
  async getUser(credentials) {
    const response = await this.api(`/users`, 'GET', null, true, credentials);
    if (response.status === 200) {
      return response.json().then(data => data);
    } else if (response.status === 401) {
      return response.json()
        .then(data => data)
    } else if (response.status === 400) {
      return response.json()
      .then(data => data)
    } else if (response.status === 404) {
      return response.json()
        .then(data => data)
    } else {
      throw new Error();
    }
  }

//  `createUser` method to create new user initiated at `SignOut` component and process response for further action
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data;
      });
    }
    else {
      throw new Error();
    }
  }
}

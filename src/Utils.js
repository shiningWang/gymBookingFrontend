class Utils {

    constructor() {
        this.apiBase = "http://localhost:3000"
    }

    testReturn() {
        return ("this is a test")
    }

    async signIn(userData) {
        const response = await fetch(`${this.apiBase}/auth/signin`, {
            method: 'POST',
            body: userData
        })
        if (!response.ok) {
            const err = await response.json();
            return ({ error: err })
        } else {
            const data = await response.json();
            localStorage.setItem('accessToken', data.accessToken);
            return ({ userCredit: data.user })
        }
    }

    async signUp(formData) {
        const response = await fetch(`${this.apiBase}/user`, {
            method: 'POST',
            body: formData
        })
        if (!response.ok) {
            const err = await response.json();
            return ({ error: err })
        } else {
            const data = await response.json();
            return ({ loginData: data })
        }
    }

    async check() {
        const response = await fetch(`${this.apiBase}/auth/validate`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${localStorage.accessToken}`
            }
        })

        if (!response.ok) {
            const err = await response.json()
            if (err) console.log(err)
            localStorage.removeItem('accessToken')
            return ({ error: "session expired, please sign in" })
        } else {
            const data = await response.json()
            this.currentUser = data.user
            return ({ userCredit: data.user })
        }
    }

    async fetchData(itr) {
        let sessionFormData = new FormData();
        sessionFormData.append('sessionType', itr)

        return new Promise((resolve, reject) => {
            fetch(`${this.apiBase}/booking/availablebooking`, {
                method: 'POST',
                headers: ({ 'Authorization': 'Bearer ' + localStorage.accessToken }),
                body: sessionFormData
            })
                .then(async (response) => {
                    if (!response.ok) {
                        const err = await response.json()
                        resolve("none")
                    } else {
                        let sessionData = await response.json()
                        resolve(sessionData)
                    }
                })
                .catch(err => {
                    console.log(err);
                    reject(err)
                })
        })
    }

    sessionTime(itg) {
        const dateDayPicker = { 1: 'Monday', 2: 'Tuesday', 3: 'Wednesday', 4: 'Thursday', 5: 'Friday', 6: 'Saturday', 0: 'Sunday' }
        let pendingDate = new Date(itg);
        let pendingTimestamp = pendingDate.getTime() - (new Date().getTimezoneOffset() * 60000);
        let dateTime = new Date(pendingTimestamp);
        let dDay = dateTime.getUTCDay();
        console.log(dDay)

        let weekDay = dateDayPicker[dDay]
        let dDate = dateTime.getUTCDate();
        let dMonth = dateTime.getUTCMonth() + 1;
        let dYear = dateTime.getUTCFullYear();
        return (weekDay + " " + dDate + "-" + dMonth + "-" + dYear)
    }

    sessionHour(its, ite) {
        let pendingDateTimeStart = new Date(its);
        let pendingTimestampStart = pendingDateTimeStart.getTime() - (new Date().getTimezoneOffset() * 60000);
        let dateTimeStart = new Date(pendingTimestampStart);

        let pendingDateTimeEnd = new Date(ite);
        let pendingTimestampEnd = pendingDateTimeEnd.getTime() - (new Date().getTimezoneOffset() * 60000);
        let dateTimeEnd = new Date(pendingTimestampEnd);

        let startHour = dateTimeStart.getUTCHours();
        let endHour = dateTimeEnd.getUTCHours();
        let startMinute = dateTimeStart.getUTCMinutes();
        let endMinute = dateTimeEnd.getUTCMinutes();
        let startAMPM; let endAMPM;
        if (startMinute.toString().length === 1) { startMinute = '0' + startMinute.toString() }
        if (endMinute.toString().length === 1) { endMinute = '0' + endMinute.toString() }
        if (startHour < 12) { startAMPM = "AM" } else { startAMPM = "PM" }
        if (endHour < 12) { endAMPM = "AM" } else { endAMPM = "PM" }
        return (startHour + ":" + startMinute + " " + startAMPM + " - " + endHour + ":" + endMinute + " " + endAMPM)
    }

    makeBooking(sessionId, clientId) {
        let makeBookingRequest = new FormData();
        makeBookingRequest.append('sessionId', sessionId)
        makeBookingRequest.append('clientId', clientId)

        return new Promise((resolve, reject) => {
            fetch(`${this.apiBase}/booking/makebooking`, {
                method: 'POST',
                headers: ({ 'Authorization': 'Bearer ' + localStorage.accessToken }),
                body: makeBookingRequest
            })
                .then(async (response) => {
                    if (!response.ok) {
                        const err = await response.json()
                        resolve(err)
                    } else {
                        let sessionData = await response.json()
                        resolve(sessionData)
                    }

                })
                .catch(err => {
                    console.log(err);
                    reject(err)
                })
        })
    }

    withdrawBooking(sessionId, clientId) {

        let withdrawBookingRequest = new FormData();
        withdrawBookingRequest.append('sessionId', sessionId);
        withdrawBookingRequest.append('clientId', clientId);

        return new Promise((resolve, reject) => {
            fetch(`${this.apiBase}/booking/withdrawbooking`, {
                method: 'POST',
                headers: ({ 'Authorization': 'Bearer ' + localStorage.accessToken }),
                body: withdrawBookingRequest
            })
                .then(async (response) => {
                    if (!response.ok) {
                        const err = await response.json()
                        resolve(err)
                    } else {
                        let sessionData = await response.json()
                        resolve(sessionData)
                    }

                })
                .catch(err => {
                    console.log(err);
                    reject(err)
                })
        })
    }

    createNewSession(formData) {

        return new Promise((resolve, reject) => {
            fetch(`${this.apiBase}/booking/newbooking`, {
                method: 'POST',
                headers: ({ 'Authorization': 'Bearer ' + localStorage.accessToken }),
                body: formData
            })
                .then(async (response) => {
                    if (!response.ok) {
                        const err = await response.json()
                        resolve(err)
                    } else {
                        let sessionData = await response.json()
                        resolve(sessionData)
                    }

                })
                .catch(err => {
                    console.log(err);
                    reject(err)
                })
        })
    }

    async findBookedSession(clientId) {
        let sessionFormData = new FormData();
        sessionFormData.append('clientId', clientId)

        return new Promise((resolve, reject) => {
            fetch(`${this.apiBase}/booking/clientfind`, {
                method: 'POST',
                headers: ({ 'Authorization': 'Bearer ' + localStorage.accessToken }),
                body: sessionFormData
            })
                .then(async (response) => {
                    if (!response.ok) {
                        const err = await response.json()
                        resolve(err)
                    } else {
                        let sessionData = await response.json()
                        resolve(sessionData)
                    }
                })
                .catch(err => {
                    console.log(err);
                    reject(err)
                })
        })
    }

    async cancelBooking(sessionId, clientId) {
        let sessionFormData = new FormData();
        sessionFormData.append('sessionId', sessionId)
        sessionFormData.append('clientId', clientId)

        return new Promise((resolve, reject) => {
            fetch(`${this.apiBase}/booking/withdrawbooking`, {
                method: 'POST',
                headers: ({ 'Authorization': 'Bearer ' + localStorage.accessToken }),
                body: sessionFormData
            })
                .then(async (response) => {
                    if (!response.ok) {
                        const err = await response.json()
                        resolve(err)
                    } else {
                        let sessionData = await response.json()
                        resolve(sessionData)
                    }
                })
                .catch(err => {
                    console.log(err);
                    reject(err)
                })
        })
    }

    async deleteBooking(sessionId) {
        let sessionFormData = new FormData();
        sessionFormData.append('sessionId', sessionId)

        return new Promise((resolve, reject) => {
            fetch(`${this.apiBase}/booking/deletebooking`, {
                method: 'POST',
                headers: ({ 'Authorization': 'Bearer ' + localStorage.accessToken }),
                body: sessionFormData
            })
                .then(async (response) => {
                    if (!response.ok) {
                        const err = await response.json()
                        resolve(err)
                    } else {
                        let sessionData = await response.json()
                        resolve(sessionData)
                    }
                })
                .catch(err => {
                    console.log(err);
                    reject(err)
                })
        })
    }

    async adminRequestAll() {
        let arr = [];
        return new Promise((resolve, reject) => {
            this.fetchData("yoga")
                .then(res => {
                    if (res === "none") {
                        //pass
                        return null;
                    } else {
                        let arr1 = [ ...arr, ...res ];
                        arr = arr1;
                        return null;
                    }
                })
                .then(() => {
                    return this.fetchData("personal")
                })
                .then(res => {
                    if (res === "none") {
                        //pass
                        return null;
                    } else {
                        let arr1 = [ ...arr, ...res ];
                        arr = arr1;
                        return null;
                    }
                })
                .then(() => {
                    return this.fetchData("group")
                })
                .then(res => {
                    if (res === "none") {
                        //pass
                        return null;
                    } else {
                        let arr1 = [ ...arr, ...res ];
                        arr = arr1;
                        return null;
                    }
                })
                .then(() => {
                    resolve(arr)
                })
                .catch(err => {
                    console.log(err);
                    reject(err)
                })
        })
    }
}

export default new Utils()
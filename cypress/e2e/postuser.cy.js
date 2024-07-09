import payload from '../config/payload.json'

const apiUrl = 'https://dev-api.padraclinic.ca/v1/otp/request';
const validEmail = "esakki@mypadra.com";
const invalidEmail = "esakki@mypadra.c";
const emptyEmail = " ";
const sendPostRequest = (email) => {
    return cy.request({
        method: 'POST',
        url: apiUrl,
        body: { email },
        failOnStatusCode: false
    })
}

describe('POST API', () => {
    it('POST CALL using JSON', () => {

        sendPostRequest(validEmail).then((response) => {
            expect(response.status).to.equal(201)
            expect(response.body).to.have.property('status', true);
            expect(response.body).to.have.property('message').and.contains('es***i@mypadra.com');
        })
    })
    it('POST CALL using fixtures', () => {
        cy.fixture('users').then((responseObject) => {
            sendPostRequest(responseObject.email).then((response) => {
                expect(response.status).to.equal(201)
                expect(response.body).to.have.property('status', true);
                expect(response.body).to.have.property('message').and.contains('es***i@mypadra.com');
            })
        })
    })
    it('POST CALL using config JSON', () => {

        sendPostRequest(payload.email).then((response) => {
            expect(response.status).to.equal(201)
            expect(response.body).to.have.property('status', true);
            expect(response.body).to.have.property('message').and.contains('es***i@mypadra.com');
        })

    })


    it('POST CALL Negative testcase with not registered mail', () => {

        sendPostRequest(invalidEmail).then((response) => {
            expect(response.status).to.equal(404)
            expect(response.body).to.have.property('status', false);
            expect(response.body).to.have.property('message').and.contains('Client Not Found');
        })

    })
    it('POST CALL Negative testcase without mail', () => {

        sendPostRequest(emptyEmail).then((response) => {
            expect(response.status).to.equal(404)
            expect(response.body).to.have.property('status', false);
            expect(response.body).to.have.property('message').and.contains('Client Not Found');
        })

    })
})
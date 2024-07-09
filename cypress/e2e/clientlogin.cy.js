describe('Login as a Patient', () => {
    it('Login with Valid Email and Valid OTP', () => {
        const validEmail = 'esakki@mypadra.com';
        const invalidEmail = 'esakki';
        /* Visit application */
        cy.visit('/')

        /* Enter valid email address */
        cy.get('.p-inputtext').type(validEmail)

        /* Check field is visible and enable */
        cy.get('.p-inputtext')
            .should('be.visible')
            .and('be.enabled');


        /* Check entered email address */
        cy.get('.p-inputtext')
            .should('have.value', 'esakki@mypadra.com');

        /* check attributes and placeholder value */
        cy.get('.p-inputtext')
            .should('have.attr', 'type', 'text')
            .and('have.attr', 'placeholder', 'Enter Your Email Address');

        /* Check focus */
        cy.get('.p-inputtext').focus().should('have.focus');
        cy.get('.p-inputtext').blur().should('not.have.focus');

        /* Check validation message */
        cy.get('.p-inputtext').clear().type(invalidEmail);
        cy.get('.auth_email_validation__Zx_Wi').should('contain', 'Please enter a valid Email Address');


/* 'Request OTP' button diabled */
        cy.get('.p-inputtext').clear().type(invalidEmail);
        cy.get('button[aria-label="Request OTP"]').should('be.disabled');

        cy.get('.p-inputtext').clear().type(validEmail);
        cy.get('button[aria-label="Request OTP"]').should('be.enabled');

        /* Case sensitive input */
        cy.get('.p-inputtext').clear().type('Esakki@Mypadra.Com');
        cy.get('.p-inputtext').should('have.value', 'Esakki@Mypadra.Com');
        cy.get('button[aria-label="Request OTP"]').should('be.enabled');

        /* Check input with spaces */
        cy.get('.p-inputtext').clear().type('  esakki@mypadra.com  ');
        cy.get('.p-inputtext').should('have.value', 'esakki@mypadra.com');
        cy.get('button[aria-label="Request OTP"]').should('be.enabled');

        /* invalid mail address */
        const invalidEmails = ['plainaddress', '@missingusername.com', 'username@.com'];

        invalidEmails.forEach(email => {
            cy.get('.p-inputtext').clear().type(email);
            //cy.get('button[aria-label="Request OTP"]').should('be.disabled');
            cy.get('.auth_email_validation__Zx_Wi').should('contain', 'Please enter a valid Email Address');
        });

        /* Check Logo */
        cy.get('.header_logo_img__fKivJ')
            .should('have.attr', 'alt', 'Padra Logo')
            .and('have.attr', 'src', '/app_logo.svg')
            .and('be.visible');

        /* Check welcome message */
        cy.get('.auth_welcome__hlErv')
            .should('contain.text', 'Welcome to')
            .and('contain.text', 'PADRA Clinic');

        /* Check user not found */
        cy.get('.p-inputtext').clear().type('arun@mypadra.com');
        cy.get('button[aria-label="Request OTP"]').click();
        cy.get('.auth_user_not_found__1skz4').should('contain', 'User not found').and('be.visible');


    })
})
describe('Login', () => {
  const { baseUrl } = Cypress.config();

  beforeEach(() => {
    cy.visit('/login');
  });

  it('should load with correct initial state', () => {
    cy.getByTestId('email').should('have.attr', 'readOnly');
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Campo obrigatório')
      .should('contain.text', '🔴');

    cy.getByTestId('password').should('have.attr', 'readOnly');
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Campo obrigatório')
      .should('contain.text', '🔴');

    cy.getByTestId('submit').should('have.attr', 'disabled');

    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('should present error if form is invalid', () => {
    cy.getByTestId('email').focus().type('invalid_email');
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'The field email is invalid')
      .should('contain.text', '🔴');

    cy.getByTestId('password').focus().type('1234');
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'The field password is invalid')
      .should('contain.text', '🔴');

    cy.getByTestId('submit').should('have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('should present valid state if form is valid', () => {
    cy.getByTestId('email').focus().type('valid@email.com');
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Tudo certo!')
      .should('contain.text', '🟢');

    cy.getByTestId('password').focus().type('12345');
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Tudo certo!')
      .should('contain.text', '🟢');

    cy.getByTestId('submit').should('not.have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('should present invalid credentials error if api returns 401', () => {
    cy.intercept('POST', /login/, {
      statusCode: 401,
      body: {
        error: 'error',
      },
    });
    cy.getByTestId('email').focus().type('valid@email.com');
    cy.getByTestId('password').focus().type('12345');

    cy.getByTestId('submit').click();
    cy.getByTestId('error-wrap')
      .getByTestId('spinner')
      .should('not.exist')
      .getByTestId('default-error')
      .should('contain.text', 'Credenciais inválidas');

    cy.url().should('eq', `${baseUrl}/login`);
  });

  it('should present unexpected error if api returns 400', () => {
    cy.intercept('POST', /login/, {
      statusCode: 400,
      body: {
        error: 'error',
      },
    });
    cy.getByTestId('email').focus().type('valid@email.com');
    cy.getByTestId('password').focus().type('12345');
    cy.getByTestId('submit').click();
    cy.getByTestId('error-wrap')
      .getByTestId('spinner')
      .should('not.exist')
      .getByTestId('default-error')
      .should(
        'contain.text',
        'Algo de errado aconteceu. Tente novamente mais tarde',
      );

    cy.url().should('eq', `${baseUrl}/login`);
  });

  it('should save AccessToken if valid credentials are provided', () => {
    cy.intercept('POST', /login/, {
      statusCode: 200,
      body: {
        accessToken: 'any_access_token',
      },
    });
    cy.getByTestId('email').focus().type('mango@gmail.com');
    cy.getByTestId('password').focus().type('12345');

    cy.getByTestId('submit').click();
    cy.getByTestId('default-error')
      .should('not.exist')
      .getByTestId('spinner')
      .should('not.exist');

    cy.url().should('eq', `${baseUrl}/`);
    cy.window().then(window =>
      assert.isOk(window.localStorage.getItem('accessToken')),
    );
  });

  it('should present unexpected error if api returns 200 and invalid response', () => {
    cy.intercept('POST', /login/, {
      statusCode: 200,
      body: {
        unexpectedProperty: 'any_access_token',
      },
    });

    cy.getByTestId('email').focus().type('valid@email.com');
    cy.getByTestId('password').focus().type('12345');
    cy.getByTestId('submit').click();
    cy.getByTestId('error-wrap')
      .getByTestId('spinner')
      .should('not.exist')
      .getByTestId('default-error')
      .should(
        'contain.text',
        'Algo de errado aconteceu. Tente novamente mais tarde',
      );
    cy.url().should('eq', `${baseUrl}/login`);
  });
});

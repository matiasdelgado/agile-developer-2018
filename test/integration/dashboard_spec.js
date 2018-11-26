describe('Dashboard', function() {
  it('show gauges', () => {
    cy.visit('/dashboard');

    cy
      .dataTest('high-gauge')
      .should('exist')
      .should('contain', '0%')
      .should('contain', 'High');
  });

  it('updates the values when issues are added', () => {
    cy.visit('/dashboard');

    cy.dataTest('add-issue').click();
    cy.field('title').type('Blue screen in Windows Vista');
    cy.field('severity').select('High');
    cy.field('description').type('When I try to play solitaire in Windows, it crashes with a blue screen');
    cy.get('button').click();

    cy.visit('/dashboard');

    cy
      .dataTest('high-gauge')
      .should('exist')
      .should('contain', '100%')
      .should('contain', 'High');

    cy.dataTest('add-issue').click();
    cy.field('title').type('Performance issue when running Minesweeper');
    cy.field('severity').select('Low');
    cy.field('description').type('It happens only when running more than one instance');
    cy.get('button').click();

    cy.visit('/dashboard');

    cy
      .dataTest('high-gauge')
      .should('exist')
      .should('contain', '50%')
      .should('contain', 'High');
  });
});

describe('LoginTests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173'); 
  });

  it('Başarılı form doldurulursa Success sayfasına gider', () => {
    cy.get('[data-cy="email"]').type('test@example.com');
    cy.get('[data-cy="password"]').type('StrongPass123!');
    cy.get('[data-cy="terms"]').check();
    cy.get('[data-cy="submit"]').should('not.be.disabled').click();

    cy.url().should('include', '/success');
    cy.contains('SUCCESS...').should('be.visible');
  });

  it('Yanlış email girilirse: 1 hata mesajı görünmeli ve buton disabled olmalı', () => {
    cy.get('[data-cy="email"]').type('wrongemail');
    cy.get('[data-cy="password"]').type('StrongPass123!');
    cy.get('[data-cy="terms"]').check();
    
    cy.get('[data-cy="error"]').should('have.length', 1);
    cy.get('[data-cy="error"]').first().should('contain', 'Geçerli bir email adresi giriniz');
    cy.get('[data-cy="submit"]').should('be.disabled');
  });

  it('Yanlış email ve yanlış şifre girilirse: 2 hata mesajı görünmeli ve buton disabled olmalı', () => {
    cy.get('[data-cy="email"]').type('wrongemail');
    cy.get('[data-cy="password"]').type('123');
    cy.get('[data-cy="terms"]').check();
    
    cy.get('[data-cy="error"]').should('have.length', 2);
    cy.contains('Geçerli bir email adresi giriniz').should('be.visible');
    cy.contains('Şifre en az 8 karakter, büyük küçük harf, karakter ve rakam içermeli').should('be.visible');
    cy.get('[data-cy="submit"]').should('be.disabled');
  });

  it('Email ve şifre doğru ama şartları kabul etmeden: Buton disabled olmalı', () => {
    cy.get('[data-cy="email"]').type('test@example.com');
    cy.get('[data-cy="password"]').type('StrongPass123!');
    cy.get('[data-cy="submit"]').should('be.disabled');
  });
});
describe('Testing of TV Schedule Web Application', () => {

  beforeEach(() => {
    cy.visit('https://clearcodehq.github.io/qa-intern-test/#/home')
  })

  context("Main Page", () => {
    it('Main Page Components Verification', () => {
      cy.get('h1')
        .should("exist")
        .contains("TV Schedule")
      cy.get('.rowHeader')
        .eq(0)
        .should("exist")
      cy.get('.rowHeader')
        .eq(1)
        .should("exist")
      cy.get('.ng-empty')
        .should('be.enabled')
      cy.get('.clearSearch')
        .should('be.enabled') 
      cy.get('.showList > :nth-child(1)')
        .contains("shows per page")
      cy.get('.paginationP')
        .should('exist')
    })
  })
  context("Details Page", () => {
    it("Details Page Components Verification", () => {

      cy.get('[ng-repeat="x in shows | filter:search | itemsPerPage: perPage | orderBy:sortKey:reverse"] > a >:nth-child(1)')
        .eq(0)
        .click()

      cy.get('h1')
        .should("exist")
        .contains("TV Schedule")

      cy.get('.navBtn')
        .should('be.enabled')

      cy.get('[ng-hide="checkFav(x.id)"] > img')
        .should("not.be.checked")
      
      cy.get('.rightHalf > img')
        .should('be.visible')

      cy.get('.leftHalf > :nth-child(4) > strong')
        .contains('Name:')

      cy.get('.leftHalf > :nth-child(5) > strong')
        .contains('When?')
      
      cy.get('.leftHalf > :nth-child(6) > strong')
        .contains('Description')
      
    })
  })
  context("Search functionality", () => {

    it('Search Functionality Test with first item in main list', () =>  {

      cy.get('.ng-empty')
        .should('be.enabled')

      cy.get(':nth-child(69) > a > :nth-child(1)').invoke('text').then((searchText) => { 
        searchText = searchText.trim()

        cy.get('.ng-empty')
          .type(searchText)

        cy.get('.ng-dirty').should('value', searchText)

        cy.get('[ng-repeat="x in shows | filter:search | itemsPerPage: perPage | orderBy:sortKey:reverse"] > a > :nth-child(1)')
        .click()
  
        cy.get('.leftHalf > :nth-child(4)').contains(searchText)
      
      })
      cy.get('.rightHalf > img')
        .should('be.visible')

      cy.get('[ng-hide="checkFav(x.id)"] > img')
        .should("not.be.checked")
    })
  })
  context("Favorite list functionality", () => {

    it("Creating and Verifying Favorite Series List", () => {

      cy.get('[ng-repeat="x in shows | filter:search | itemsPerPage: perPage | orderBy:sortKey:reverse"]')
        .eq(0)  
        .should('exist')

      cy.get('[ng-repeat="x in shows | filter:search | itemsPerPage: perPage | orderBy:sortKey:reverse"]')
        .eq(0)    
        .click()      

      cy.get('.rightHalf > img')
        .should('be.visible')

      cy.get('[ng-hide="checkFav(x.id)"] > i')
        .should('exist')
        .contains('Add to favorites')

      cy.get('[ng-hide="checkFav(x.id)"] > img')
        .click()

      cy.get('[ng-show="checkFav(x.id)"] > i')
        .contains('Delete from favorites')

      cy.get('[ng-show="checkFav(x.id)"] > img')
        .should('exist')

      cy.get('.navBtn')
        .should("exist")
        .click()
    
      cy.get('[ng-repeat="x in shows | filter:search | itemsPerPage: perPage | orderBy:sortKey:reverse"]')
        .eq(1)
        .should('exist')
        .click()

      cy.get('.rightHalf > img')
        .should('be.visible')

      cy.get('[ng-hide="checkFav(x.id)"] > i')
        .should('exist')
        .contains('Add to favorites')

      cy.get('[ng-hide="checkFav(x.id)"] > img')
        .click()

      cy.get('[ng-show="checkFav(x.id)"] > i')
        .contains('Delete from favorites')

      cy.get('[ng-show="checkFav(x.id)"] > img')
        .should('exist')

      cy.get('.navBtn')
        .should("exist")
        .click()
      
      cy.get('[ng-repeat="x in shows | filter:search | itemsPerPage: perPage | orderBy:sortKey:reverse"]')
        .eq(2)
        .should('exist')
        .click()

      cy.get('.rightHalf > img')
        .should('be.visible')

      cy.get('[ng-hide="checkFav(x.id)"] > i')
        .should('exist')
        .contains('Add to favorites')

      cy.get('[ng-hide="checkFav(x.id)"] > img')
        .click()

      cy.get('[ng-show="checkFav(x.id)"] > i')
        .contains('Delete from favorites')

      cy.get('[ng-show="checkFav(x.id)"] > img')
        .should('exist')

      cy.get('.navBtn')
        .should("exist")
        .click()


      cy.get('[ng-repeat="x in shows | filter:search | itemsPerPage: perPage | orderBy:sortKey:reverse"] > a > :nth-child(1)')
      .eq(0)
      .should('exist')
      .invoke('text')
      .then((firstElementText) => {
        cy.get('[ng-repeat="x in shows"][ng-show="checkFav(x.id)"] > a > :nth-child(1)')
          .eq(0)
          .should('exist')
          .invoke('text')
          .then((secondElementText) => {
            expect(firstElementText.trim()).to.equal(secondElementText.trim())
          })
      })

      cy.get('[ng-repeat="x in shows | filter:search | itemsPerPage: perPage | orderBy:sortKey:reverse"] > a > :nth-child(1)')
      .eq(1)
      .should('exist')
      .invoke('text')
      .then((firstElementText) => {
        cy.get('[ng-repeat="x in shows"][ng-show="checkFav(x.id)"] > a > :nth-child(1)')
          .eq(1)
          .should('exist')
          .invoke('text')
          .then((secondElementText) => {
            expect(firstElementText.trim()).to.equal(secondElementText.trim());
          })
      })

      cy.get('[ng-repeat="x in shows | filter:search | itemsPerPage: perPage | orderBy:sortKey:reverse"] > a > :nth-child(1)')
      .eq(2)
      .should('exist')
      .invoke('text')
      .then((firstElementText) => {
        cy.get('[ng-repeat="x in shows"][ng-show="checkFav(x.id)"] > a > :nth-child(1)')
          .eq(2)
          .should('exist')
          .invoke('text')
          .then((secondElementText) => {
            expect(firstElementText.trim()).to.equal(secondElementText.trim());
          })
      })
    })
    
  })

  context("Series Date", () => {
    
    it('Validating Series Dates with Current Date',  () => {
      const currentDate = new Date().toISOString().split('T')[0];
      cy.log(currentDate)
      cy.get('[ng-repeat="x in shows | filter:search | itemsPerPage: perPage | orderBy:sortKey:reverse"] > a > :nth-child(3)')
        .eq(0)
        .should('exist')
        .invoke('text')
        .then((seriesDate) => {
          expect(seriesDate.trim()).to.include(currentDate.trim());
        })
    })
  })
  context("Pagination Test", () => {
    
    it("Pagination for 25 Items per Page", () => {
      cy.get('[ng-model="perPage"]')
        .eq(0)
        .select('25')
      cy.get('[ng-repeat="x in shows | filter:search | itemsPerPage: perPage | orderBy:sortKey:reverse"] > a > :nth-child(1)')
        .filter(':visible')
        .should('have.length', 25)
    })
    
    it("Pagination for 50 Items per Page", () => {
      cy.get('[ng-model="perPage"]')
        .eq(0)
        .select('50')

        cy.get('.paginationP').then(($pagination) => {
        if ($pagination.is(':visible')) {

          cy.log("Element exists and is visible")
          cy.get('[ng-repeat="x in shows | filter:search | itemsPerPage: perPage | orderBy:sortKey:reverse"] > a > :nth-child(1)')
            .filter(':visible')
            .should('have.length', 50)

        } else {

          cy.log("Element is not visible")
          
        }
      })
    })

    it("Pagination for 100 Items per Page", () => {
      cy.get('[ng-model="perPage"]')
        .eq(0)
        .select('100')

      cy.get('.paginationP').then(($pagination) => {

        if ($pagination.is(':visible')) {

          cy.log("Element exists and is visible")
          cy.get('[ng-repeat="x in shows | filter:search | itemsPerPage: perPage | orderBy:sortKey:reverse"] > a > :nth-child(1)')
            .filter(':visible')
            .should('have.length', 100)

        } else {

          cy.log("Element is not visible")
          
        }
      })
    })

    it("Pagination Navigation and Responsiveness", () => {
      cy.get('.paginationP').should('exist')

      cy.get('.paginationP').find('li').should('have.length.gt', 1)

      cy.get('.paginationP').find('li').should('have.class', 'disabled')
      
      cy.get('[ng-repeat="x in shows | filter:search | itemsPerPage: perPage | orderBy:sortKey:reverse"]')
        .should('have.length.gte', 12)

      cy.get('[ng-class="{ disabled : pagination.current == pagination.last }"] > a').click()

      cy.get('[ng-repeat="x in shows | filter:search | itemsPerPage: perPage | orderBy:sortKey:reverse"]')
        .should('have.length.gte', 12)

    })
  })

  context("Sorting Test", () => {

    it("Sorting by Name in Descending and Ascending Order", () => {
      cy.get('.rowHeader > div').eq(0).click();
      cy.get('[ng-repeat="x in shows | filter:search | itemsPerPage: perPage | orderBy:sortKey:reverse"] > a > :nth-child(1)')
      .then((showNames) => {
        const sortedShowNames = Array.from(showNames).map((el) => el.innerText).sort().reverse()
        expect(Array.from(showNames).map((el) => el.innerText)).to.deep.equal(sortedShowNames)
      })
      cy.get('.rowHeader > div').eq(0).click();
      cy.get('[ng-repeat="x in shows | filter:search | itemsPerPage: perPage | orderBy:sortKey:reverse"] > a > :nth-child(1)')
      .then((showNames) => {
        const sortedShowNames = Array.from(showNames).map((el) => el.innerText).sort()
        expect(Array.from(showNames).map((el) => el.innerText)).to.deep.equal(sortedShowNames)
      })
  
    })
  
    it("Sorting by Time in Descending and Ascending Order", () => {
      cy.get('.rowHeader > div').eq(2).click()
      cy.get('[ng-repeat="x in shows | filter:search | itemsPerPage: perPage | orderBy:sortKey:reverse"] > a > :nth-child(3)')
      .then((showNames) => {
        const sortedShowNames = Array.from(showNames).map((el) => el.innerText).sort().reverse()
        expect(Array.from(showNames).map((el) => el.innerText)).to.deep.equal(sortedShowNames)
      })
      cy.get('.rowHeader > div').eq(2).click()
      cy.get('[ng-repeat="x in shows | filter:search | itemsPerPage: perPage | orderBy:sortKey:reverse"] > a > :nth-child(3)')
      .then((showNames) => {
        const sortedShowNames = Array.from(showNames).map((el) => el.innerText).sort()
        cy.log(sortedShowNames)
        expect(Array.from(showNames).map((el) => el.innerText)).to.deep.equal(sortedShowNames)
      })
    })

  })
})


 
      

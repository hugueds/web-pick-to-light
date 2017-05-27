import { NgPickToLightPage } from './app.po';

describe('ng-pick-to-light App', () => {
  let page: NgPickToLightPage;

  beforeEach(() => {
    page = new NgPickToLightPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

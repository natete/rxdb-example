import { RxdbExamplePage } from './app.po';

describe('rxdb-example App', function() {
  let page: RxdbExamplePage;

  beforeEach(() => {
    page = new RxdbExamplePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

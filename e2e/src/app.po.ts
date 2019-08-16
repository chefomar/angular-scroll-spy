import { browser, by, element } from 'protractor';

export class AppPage {

  private readonly windowHeight = 1000;
  private readonly windowWidth = 1000;

  navigateTo() {
    return browser.get(browser.baseUrl);
  }

  clickNavLink(id: string) {
    return element(by.css(`.navbar__link[href="#${id}"]`)).click();
  }

  scrollBy(scroll: number) {
    return browser.executeScript(`window.scrollTo(0, ${scroll});`);
  }

  getNavLink(name: string) {
    return element(by.css(`[spyOn=${name}]`)).getText();
  }

  getActiveNavLinks() {
    return element.all(by.css('.navbar__link--active')).map(link => link.getText());
  }

  setWindowSize() {
    browser.driver.manage().window().setSize(this.windowWidth, this.windowHeight);
  }
}

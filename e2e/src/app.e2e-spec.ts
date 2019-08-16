import { AppPage } from './app.po';
import { browser, logging, until, by } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(async () => {
    page = new AppPage();
    await page.navigateTo();
    await page.setWindowSize();
  });

  it('should have first link active', async () => {
    const activeLinks = await page.getActiveNavLinks();

    expect(activeLinks.length).toEqual(1);
    expect(activeLinks[0]).toEqual('target 1');
  });

  it('should still have first link active', async () => {
    await page.scrollBy(50);
    const activeLinks = await page.getActiveNavLinks();

    expect(activeLinks.length).toEqual(1);
    expect(activeLinks[0]).toEqual('target 1');
  });

  it('should have second link active', async () => {
    await page.scrollBy(51);
    await browser.wait(until.elementLocated(by.css('.navbar__link--active[spyOn=target-2]')), 1000);
    const activeLinks = await page.getActiveNavLinks();

    expect(activeLinks.length).toEqual(1);
    expect(activeLinks[0]).toEqual('target 2');
  });

  it('should have second link active', async () => {
    await page.clickNavLink('target-2');
    await browser.wait(until.elementLocated(by.css('.navbar__link--active[spyOn=target-2]')), 1000);
    const activeLinks = await page.getActiveNavLinks();

    expect(activeLinks.length).toEqual(1);
    expect(activeLinks[0]).toEqual('target 2');
  });
});
